import { SetMetadata } from '@nestjs/common';
import { UserPolicyHandler, UserPolicyHandlerCallback, PropertyPolicyHandler, PropertyPolicyHandlerCallback, CategoryPolicyHandler, CategoryPolicyHandlerCallback, DivisionPolicyHandler, DivisionPolicyHandlerCallback, PropertyTypePolicyHandler, PropertyTypePolicyHandlerCallback, CountryPolicyHandler, CountryPolicyHandlerCallback, StatePolicyHandler, StatePolicyHandlerCallback } from 'src/modules/common/interfaces/policy.interface'

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: (UserPolicyHandler | UserPolicyHandlerCallback | PropertyPolicyHandler | PropertyPolicyHandlerCallback | CategoryPolicyHandler | CategoryPolicyHandlerCallback | DivisionPolicyHandler | DivisionPolicyHandlerCallback | PropertyTypePolicyHandler | PropertyTypePolicyHandlerCallback | CountryPolicyHandler | CountryPolicyHandlerCallback | StatePolicyHandler | StatePolicyHandlerCallback)[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
