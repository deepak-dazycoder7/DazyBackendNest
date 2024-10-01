import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCountryDto } from './dtos/create.country.dto';
import { CountryEntity } from './entity/country.entity';
import { CountryRepository } from './repository/country.repository';
import { UpdateCountryDto } from './dtos/update.country.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(CountryEntity)
        private readonly countryRepository: CountryRepository,
        private readonly i18n: I18nService,
        private readonly datasource: DataSource
    ) { }

    //create 
    async createCountry(Dto: CreateCountryDto, userId: number): Promise<CountryEntity> {
        const Property = this.countryRepository.create({ ...Dto, created_by: userId });
        return this.countryRepository.save(Property);
    }

    //update 
    async updateCountry(id: number, Dto: UpdateCountryDto): Promise<CountryEntity> {
        await this.countryRepository.update(id, Dto);
        return this.countryRepository.findOne({ where: { id } });
    }

    //remove 
    async softDeleteCountry(id: number, deleted_by: number): Promise<void> {
        await this.datasource
            .getRepository(CountryEntity)
            .createQueryBuilder()
            .update(CountryEntity)
            .set({ deleted_at: new Date(), deleted_by: deleted_by })
            .where("id = :id", { id })
            .execute();
    }

    //read 
    async getOneCountry(id: number): Promise<CountryEntity> {
        const country = await this.countryRepository.findOne({ where: { id } });
        if (!country) {
            const errorMessage = this.i18n.t('errors.not_found.country', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return country;
    }
    //read all 
    async getAllCountry(): Promise<CountryEntity[]> {
        const country = await this.countryRepository.find();
        if (!country || country.length === 0) {
            const errorMessage = this.i18n.t('errors.not_found.country', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return country;
    }

}

