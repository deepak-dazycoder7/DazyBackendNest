import { AppAbility as UserAppAbility } from 'src/domain/users/permission-abilities/user-ability.factory';
import { AppAbility as PropertyAppAbility } from 'src/domain/property/permission-abilities/property-ability.factory';

export interface UserPolicyHandler {
  handle(ability: UserAppAbility): boolean;
}

export interface PropertyPolicyHandler {
  handle(ability: PropertyAppAbility): boolean;
}

export type UserPolicyHandlerCallback = (ability: UserAppAbility) => boolean;
export type PropertyPolicyHandlerCallback = (ability: PropertyAppAbility) => boolean;
