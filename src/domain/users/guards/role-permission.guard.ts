import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserAbilityFactory } from 'src/domain/users/permission-abilities/user-ability.factory';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { UserPolicyHandler } from 'src/modules/common/casl/policy.interface';
import { IS_PUBLIC_KEY } from 'src/modules/common/decorators/publice.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: UserAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const policyHandlers = this.reflector.get<UserPolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.role) {
      throw new ForbiddenException('User role not found');
    }

    const ability = this.abilityFactory.createForUser(user);

    const hasAccess = policyHandlers.every(handler => handler.handle(ability));

    if (!hasAccess) {
      throw new ForbiddenException('Only Admin Access');
    }

    return hasAccess;
  }
}
