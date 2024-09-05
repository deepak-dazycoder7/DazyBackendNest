import { Repository } from 'typeorm';
import { PropertyEntity } from 'src/domain/property/entity/property.entity';

export class PropertyRepository extends Repository<PropertyEntity> {}

