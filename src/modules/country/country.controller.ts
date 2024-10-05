import { Body, Controller, Post, Put, Param, Delete, Inject, Get, UseGuards, Req } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dtos/create.country.dto';
import { UpdateCountryDto } from './dtos/update.country.dto';
import { SetMetadata } from '@nestjs/common';
import { I18nContext, I18n } from 'nestjs-i18n';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreateCountryHandler, DeleteCountryHandler, ReadCountryHandler, UpdateCountryHandler } from './permission-abilities/country.policy';
import { CountryGuard } from './guard/country.guard';

@Controller('countries')
@UseGuards(CountryGuard)
export class CountryController {
    constructor(
        private readonly countryService: CountryService,
        @Inject('CREATE_RESPONSE') private readonly ResponseService
    ) { }

    //create
    @Post()
    @SetMetadata(CHECK_POLICIES_KEY, [new CreateCountryHandler()])
    async createCountry(@Body() Dto: CreateCountryDto, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
        try {
            const createdBy = req.user?.sub
            const country = await this.countryService.createCountry(Dto, createdBy);
            return this.ResponseService(i18n.t('message.success.create', { args: { entity: 'country' } }), 200, country);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    //update
    @Put(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new UpdateCountryHandler()])
    async updateCountry(@Param('id') id: number, @Body() Dto: UpdateCountryDto, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const country = await this.countryService.updateCountry(id, Dto);
            return this.ResponseService(i18n.t('message.update_success.user'), 200, country);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    // delete 
    @Delete(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new DeleteCountryHandler()])
    async removeCountry(@Param('id') id: number, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
        try {
            const deletedBy = req.user?.sub;
            await this.countryService.softDeleteCountry(id, deletedBy);
            return this.ResponseService(i18n.t('message.delete_success.user'), 200, null);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    // Get/read
    @Get(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadCountryHandler()])
    async getOneCountry(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const country = await this.countryService.getOneCountry(id);
            return this.ResponseService(i18n.t('message.fetch_success.user'), 200, country)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
    //get all
    @Get()
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadCountryHandler()])
    async getAll(@I18n() i18n: I18nContext): Promise<string> {
        try {
            const country = await this.countryService.getAllCountry();
            return this.ResponseService(i18n.t('message.fetch_success.user'), 200, country);
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
}

