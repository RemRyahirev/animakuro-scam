import { getMetadataStorage, ResolverData } from 'type-graphql';

import { GqlHttpException } from 'common/errors/errors';
import { ICustomContext } from 'common/types/interfaces/custom-context.interface';
import JwtTokenService from '../services/jwt-token.service';
import { UserService } from 'core/user/services/user.service';
import { ObjectClassMetadata } from 'type-graphql/dist/metadata/definitions/object-class-metdata';
import { FieldNode, GraphQLResolveInfo, SelectionNode } from 'graphql';
import { GetRejectTypeObject } from '../types/get-reject-type-object';
import { HttpStatus } from '../../../common/types/enums/http-status.enum';
/* only for testing */

let allReturnTypes: Array<ObjectClassMetadata>;
let operationsData;

const rejectedFields = [
    {
        name: 'Series',
        fieldNames: ['id', 'createdAt', 'deleted', 'name', 'studio'],
    },
    {
        name: 'Studio',
        fieldNames: ['name'],
    },
];

setTimeout(() => {
    operationsData = {
        mutation: getMetadataStorage().mutations,
        query: getMetadataStorage().queries,
    };
    allReturnTypes = getMetadataStorage().objectTypes;

    // allReturnTypes.push(r.find(el => el.name === 'Series'))

    // console.log(allReturnTypes)
}, 100);

const getReturnTypeObject = (
    returnTypeName: string,
): ObjectClassMetadata | undefined =>
    allReturnTypes.find((el) => el.name === returnTypeName);
const getRejectTypeObject = (
    returnTypeName: string,
): GetRejectTypeObject | undefined =>
    rejectedFields.find((el) => el.name === returnTypeName);

/* only for testing */

export class AuthCheckerMiddleware {
    private jwtTokenService: JwtTokenService;
    private userService: UserService;

    constructor() {
        this.jwtTokenService = new JwtTokenService();
        this.userService = new UserService();
    }

    static checkSelectionFields = (
        node: FieldNode,
        objectType: ObjectClassMetadata,
        rejectionObject: GetRejectTypeObject,
    ) => {
        if (node.selectionSet) {
            node.selectionSet.selections.forEach((selection: SelectionNode) => {
                switch (selection.kind) {
                    case 'Field': {
                        const _expandedField = (objectType.fields || []).find(
                            (el) => el.name === selection.name.value,
                        );
                        const _objectTypeName = _expandedField
                            ? _expandedField.getType.name
                            : 'unknown';

                        const nextObjectType =
                            getReturnTypeObject(_objectTypeName);
                        const nextRejectionObject =
                            getRejectTypeObject(_objectTypeName);
                        if (nextObjectType && nextRejectionObject) {
                            AuthCheckerMiddleware.checkSelectionFields(
                                selection,
                                nextObjectType,
                                nextRejectionObject,
                            );
                        }
                        break;
                    }
                    case 'FragmentSpread': {
                        if (
                            rejectionObject.fieldNames.includes(
                                selection.name.value,
                            )
                        ) {
                            throw new GqlHttpException(
                                selection.name.value,
                                HttpStatus.UNAUTHORIZED,
                            );
                        }
                        break;
                    }
                }
            });
        }
    };

    private checkPermissions = (info: GraphQLResolveInfo) => {
        const returnType = info.returnType.toString().replace(/[\[\]]|!/g, '');
        const returnObjectType = getReturnTypeObject(returnType);
        const rejectionObject = getRejectTypeObject(returnType);
        if (returnObjectType && rejectionObject) {
            AuthCheckerMiddleware.checkSelectionFields(
                info.fieldNodes[0],
                returnObjectType,
                rejectionObject,
            );
        } else {
            throw new GqlHttpException(
                info.fieldNodes[0].name.value,
                HttpStatus.UNAUTHORIZED,
            );
        }
    };

    private thirdPartyCheck = async (sessionId: string, uid: string) => {
        // const savedAccessToken = await this.jwtTokenService.getJwtAccessToken(
        //     JwtTokenService.getThirdPartyAuthRedisKey(type, uid)
        // );
        const savedSession = await this.userService.findUserSession(
            sessionId,
            uid,
        );

        if (!savedSession) {
            throw new GqlHttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        // const savedAccessTokenPayload = JwtTokenService.decodeAccessToken(savedAccessToken);

        if (sessionId !== savedSession.id) {
            throw new GqlHttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    };

    check = async (
        { root, args, context, info }: ResolverData<ICustomContext>,
        permissions: string[],
    ) => {
        const accessToken =
            context.request.cookies[JwtTokenService.ACCESS_TOKEN_COOKIE_NAME];

        if (!accessToken) {
            throw new GqlHttpException(
                'Unauthorized',
                HttpStatus.UNAUTHORIZED,
                'TOKEN_NOT_FOUND',
            );
        }

        // handle errors
        const accessTokenPayload =
            JwtTokenService.verifyAccessToken(accessToken);

        if (accessTokenPayload.thirdPartyAuth) {
            const { sessionId, uid } = accessTokenPayload;

            this.thirdPartyCheck(sessionId, uid);
        }

        this.checkPermissions(info);

        context.userJwtPayload = accessTokenPayload;

        return true;
        // checks perrmision access for Mutations and Queries fields

        /*  EXAMPLE uncomment with exaple decorators in series resolvers and schemas

            const userPermissions = [
                'createSeries:name',
                'createSeries',
                'series:name',
            ]

            for (const allowed of permissions) {
                for (const current of userPermissions) {
                    if (allowed === current) {
                        return true
                    }
                }
            }

            otherwise -
            throw new GqlHttpException(`You don't have permission to access ${info.fieldName}`, HttpStatus.FORBIDDEN)
        */
    };
}
