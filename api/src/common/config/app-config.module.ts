import { ConfigurableModuleBuilder, DynamicModule, Global, Module } from "@nestjs/common";
import { validateEnvironment } from "./environment/environment.validation.js";
import { EnvService } from "./env.service.js";

@Global()
@Module({})
export class AppConfigModule {
    static register(): DynamicModule {

        const { ConfigurableModuleClass } = new ConfigurableModuleBuilder().setClassMethodName('forRoot').build();

        return {
            module: AppConfigModule,
            global: true,
            imports: [
                ConfigurableModuleClass.forRoot({
                    isGlobal: true,
                    validate: validateEnvironment,
                }),
            ],
            providers: [EnvService],
            exports : [EnvService],
        };
    }
}
