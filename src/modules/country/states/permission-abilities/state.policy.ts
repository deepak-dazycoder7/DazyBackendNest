import { StateAppAbility } from './state.ability.factory';
import { StatePolicyHandler } from 'src/modules/common/interfaces/policy.interface';
import { Action } from 'src/modules/common/enums/action.enum';
import { StateEntity } from '../entity/state.entity';

export class CreateStateHandler implements StatePolicyHandler {
    handle(ability: StateAppAbility): boolean {
        return ability.can(Action.Create, StateEntity); // Use Action.Create instead of 'create'
    }
}

export class UpdateStateHandler implements StatePolicyHandler {
    handle(ability: StateAppAbility): boolean {
        return ability.can(Action.Update, StateEntity); // Use Action.Update instead of 'update'
    }
}

export class DeleteStateHandler implements StatePolicyHandler {
    handle(ability: StateAppAbility): boolean {
        return ability.can(Action.Delete, StateEntity); // Use Action.Delete instead of 'delete'
    }
}

export class ReadStateHandler implements StatePolicyHandler {
    handle(ability: StateAppAbility): boolean {
        return ability.can(Action.Read, StateEntity); // Use Action.Read instead of 'read'
    }
}

