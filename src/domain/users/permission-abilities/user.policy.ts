import { AppAbility } from 'src/domain/users/permission-abilities/user-ability.factory';
import { UserPolicyHandler } from 'src/modules/common/casl/policy.interface';
import { UserEntity } from 'src/domain/users/entity/user.entity';
import { Action } from 'src/domain/property/enums/action.enum';

export class CreatePolicyHandler implements UserPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, UserEntity);
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
