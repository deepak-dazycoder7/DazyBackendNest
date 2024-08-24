import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductAbilityFactory } from 'src/casl/product-ability.factory';
import { CHECK_POLICIES_KEY } from 'src/decorators/policies.decorator';
import { ProductPolicyHandler } from 'src/casl/policy.interface';
import { IS_PUBLIC_KEY } from 'src/decorators/publice.decorator';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: ProductAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const policyHandlers = this.reflector.get<ProductPolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.role) {
      throw new ForbiddenException('User role not found');
    }

    const ability = this.abilityFactory.createForUser(user.role);

    const hasAccess = policyHandlers.every(handler => handler.handle(ability));

    if (!hasAccess) {
      throw new ForbiddenException('Only Admin And Manager can access');
    }

    return hasAccess;
  }
}
