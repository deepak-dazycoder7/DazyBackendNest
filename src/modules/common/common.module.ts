import { Module, Global } from '@nestjs/common';
import { ResponseService } from 'src/modules/common/utils/response.util';
import { AuthModule } from '../auth/auth.module';
import { PropertyModule } from '../property/property.module';
import { CountryModule } from '../country/country.module';
import { MultiLangModule } from './multi-language/multi-lang.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from '../Property/entity/property.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([PropertyEntity]),  // Register the entity here

        AuthModule,
        PropertyModule,
        CountryModule,
        MultiLangModule
    ],
    providers: [
        {
            provide: 'CREATE_RESPONSE',
            useValue: ResponseService,
        }
    ],
    exports: ['CREATE_RESPONSE',
        PropertyModule,
        AuthModule,
        CountryModule
    ],
})
export class CommonModule { }
