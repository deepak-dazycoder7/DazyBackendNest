import { Module, Global } from '@nestjs/common';
import { ResponseService } from 'src/modules/common/utils/response.util';
import { AuthModule } from '../auth/auth.module';
import { PropertyModule } from '../property/property.module';
import { CountryModule } from '../country/country.module';
import { MultiLangModule } from './multi-language/multi-lang.module';

@Global()
@Module({
    imports:[
        AuthModule,
        PropertyModule,
        CountryModule,
        MultiLangModule
    ],
    providers: [
        {
            provide: 'CREATE_RESPONSE',
            useValue: ResponseService,
        },
    ],
    exports: ['CREATE_RESPONSE'],
})
export class CommonModule {}
