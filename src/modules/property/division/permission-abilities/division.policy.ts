import { DivsionAppAbility } from './division.ability.factory';
import { DivisionPolicyHandler } from 'src/modules/common/interfaces/policy.interface';
import { Action } from 'src/modules/common/enums/action.enum';
import { DivisionEntity } from '../entity/division.entity';

export class CreateDivisionHandler implements DivisionPolicyHandler {
  handle(ability: DivsionAppAbility): boolean {
    return ability.can(Action.Create, DivisionEntity); // Use Action.Create instead of 'create'
  }
}

export class UpdateDivisionHandler implements DivisionPolicyHandler {
  handle(ability: DivsionAppAbility): boolean {
    return ability.can(Action.Update, DivisionEntity); // Use Action.Update instead of 'update'
  }
}

export class DeleteDivisionHandler implements DivisionPolicyHandler {
  handle(ability: DivsionAppAbility): boolean {
    return ability.can(Action.Delete, DivisionEntity); // Use Action.Delete instead of 'delete'
  }
}

export class ReadDivisionHandler implements DivisionPolicyHandler {
  handle(ability: DivsionAppAbility): boolean {
    return ability.can(Action.Read, DivisionEntity); // Use Action.Read instead of 'read'
  }
}

