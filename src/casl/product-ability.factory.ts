import { Injectable } from '@nestjs/common';
import { PureAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { ProductEntity } from 'src/entity/product.entity';
import { Action } from 'src/enums/action.enum';
import { Role } from 'src/enums/role.enum';

export type Subjects = InferSubjects<typeof ProductEntity> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class ProductAbilityFactory {
  createForUser(role: Role): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(PureAbility as AbilityClass<AppAbility>);

    if (role === Role.Admin) {
      can(Action.Manage, 'all'); // Admin can manage everything
    } else if (role === Role.Manager) {
      can(Action.Manage, ProductEntity); // Manager can manage products
     // cannot(Action.Create, ProductEntity)
    } else {
      cannot(Action.Manage, 'all'); // Restrict all other roles
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
