import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CountryAbilityFactory } from '../permission-abilities/country.ability.factory';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CountryPolicyHandler } from 'src/modules/common/interfaces/policy.interface';

@Injectable()
export class CountryGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private abilityFactory: CountryAbilityFactory,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const policyHandlers = this.reflector.get<CountryPolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
        const { user } = context.switchToHttp().getRequest();

        if (!user || !user.role) {
            throw new ForbiddenException('User role not found');
        }

        const ability = this.abilityFactory.createForUser(user.role);

        const hasAccess = policyHandlers.every(handler => handler.handle(ability));

        if (!hasAccess) {
            throw new ForbiddenException();
        }

        return hasAccess;
    }
}
