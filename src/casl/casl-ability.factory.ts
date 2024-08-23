import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { UserEntity } from 'src/entity/user.entity';
import { Role } from 'src/common/roles/role.enum';

type Subjects = InferSubjects<typeof UserEntity> | 'all';
export type AppAbility = PureAbility<[string, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[string, Subjects]>
    >(PureAbility as AbilityClass<AppAbility>);

    if (user.role === Role.Admin) {
      can('manage', 'all'); // Admin has full access
    } else if (user.role === Role.Support) {
      can('read', UserEntity); // Support can only read users
    } else if (user.role === Role.Manager) {
      can('manage', UserEntity);
      can('update', UserEntity),
      cannot('delete', UserEntity); // Manager can manage but cannot delete users
    } else if (user.role === Role.Accountant) {
      can('read', UserEntity);
      can('update', UserEntity, { status: true }); // Accountant can update status only
    } else {
      cannot('manage', 'all'); // Default no access
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
