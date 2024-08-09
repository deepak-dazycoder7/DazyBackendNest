import { Module, Global } from '@nestjs/common';
import { createResponse } from './utils/response.util';

@Global()
@Module({
    providers: [
        {
            provide: 'CREATE_RESPONSE',
            useValue: createResponse,
        },
    ],
    exports: ['CREATE_RESPONSE'],
})
export class CommonModule {}
