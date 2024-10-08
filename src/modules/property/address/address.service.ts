import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dtos/create.Address.dto';
import { AddressEntity } from './entity/Address.entity';
import { AddressRepository } from './repository/Address.repository';
import { UpdateAddressDto } from './dtos/update.Address.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly AddressRepository: AddressRepository,
        private readonly i18n: I18nService,
        private readonly datasource: DataSource
    ) { }

    //create 
    async createAddress(Dto: CreateAddressDto, userId: number): Promise<AddressEntity> {
        const Address = this.AddressRepository.create({ ...Dto, created_by: userId });
        return this.AddressRepository.save(Address);
    }

    //update 
    async updateAddress(id: number, Dto: UpdateAddressDto): Promise<AddressEntity> {
        await this.AddressRepository.update(id, Dto);
        return this.AddressRepository.findOne({ where: { id } });
    }


    //read 
    async getOneAddress(id: number): Promise<AddressEntity> {
        const Address = await this.AddressRepository.findOne({ where: { id } });
        if (!Address) {
            const errorMessage = this.i18n.t('errors.not_found.Address', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return Address;
    }
    //read all 
    async getAllAddress(): Promise<AddressEntity[]> {
        const Address = await this.AddressRepository.find();
        if (!Address || Address.length === 0) {
            const errorMessage = this.i18n.t('errors.not_found.Address', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return Address;
    }

}

