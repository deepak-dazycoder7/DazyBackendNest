import { AppAbility } from './user-ability.factory';
import { UserPolicyHandler } from './policy.interface';
import { UserEntity } from 'src/entity/user.entity';
import { Action } from 'src/enums/action.enum'; // Import the Action enum

export class CreatePolicyHandler implements UserPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, UserEntity); // Use Action.Create instead of 'create'
  }
}

export class UpdatePolicyHandler implements UserPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, UserEntity); // Use Action.Update instead of 'update'
  }  
}

export class DeletePolicyHandler implements UserPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, UserEntity); // Use Action.Delete instead of 'delete'
  }
}

export class ReadPolicyHandler implements UserPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, UserEntity); // Use Action.Read instead of 'read'
  }
}
