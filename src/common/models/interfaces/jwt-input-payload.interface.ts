import { ThirdPartyAuth } from '../enums/user-third-party.enum';

export interface IJwtInputPayload {
    uid: string;
    sessionId: string;
    thirdPartyAuth?: {
        uid: string;
        type: ThirdPartyAuth;
    };
}
