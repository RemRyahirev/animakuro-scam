import axios from 'axios';
import { IAccount } from '../../../common/models/interfaces';

export class AppleStrategy {
    client_id: string;
    client_secret: string;
    redirect_uri: string;

    constructor() {
        this.client_id = process.env.FACEBOOK_CLIENT_ID || '';
        this.client_secret = process.env.FACEBOOK_CLIENT_SECRET || '';
        this.redirect_uri = process.env.FACEBOOK_REDIRECT_URI || '';
    }

    async getAccountData(code: string): Promise<IAccount> {
        const {
            data: { access_token },
        } = await axios(`https://graph.facebook.com/v15.0/oauth/access_token`, {
            method: 'POST',
            params: {
                redirect_uri: this.redirect_uri,
                client_id: this.client_id,
                client_secret: this.client_secret,
                code,
            },
        });

        const { data } = await axios({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
                fields: ['id', 'email', 'first_name', 'last_name'].join(','),
                access_token,
            },
        });

        return data;
    }

    getRedirectUrl = () => {
        return `https://www.facebook.com/v15.0/dialog/oauth?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}`;
    };
}
