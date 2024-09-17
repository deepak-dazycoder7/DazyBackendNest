import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCityDto } from './dtos/create.city.dto';
import { CityEntity } from './entity/city.entity';
import { CityRepository } from './repository/city.repository';
import { UpdateCityDto } from './dtos/update.city.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: CityRepository,
        private readonly i18n: I18nService,
        private readonly datasource: DataSource
    ) { }

    //create 
    async createCity(Dto: CreateCityDto, userId: number): Promise<CityEntity> {
        const Property = this.cityRepository.create({ ...Dto, created_by: userId });
        return this.cityRepository.save(Property);
    }

    //update 
    async updateCity(id: number, Dto: UpdateCityDto): Promise<CityEntity> {
        await this.cityRepository.update(id, Dto);
        return this.cityRepository.findOne({ where: { id } });
    }

    //remove 
    async softDeleteCity(id: number, deleted_by: number): Promise<void> {
        await this.datasource
            .getRepository(CityEntity)
            .createQueryBuilder()
            .update(CityEntity)
            .set({ deleted_at: new Date(), deleted_by: deleted_by })
            .where("id = :id", { id })
            .execute();
    }

    //read 
    async getOneCity(id: number): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({ where: { id } });
        if (!city) {
            const errorMessage = this.i18n.t('errors.not_found.city', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return city;
    }
    //read all 
    async getAllCity(): Promise<CityEntity[]> {
        const city = await this.cityRepository.find();
        if (!city || city.length === 0) {
            const errorMessage = this.i18n.t('errors.not_found.city', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return city;
    }

}

