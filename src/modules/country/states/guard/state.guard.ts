import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StateAbilityFactory } from '../permission-abilities/state.ability.factory';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { StatePolicyHandler } from 'src/modules/common/interfaces/policy.interface';

@Injectable()
export class StateGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private abilityFactory: StateAbilityFactory,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const policyHandlers = this.reflector.get<StatePolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
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
