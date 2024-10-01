import { Repository } from 'typeorm';
import { PropertyEntity } from 'src/modules/property/entity/property.entity';

export class PropertyRepository extends Repository<PropertyEntity> {}

