import { Body, Controller, Post, Put, Param, Delete, Inject, Get, UseGuards, Req } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dtos/create.state.dto';
import { UpdateStateDto } from './dtos/update.state.dto';
import { SetMetadata } from '@nestjs/common';
import { I18nContext, I18n } from 'nestjs-i18n';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreateStateHandler, UpdateStateHandler, DeleteStateHandler, ReadStateHandler } from './permission-abilities/state.policy';
import { StateGuard } from './guard/state.guard';

@Controller()
@UseGuards(StateGuard)
export class StateController {
    constructor(
        private readonly stateService: StateService,
        @Inject('CREATE_RESPONSE') private readonly ResponseService
    ) { }

    //create
    @Post()
    @SetMetadata(CHECK_POLICIES_KEY, [new CreateStateHandler()])
    async createState(@Body() Dto: CreateStateDto, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
        try {
            const createdBy = req.user?.sub
            const state = await this.stateService.createState(Dto, createdBy);
            return this.ResponseService(i18n.t('message.success.create', { args: { entity: 'state' } }), 200, state);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    //update
    @Put(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new UpdateStateHandler()])
    async updateState(@Param('id') id: number, @Body() Dto: UpdateStateDto, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const state = await this.stateService.updateState(id, Dto);
            return this.ResponseService(i18n.t('message.update_success.user'), 200, state);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    // delete 
    @Delete(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new DeleteStateHandler()])
    async removeState(@Param('id') id: number, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
        try {
            const deletedBy = req.user?.sub;
            await this.stateService.softDeleteState(id, deletedBy);
            return this.ResponseService(i18n.t('message.delete_success.user'), 200, null);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    // Get/read
    @Get(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadStateHandler()])
    async getOneState(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const state = await this.stateService.getOneState(id);
            return this.ResponseService(i18n.t('message.fetch_success.user'), 200, state)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
    //get all
    @Get()
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadStateHandler()])
    async getAll(@I18n() i18n: I18nContext): Promise<string> {
        try {
            const state = await this.stateService.getAllState();
            return this.ResponseService(i18n.t('message.fetch_success.user'), 200, state);
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
}

