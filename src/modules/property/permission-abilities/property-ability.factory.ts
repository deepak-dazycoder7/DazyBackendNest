import { Injectable } from '@nestjs/common';
import { PureAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { PropertyEntity } from 'src/modules/Property/entity/property.entity';
import { Action } from '../../../modules/common/enums/action.enum';
import { Role } from 'src/modules/common/enums/role.enum';

export type Subjects = InferSubjects<typeof PropertyEntity> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class PropertyAbilityFactory {
  createForUser(role: Role): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(PureAbility as AbilityClass<AppAbility>);

    if (role === Role.Admin) {
      can(Action.Manage, 'all'); // Admin can manage everything
    } else if (role === Role.Manager) {
      can(Action.Manage, PropertyEntity); // Manager can manage Propertys
     // cannot(Action.Create, PropertyEntity)
    } else {
      cannot(Action.Manage, 'all'); // Restrict all other roles
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
