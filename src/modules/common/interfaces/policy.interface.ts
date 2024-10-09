import { AppAbility as UserAppAbility } from 'src/modules/users/permission-abilities/user-ability.factory';
import { AppAbility as PropertyAppAbility } from 'src/modules/property/permission-abilities/property-ability.factory';
import { CategoryAppAbility as CategoryAbilityFactory } from 'src/modules/property/category/permission-abilities/category.ability.factory'
import { DivsionAppAbility as DivisionAbilityFactory } from 'src/modules/property/division/permission-abilities/division.ability.factory';
import { PropertyTypeAppAbility as PropertyTypeAbilityFactory } from 'src/modules/property/property-type/permission-abilities/propertytype.ability.factory';
import { CountryAppAbility as CountryAbilityFactory } from 'src/modules/country/permission-abilities/country.ability.factory';
import { StateAppAbility as StateAbilityFactory } from 'src/modules/country/states/permission-abilities/state.ability.factory';
import { CityAppAbility as CityAbilityFactory } from 'src/modules/country/city/permission-ability/city.abiity.factory';
import { SubCategoryAppAbility as SubCategoryAbilityFactory } from 'src/modules/property/sub-category/permission-abilities/subcategory.ability.factory';
import { AddressAppAbility as AddressAbilityFactory } from 'src/modules/property/address/permission-abilities/address.ability.factory';
import { FilesAppAbility as FilesAbilityFactory } from 'src/modules/property/files/permission-abilities/files.ability.fsctory';

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

export interface CountryPolicyHandler {
  handle(ability: CountryAbilityFactory): boolean;
}

export interface StatePolicyHandler {
  handle(ability: StateAbilityFactory): boolean;
}

export interface CityPolicyHandler {
  handle(ability: CityAbilityFactory): boolean;
}

export interface SubCategoryPolicyHandler {
  handle(ability: SubCategoryAbilityFactory): boolean;
}

export interface AddressPolicyHandler {
  handle(ability: AddressAbilityFactory): boolean;
}

export interface FilesPolicyHandler {
  handle(ability: FilesAbilityFactory): boolean;
}

export type UserPolicyHandlerCallback = (ability: UserAppAbility) => boolean;
export type PropertyPolicyHandlerCallback = (ability: PropertyAppAbility) => boolean;
export type CategoryPolicyHandlerCallback = (ability: CategoryAbilityFactory) => boolean;
export type DivisionPolicyHandlerCallback = (ability: DivisionAbilityFactory) => boolean;
export type PropertyTypePolicyHandlerCallback = (ability: DivisionAbilityFactory) => boolean;
export type CountryPolicyHandlerCallback = (ability: CountryAbilityFactory) => boolean;
export type StatePolicyHandlerCallback = (ability: StateAbilityFactory) => boolean;
export type CityPolicyHandlerCallback = (ability: CityAbilityFactory) => boolean;
export type SubCategoryHandlerCallback = (ability: SubCategoryAbilityFactory) => boolean;
export type AddressHandlerCallback = (ability: AddressAbilityFactory) => boolean;
export type FilesHandlerCallback = (ability: FilesAbilityFactory) => boolean;
