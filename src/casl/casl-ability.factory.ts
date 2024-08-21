// casl-ability.factory.ts
import { Injectable } from '@nestjs/common';
import { PureAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { UserEntity } from 'src/entity/user.entities'; // Adjust the path as needed

export type Subjects = InferSubjects<typeof UserEntity> | 'all';
export type AppAbility = PureAbility<[string, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>);
  
    if (user.role === 'admin') {
      can('manage', 'all'); // Full access
    } else if (user.role === 'support') {
      can('read', UserEntity);
      cannot('delete', UserEntity);
    } else if (user.role === 'manager') {
      can('manage', UserEntity);
      cannot('delete', UserEntity);
    } else if (user.role === 'accountant') {
      can('read', UserEntity);
      can('update', UserEntity, { status: true }); // Can update status
      cannot('delete', UserEntity);
    } else {
      cannot('manage', 'all');
    }
  
    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}  
