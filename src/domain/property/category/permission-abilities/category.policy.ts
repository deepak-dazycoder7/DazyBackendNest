import { CategoryAppAbility } from './category.ability.factory';
import { CategoryPolicyHandler } from 'src/modules/common/interfaces/policy.interface';
import { Action } from 'src/modules/common/enums/action.enum';
import { CategoryEntity } from '../entity/category.entity';

export class CreateCategoryHandler implements CategoryPolicyHandler {
  handle(ability: CategoryAppAbility): boolean {
    return ability.can(Action.Create, CategoryEntity); // Use Action.Create instead of 'create'
  }
}

export class UpdateCategoryHandler implements CategoryPolicyHandler {
  handle(ability: CategoryAppAbility): boolean {
    return ability.can(Action.Update, CategoryEntity); // Use Action.Update instead of 'update'
  }  
}

export class DeleteCategoryHandler implements CategoryPolicyHandler {
  handle(ability: CategoryAppAbility): boolean {
    return ability.can(Action.Delete, CategoryEntity); // Use Action.Delete instead of 'delete'
  }
}

export class ReadCategoryHandler implements CategoryPolicyHandler {
  handle(ability: CategoryAppAbility): boolean {
    return ability.can(Action.Read, CategoryEntity); // Use Action.Read instead of 'read'
  }
}

