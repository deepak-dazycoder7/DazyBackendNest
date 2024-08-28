import { Module, Global } from '@nestjs/common';
import { returnResponse } from 'src/modules/common/utils/response.util';

@Global()
@Module({
    providers: [
        {
            provide: 'CREATE_RESPONSE',
            useValue: returnResponse,
        },
    ],
    exports: ['CREATE_RESPONSE'],
})
export class CommonModule {}
