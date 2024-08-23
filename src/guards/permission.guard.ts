import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { CHECK_POLICIES_KEY } from '../decorators/policies.decorator';
import { PolicyHandler } from '../casl/policy.interface';
import { IS_PUBLIC_KEY } from 'src/decorators/publice.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('Route not found');
    }

    const ability = this.abilityFactory.createForUser(user);

    const hasAccess = policyHandlers.every(handler => handler.handle(ability));

    if (!hasAccess) {
      throw new ForbiddenException('Only Admin Access');
    }

    return hasAccess;
  }
}
