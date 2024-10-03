import { SubCategoryAppAbility } from './subcategory.ability.factory';
import { SubCategoryPolicyHandler } from 'src/modules/common/interfaces/policy.interface';
import { Action } from 'src/modules/common/enums/action.enum';
import { SubCategoryEntity } from '../entity/subCategory.entity';

export class CreateSubCategoryHandler implements SubCategoryPolicyHandler {
    handle(ability: SubCategoryAppAbility): boolean {
        return ability.can(Action.Create, SubCategoryEntity); // Use Action.Create instead of 'create'
    }
}

export class UpdateSubCategoryHandler implements SubCategoryPolicyHandler {
    handle(ability: SubCategoryAppAbility): boolean {
        return ability.can(Action.Update, SubCategoryEntity); // Use Action.Update instead of 'update'
    }
}

export class DeleteSubCategoryHandler implements SubCategoryPolicyHandler {
    handle(ability: SubCategoryAppAbility): boolean {
        return ability.can(Action.Delete, SubCategoryEntity); // Use Action.Delete instead of 'delete'
    }
}

export class ReadSubCategoryHandler implements SubCategoryPolicyHandler {
    handle(ability: SubCategoryAppAbility): boolean {
        return ability.can(Action.Read, SubCategoryEntity); // Use Action.Read instead of 'read'
    }
}

