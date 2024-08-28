import { Repository } from 'typeorm';
import { UserEntity } from 'src/domain/users/entity/user.entity';

export class UserRepository extends Repository<UserEntity> {}

