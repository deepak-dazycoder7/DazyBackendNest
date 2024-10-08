import { Body, Controller, Post, Put, Param, Delete, Inject, Get, UseGuards, Req } from '@nestjs/common';
import { AddressService } from './Address.service';
import { CreateAddressDto } from './dtos/create.Address.dto';
import { UpdateAddressDto } from './dtos/update.Address.dto';
import { SetMetadata } from '@nestjs/common';
import { I18nContext, I18n } from 'nestjs-i18n';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreateAddressHandler, ReadAddressHandler, UpdateAddressHandler } from './permission-abilities/Address.policy';
import { AddressGuard } from './guard/Address.guard';

@Controller()
@UseGuards(AddressGuard)
export class AddressController {
    constructor(
        private readonly AddressService: AddressService,
        @Inject('CREATE_RESPONSE') private readonly ResponseService
    ) { }

    //create
    @Post()
    @SetMetadata(CHECK_POLICIES_KEY, [new CreateAddressHandler()])
    async createAddress(@Body() Dto: CreateAddressDto, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
        try {
            const createdBy = req.user?.sub
            const Address = await this.AddressService.createAddress(Dto, createdBy);
            return this.ResponseService(i18n.t('message.success.create', { args: { entity: 'Address' } }), 200, Address);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    //update
    @Put(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new UpdateAddressHandler()])
    async updateAddress(@Param('id') id: number, @Body() Dto: UpdateAddressDto, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const Address = await this.AddressService.updateAddress(id, Dto);
            return this.ResponseService(i18n.t('message.update_success.user'), 200, Address);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }


    // Get/read
    @Get(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadAddressHandler()])
    async getOneAddress(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const Address = await this.AddressService.getOneAddress(id);
            return this.ResponseService(i18n.t('message.fetch_success.user'), 200, Address)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
    //get all
    @Get()
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadAddressHandler()])
    async getAll(@I18n() i18n: I18nContext): Promise<string> {
        try {
            const Address = await this.AddressService.getAllAddress();
            return this.ResponseService(i18n.t('message.fetch_success.user'), 200, Address);
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
}

