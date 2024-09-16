import { Repository } from 'typeorm';
import { CountryEntity } from '../entity/country.entity';

export class CountryRepository extends Repository<CountryEntity> { }
