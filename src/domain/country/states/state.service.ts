import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStateDto } from './dtos/create.state.dto';
import { StateEntity } from './entity/state.entity';
import { StateRepository } from './repository/state.repositiory';
import { UpdateStateDto } from './dtos/update.state.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

@Injectable()
export class StateService {
    constructor(
        @InjectRepository(StateEntity)
        private readonly stateRepository: StateRepository,
        private readonly i18n: I18nService,
        private readonly datasource: DataSource
    ) { }

    //create 
    async createState(Dto: CreateStateDto, userId: number): Promise<StateEntity> {
        const Property = this.stateRepository.create({ ...Dto, created_by: userId });
        return this.stateRepository.save(Property);
    }

    //update 
    async updateState(id: number, Dto: UpdateStateDto): Promise<StateEntity> {
        await this.stateRepository.update(id, Dto);
        return this.stateRepository.findOne({ where: { id } });
    }

    //remove 
    async softDeleteState(id: number, deleted_by: number): Promise<void> {
        await this.datasource
            .getRepository(StateEntity)
            .createQueryBuilder()
            .update(StateEntity)
            .set({ deleted_at: new Date(), deleted_by: deleted_by })
            .where("id = :id", { id })
            .execute();
    }

    //read 
    async getOneState(id: number): Promise<StateEntity> {
        const state = await this.stateRepository.findOne({ where: { id } });
        if (!state) {
            const errorMessage = this.i18n.t('errors.not_found.state', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return state;
    }
    //read all 
    async getAllState(): Promise<StateEntity[]> {
        const state = await this.stateRepository.find();
        if (!state || state.length === 0) {
            const errorMessage = this.i18n.t('errors.not_found.state', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return state;
    }

}

