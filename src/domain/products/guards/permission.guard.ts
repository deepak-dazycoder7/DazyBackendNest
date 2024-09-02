import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductAbilityFactory } from 'src/domain/products/permission-abilities/product-ability.factory';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { ProductPolicyHandler } from 'src/modules/common/casl/policy.interface';
import { IS_PUBLIC_KEY } from 'src/modules/common/decorators/publice.decorator';

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
      throw new ForbiddenException();
    }

    const ability = this.abilityFactory.createForUser(user.role);

    const hasAccess = policyHandlers.every(handler => handler.handle(ability));

    if (!hasAccess) {
      throw new ForbiddenException();
    }

    return hasAccess;
  }
}
