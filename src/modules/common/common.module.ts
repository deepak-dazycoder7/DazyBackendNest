import { Module, Global } from '@nestjs/common';
import { ResponseService } from 'src/modules/common/utils/response.util';

@Global()
@Module({
    providers: [
        {
            provide: 'CREATE_RESPONSE',
            useValue: ResponseService,
        },
    ],
    exports: ['CREATE_RESPONSE'],
})
export class CommonModule {}
