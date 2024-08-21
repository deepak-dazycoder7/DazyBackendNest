import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/action.enum';
import { UserEntity } from 'src/entity/user.entities';
import { PolicyHandler } from 'src/casl/policy.interface';

// Policy to create a user
export class CreateUserPolicy implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, UserEntity);
  }
}


// Policy to update a user
export class UpdateUserPolicy implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, UserEntity);
  }
}

// Policy to delete a user
export class DeleteUserPolicy implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, UserEntity);
  }
}

// Policy to read a user
export class ReadUserPolicy implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, UserEntity);
  }
}

// Policy to read all users
export class ReadAllUsersPolicy implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, UserEntity);
  }
}
