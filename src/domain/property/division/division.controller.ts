import { Body, Controller, Post, Put, Param, Delete, Inject, Get, Req, UnauthorizedException } from '@nestjs/common';
import { I18nContext, I18n } from 'nestjs-i18n';
import { DivisionService } from './division.service';
import { CreateDivisionDto } from './dtos/create.division.dto';
import { UpdateDivisionDto } from './dtos/update.division.dto';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';

@Controller('property/division')
export class DivisionController {
    constructor(
        private readonly divisionService: DivisionService,
        @Inject('CREATE_RESPONSE') private readonly ResponseService
    ) { }

    //create 
    @Post('create')
    async createDivision(@Body() dto: CreateDivisionDto, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
        try {
            const createdBy = req.user?.sub;
            if (!createdBy) {
                throw new UnauthorizedException('User not authenticated');
            }
            const division = await this.divisionService.createDivision(dto, createdBy);
            return this.ResponseService(i18n.t('message.create_success.division'), 200, division);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    //update 
    @Put('/:id')
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
    async removeDivision(
        @Param('id',) id: number,
        @I18n() i18n: I18nContext,
        @Req() req: CustomRequest
    ): Promise<string> {
        try {
            const deletedBy = req.user?.sub;
            if (!deletedBy) {
                throw new UnauthorizedException(i18n.t('message.unauthorized'));
            }
            await this.divisionService.softDeleteDivision(id, deletedBy);

            return this.ResponseService(i18n.t('message.delete_success.division'), 200, null);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }


    // Get/read 
    @Get('/:id')
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
    async getAll(@I18n() i18n: I18nContext): Promise<string> {
        try {
            const division = await this.divisionService.findAll();
            return this.ResponseService(i18n.t('message.fetch_success.divison'), 200, division);
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
}

