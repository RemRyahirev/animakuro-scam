import { ConfigParent } from '../common/config/config';
import { Singleton } from '../common/decorators';

@Singleton
export class Config {
    private readonly _config: ConfigParent;

    constructor() {
        this._config = new ConfigParent();
    }

    public get logic(): ConfigParent {
        return this._config;
    }
}
