import { Repository } from 'typeorm';
import { AddressEntity } from '../entity/Address.entity';

export class AddressRepository extends Repository<AddressEntity> { }
