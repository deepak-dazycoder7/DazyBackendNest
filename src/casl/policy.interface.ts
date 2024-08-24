import { AppAbility as UserAppAbility } from './user-ability.factory';
import { AppAbility as ProductAppAbility } from './product-ability.factory';

export interface UserPolicyHandler {
  handle(ability: UserAppAbility): boolean;
}

export interface ProductPolicyHandler {
  handle(ability: ProductAppAbility): boolean;
}

export type UserPolicyHandlerCallback = (ability: UserAppAbility) => boolean;
export type ProductPolicyHandlerCallback = (ability: ProductAppAbility) => boolean;
