import { CityAppAbility } from './city.abiity.factory';
import { CityPolicyHandler } from 'src/modules/common/interfaces/policy.interface';
import { Action } from 'src/modules/common/enums/action.enum';
import { CityEntity } from '../entity/city.entity';

export class CreateCityHandler implements CityPolicyHandler {
    handle(ability: CityAppAbility): boolean {
        return ability.can(Action.Create, CityEntity); // Use Action.Create instead of 'create'
    }
}

export class UpdateCityHandler implements CityPolicyHandler {
    handle(ability: CityAppAbility): boolean {
        return ability.can(Action.Update, CityEntity); // Use Action.Update instead of 'update'
    }
}

export class DeleteCityHandler implements CityPolicyHandler {
    handle(ability: CityAppAbility): boolean {
        return ability.can(Action.Delete, CityEntity); // Use Action.Delete instead of 'delete'
    }
}

export class ReadCityHandler implements CityPolicyHandler {
    handle(ability: CityAppAbility): boolean {
        return ability.can(Action.Read, CityEntity); // Use Action.Read instead of 'read'
    }
}

