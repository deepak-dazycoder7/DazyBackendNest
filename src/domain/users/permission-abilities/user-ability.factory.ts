import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { UserEntity } from 'src/domain/users/entity/user.entity';
import { Action } from 'src/domain/property/enums/action.enum';
import { Role } from 'src/domain/users/enums/role.enum';

type Subjects = InferSubjects<typeof UserEntity> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class UserAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[Action, Subjects]>
    >(PureAbility as AbilityClass<AppAbility>);

    if (user.role === Role.Admin) {
      can(Action.Manage, 'all'); // Admin has full access
    } else if (user.role === Role.Support) {
      can(Action.Read, UserEntity);
      can(Action.Update, UserEntity);
      cannot(Action.Create, UserEntity);
      cannot(Action.Delete, UserEntity);
    } else if (user.role === Role.Manager) {
      can(Action.Manage, UserEntity); // Manager can manage users
      cannot(Action.Create, UserEntity); // Manager can manage but cannot create users
      cannot(Action.Delete, UserEntity); // Manager can manage but cannot delete users
    } else if (user.role === Role.Accountant) {
      can(Action.Read, UserEntity);
      can(Action.Update, UserEntity, { status: 1 }); // Accountant can update status only if it is 1
    } else {
      cannot(Action.Manage, 'all'); // Default no access
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
