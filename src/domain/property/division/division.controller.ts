import { Body, Controller, Post, Put, Param, Delete, Inject, Get, } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreatePolicyHandler, DeletePolicyHandler, ReadPolicyHandler, UpdatePolicyHandler } from 'src/domain/users/permission-abilities/user.policy';
import { I18nContext, I18n } from 'nestjs-i18n';
import { DivisionService } from './division.service';
import { CreateDivisionDto } from './dtos/create.division.dto';
import { UpdateDivisionDto } from './dtos/update.division.dto';

@Controller('property/division')
export class DivisionController {
    constructor(
        private readonly divisionService: DivisionService,
        @Inject('CREATE_RESPONSE') private readonly ResponseService
    ) { }

    //create 
    @Post('create')
    @SetMetadata(CHECK_POLICIES_KEY, [new CreatePolicyHandler()])
    async createDivision(@Body() dto: CreateDivisionDto, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const division = await this.divisionService.createDivision(dto);
            return this.ResponseService(i18n.t('message.create_success.division'), 200, division);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    //update 
    @Put('profile/:id')
    @SetMetadata(CHECK_POLICIES_KEY, [new UpdatePolicyHandler])
    async updateDivision(@Param('id') id: number, @Body() dto: UpdateDivisionDto, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const division = await this.divisionService.updateDivision(id, dto);
            return this.ResponseService(i18n.t('message.update_success.division'), 200, division);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    // delete 
    @Delete('remove/:id')
    @SetMetadata(CHECK_POLICIES_KEY, [new DeletePolicyHandler()])
    async removeDivision(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<string> {
        try {
            await this.divisionService.deleteDivision(id);
            return this.ResponseService(i18n.t('message.delete_success.division'), 200, null);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    // Get/read 
    @Get('/:id')
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadPolicyHandler()])
    async getOne(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const division = await this.divisionService.findOne(id);
            return this.ResponseService(i18n.t('message.fetch_success.division'), 200, division)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }

    //Get all
    @Get()
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadPolicyHandler()])
    async getAll(@I18n() i18n: I18nContext): Promise<string> {
        try {
            const division = await this.divisionService.findAll();
            return this.ResponseService(i18n.t('message.fetch_success.divison'), 200, division);
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
}

