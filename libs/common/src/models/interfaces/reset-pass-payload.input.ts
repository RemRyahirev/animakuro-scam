import { JwtPayload } from 'jsonwebtoken';

export interface ResetPassPayload extends JwtPayload {
    username: string;
    id: string;
}
