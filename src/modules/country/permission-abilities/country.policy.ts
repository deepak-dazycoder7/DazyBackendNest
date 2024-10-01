import { CountryAppAbility } from './country.ability.factory';
import { CountryPolicyHandler } from 'src/modules/common/interfaces/policy.interface';
import { Action } from 'src/modules/common/enums/action.enum';
import { CountryEntity } from '../entity/country.entity';

export class CreateCountryHandler implements CountryPolicyHandler {
    handle(ability: CountryAppAbility): boolean {
        return ability.can(Action.Create, CountryEntity); // Use Action.Create instead of 'create'
    }
}

export class UpdateCountryHandler implements CountryPolicyHandler {
    handle(ability: CountryAppAbility): boolean {
        return ability.can(Action.Update, CountryEntity); // Use Action.Update instead of 'update'
    }
}

export class DeleteCountryHandler implements CountryPolicyHandler {
    handle(ability: CountryAppAbility): boolean {
        return ability.can(Action.Delete, CountryEntity); // Use Action.Delete instead of 'delete'
    }
}

export class ReadCountryHandler implements CountryPolicyHandler {
    handle(ability: CountryAppAbility): boolean {
        return ability.can(Action.Read, CountryEntity); // Use Action.Read instead of 'read'
    }
}

