import { ThirdPartyAuthType } from '../enums/user-third-party-type.enum';

export interface IJwtInputPayload {
    uid: string;
    sessionId: string;
    thirdPartyAuth?: {
        uid: string;
        type: ThirdPartyAuthType;
    };
}
