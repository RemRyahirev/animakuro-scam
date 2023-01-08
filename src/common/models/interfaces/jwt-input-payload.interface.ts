import { ThirdPartyAuth } from "../enums";

export interface IJwtInputPayload {
    uid: string;
    sessionId: string;
    thirdPartyAuth?: {
        uid: string;
        type: ThirdPartyAuth;
    };
}
