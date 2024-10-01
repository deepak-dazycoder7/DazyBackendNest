import { PropertyTypeAppAbility } from './propertytype.ability.factory';
import { PropertyTypePolicyHandler } from 'src/modules/common/interfaces/policy.interface';
import { Action } from 'src/modules/common/enums/action.enum';
import { PropertyTypeEntity } from '../entity/property-type.entity';

export class CreatePropertyTypeHandler implements PropertyTypePolicyHandler {
    handle(ability: PropertyTypeAppAbility): boolean {
        return ability.can(Action.Create, PropertyTypeEntity); // Use Action.Create instead of 'create'
    }
}

export class UpdatePropertyTypeHandler implements PropertyTypePolicyHandler {
    handle(ability: PropertyTypeAppAbility): boolean {
        return ability.can(Action.Update, PropertyTypeEntity); // Use Action.Update instead of 'update'
    }
}

export class DeletePropertyTypeHandler implements PropertyTypePolicyHandler {
    handle(ability: PropertyTypeAppAbility): boolean {
        return ability.can(Action.Delete, PropertyTypeEntity); // Use Action.Delete instead of 'delete'
    }
}

export class ReadPropertyTypeHandler implements PropertyTypePolicyHandler {
    handle(ability: PropertyTypeAppAbility): boolean {
        return ability.can(Action.Read, PropertyTypeEntity); // Use Action.Read instead of 'read'
    }
}

