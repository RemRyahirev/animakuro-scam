import { JwtPayload } from 'jsonwebtoken';

export interface ICustomJwtPayload extends JwtPayload {
    uuid: string;
    sessionId: string | null;
}
