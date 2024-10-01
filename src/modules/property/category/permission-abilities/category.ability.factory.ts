import { Injectable } from '@nestjs/common';
import { PureAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from 'src/modules/common/enums/action.enum';
import { Role } from 'src/modules/common/enums/role.enum';
import { CategoryEntity } from '../entity/category.entity';

export type Subjects = InferSubjects<typeof CategoryEntity> | 'all';
export type CategoryAppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CategoryAbilityFactory {
  createForUser(role: Role): CategoryAppAbility {
    const { can, cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(PureAbility as AbilityClass<CategoryAppAbility>);

    if (role === Role.Admin) {
      can(Action.Manage, 'all'); // Admin can manage everything
    } else if (role === Role.Manager) {
      can(Action.Manage, CategoryEntity); // Manager can manage
    } else {
      cannot(Action.Manage, 'all'); // Restrict all other roles
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
