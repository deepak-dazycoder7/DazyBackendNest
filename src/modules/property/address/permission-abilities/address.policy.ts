import { AddressAppAbility } from './Address.ability.factory';
import { AddressPolicyHandler } from 'src/modules/common/interfaces/policy.interface';
import { Action } from 'src/modules/common/enums/action.enum';
import { AddressEntity } from '../entity/Address.entity';

export class CreateAddressHandler implements AddressPolicyHandler {
    handle(ability: AddressAppAbility): boolean {
        return ability.can(Action.Create, AddressEntity); // Use Action.Create instead of 'create'
    }
}

export class UpdateAddressHandler implements AddressPolicyHandler {
    handle(ability: AddressAppAbility): boolean {
        return ability.can(Action.Update, AddressEntity); // Use Action.Update instead of 'update'
    }
}

export class DeleteAddressHandler implements AddressPolicyHandler {
    handle(ability: AddressAppAbility): boolean {
        return ability.can(Action.Delete, AddressEntity); // Use Action.Delete instead of 'delete'
    }
}

export class ReadAddressHandler implements AddressPolicyHandler {
    handle(ability: AddressAppAbility): boolean {
        return ability.can(Action.Read, AddressEntity); // Use Action.Read instead of 'read'
    }
}

