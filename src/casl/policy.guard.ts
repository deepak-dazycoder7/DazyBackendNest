import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY } from './policies.decorator';
import { PolicyHandler } from './policy.interface';
import { IS_PUBLIC_KEY } from 'src/decorators/publice.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if the route is public
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    // Get policy handlers and user abilities
    const policyHandlers = this.reflector.get<PolicyHandler[]>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    ) || [];

    const { user } = context.switchToHttp().getRequest();
    console.log('User:', user);

    if (!user) {
      throw new ForbiddenException('Route not found');
    }

    const ability = this.abilityFactory.createForUser(user);
    console.log('Ability:', ability);

  
    const hasAccess = policyHandlers.every((handler) =>
      handler.handle(ability),
    );
    console.log('Policy Handlers:', policyHandlers);

    if (!hasAccess) {
      throw new ForbiddenException('Only Admin Access');
    }

    return hasAccess;
  }
}
