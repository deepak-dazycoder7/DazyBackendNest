import { Injectable } from '@nestjs/common';
import { PureAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from 'src/modules/common/enums/action.enum';
import { Role } from 'src/modules/common/enums/role.enum';
import { AddressEntity } from '../entity/Address.entity';

export type Subjects = InferSubjects<typeof AddressEntity> | 'all';
export type AddressAppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class AddressAbilityFactory {
    createForUser(role: Role): AddressAppAbility {
        const { can, cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(PureAbility as AbilityClass<AddressAppAbility>);

        if (role === Role.Admin) {
            can(Action.Manage, 'all'); // Admin can manage everything
        } else if (role === Role.Manager) {
            can(Action.Manage, AddressEntity); // Manager can manage
        } else {
            cannot(Action.Manage, 'all'); // Restrict all other roles
        }

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
