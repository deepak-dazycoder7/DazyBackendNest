import { Body, Controller, Post, Put, Param, Delete, Inject, Get, UseGuards, Req } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dtos/create.city.dto';
import { UpdateCityDto } from './dtos/update.city.dto';
import { SetMetadata } from '@nestjs/common';
import { I18nContext, I18n } from 'nestjs-i18n';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreateCityHandler, UpdateCityHandler, DeleteCityHandler, ReadCityHandler } from './permission-ability/city.policy';
import { CityGuard } from './guard/city.guard';

@Controller()
@UseGuards(CityGuard)
export class CityController {
    constructor(
        private readonly cityService: CityService,
        @Inject('CREATE_RESPONSE') private readonly ResponseService
    ) { }

    //create
    @Post()
    @SetMetadata(CHECK_POLICIES_KEY, [new CreateCityHandler()])
    async createCity(@Body() Dto: CreateCityDto, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
        try {
            const createdBy = req.user?.sub
            const city = await this.cityService.createCity(Dto, createdBy);
            return this.ResponseService(i18n.t('message.success.create', { args: { entity: 'city' } }), 200, city);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    //update
    @Put(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new UpdateCityHandler()])
    async updateCity(@Param('id') id: number, @Body() Dto: UpdateCityDto, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const city = await this.cityService.updateCity(id, Dto);
            return this.ResponseService(i18n.t('message.update_success.user'), 200, city);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    // delete 
    @Delete(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new DeleteCityHandler()])
    async removeCity(@Param('id') id: number, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
        try {
            const deletedBy = req.user?.sub;
            await this.cityService.softDeleteCity(id, deletedBy);
            return this.ResponseService(i18n.t('message.delete_success.user'), 200, null);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    // Get/read
    @Get(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadCityHandler()])
    async getOneCity(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const city = await this.cityService.getOneCity(id);
            return this.ResponseService(i18n.t('message.fetch_success.user'), 200, city)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
    //get all
    @Get()
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadCityHandler()])
    async getAll(@I18n() i18n: I18nContext): Promise<string> {
        try {
            const city = await this.cityService.getAllCity();
            return this.ResponseService(i18n.t('message.fetch_success.user'), 200, city);
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
}

