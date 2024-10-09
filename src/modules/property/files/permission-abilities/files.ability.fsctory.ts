import { Injectable } from '@nestjs/common';
import { PureAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from 'src/modules/common/enums/action.enum';
import { Role } from 'src/modules/common/enums/role.enum';
import { FilesEntity } from '../entity/file.entity';

export type Subjects = InferSubjects<typeof FilesEntity> | 'all';
export type FilesAppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class FilesAbilityFactory {
  createForUser(role: Role): FilesAppAbility {
    const { can, cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(PureAbility as AbilityClass<FilesAppAbility>);

    if (role === Role.Admin) {
      can(Action.Manage, 'all'); // Admin can manage everything
    } else if (role === Role.Manager) {
      can(Action.Manage, FilesEntity); // Manager can manage
    } else {
      cannot(Action.Manage, 'all'); // Restrict all other roles
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
