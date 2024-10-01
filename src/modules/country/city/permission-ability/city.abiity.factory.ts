import { Injectable } from '@nestjs/common';
import { PureAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from 'src/modules/common/enums/action.enum';
import { Role } from 'src/modules/common/enums/role.enum';
import { CityEntity } from '../entity/city.entity';

export type Subjects = InferSubjects<typeof CityEntity> | 'all';
export type CityAppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CityAbilityFactory {
  createForUser(role: Role): CityAppAbility {
    const { can, cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(PureAbility as AbilityClass<CityAppAbility>);

    if (role === Role.Admin) {
      can(Action.Manage, 'all'); // Admin can manage everything
    } else if (role === Role.Manager) {
      can(Action.Manage, CityEntity); // Manager can manage
    } else {
      cannot(Action.Manage, 'all'); // Restrict all other roles
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
