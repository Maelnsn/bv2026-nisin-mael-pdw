import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ValidatedEnvironment } from "./environment/environment.validation.js";
import { ConfigKey } from "./data/enum/config-key.enum.js";
import { AppMode } from "./data/enum/app-mode.enum.js";


@Injectable()
export class EnvService {

    appMode: AppMode;

    constructor(
        private readonly configService : ConfigService<ValidatedEnvironment, true>
    ) {}

    get appPort(): number {
        return this.get(ConfigKey.AppPort);
    }

    get isProduction(): boolean {
        return this.appMode === AppMode.Prod;
    }

     get<TConfigKey extends keyof ValidatedEnvironment>(
        key: TConfigKey,
    ): ValidatedEnvironment[TConfigKey] {
        return this.configService.getOrThrow(key, { infer: true });
    }

}
