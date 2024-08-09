import { Repository } from 'typeorm';
import { UserEntity } from './user.entities';

export class UserRepository extends Repository<UserEntity> {
  // Custom methods here
}

