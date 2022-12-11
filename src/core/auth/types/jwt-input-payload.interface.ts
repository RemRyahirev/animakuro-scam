import { ThirdPartyAuthType } from '../../user/enums/user-third-party-type.enum';

export interface JwtInputPayload {
    uid: string;
    sessionId: string;
    thirdPartyAuth?: {
        uid: string;
        type: ThirdPartyAuthType;
    };
}
