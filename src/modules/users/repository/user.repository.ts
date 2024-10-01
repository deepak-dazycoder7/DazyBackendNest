import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/entity/user.entity';

export class UserRepository extends Repository<UserEntity> {}

