import { AppAbility as UserAppAbility } from 'src/domain/users/permission-abilities/user-ability.factory';
import { AppAbility as PropertyAppAbility } from 'src/domain/property/permission-abilities/property-ability.factory';
import { CategoryAppAbility as CategoryAbilityFactory } from 'src/domain/property/category/permission-abilities/category.ability.factory'
import { DivsionAppAbility as DivisionAbilityFactory } from 'src/domain/property/division/permission-abilities/division.ability.factory';
import { PropertyTypeAppAbility as PropertyTypeAbilityFactory } from 'src/domain/property/property-type/permission-abilities/propertytype.ability.factory';

export interface UserPolicyHandler {
  handle(ability: UserAppAbility): boolean;
}

export interface PropertyPolicyHandler {
  handle(ability: PropertyAppAbility): boolean;
}

export interface CategoryPolicyHandler {
  handle(ability: CategoryAbilityFactory): boolean;
}

export interface DivisionPolicyHandler {
  handle(ability: DivisionAbilityFactory): boolean;
}

export interface PropertyTypePolicyHandler {
  handle(ability: PropertyTypeAbilityFactory): boolean;
}

export type UserPolicyHandlerCallback = (ability: UserAppAbility) => boolean;
export type PropertyPolicyHandlerCallback = (ability: PropertyAppAbility) => boolean;
export type CategoryPolicyHandlerCallback = (ability: CategoryAbilityFactory) => boolean;
export type DivisionPolicyHandlerCallback = (ability: DivisionAbilityFactory) => boolean;
export type PropertyTypePolicyHandlerCallback = (ability: DivisionAbilityFactory) => boolean;
