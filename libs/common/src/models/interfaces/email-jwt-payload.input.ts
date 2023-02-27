import { JwtPayload } from 'jsonwebtoken';

export interface EmailJwtPayload extends JwtPayload {
    email: string;
    password: string;
    username: string;
}
