import { AppAbility } from './casl-ability.factory';
import { PolicyHandler } from './policy.interface';

export class CreatePolicyHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can('create', 'all');
  }
}

export class DeletePolicyHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can('delete', 'all');
  }
}
