import { AppAbility } from './casl-ability.factory';
import { PolicyHandler } from './policy.interface';
import { UserEntity } from 'src/entity/user.entity';

export class CreatePolicyHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can('create', UserEntity);
  }
}

export class UpdatePolicyHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can('update', UserEntity);
  }  
}

export class DeletePolicyHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can('delete', UserEntity);
  }
}

export class ReadPolicyHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can('read', UserEntity);
  }
}
