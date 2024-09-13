import { SetMetadata } from '@nestjs/common';
import { UserPolicyHandler, UserPolicyHandlerCallback, PropertyPolicyHandler, PropertyPolicyHandlerCallback, CategoryPolicyHandler, CategoryPolicyHandlerCallback, DivisionPolicyHandler, DivisionPolicyHandlerCallback, PropertyTypePolicyHandler, PropertyTypePolicyHandlerCallback } from 'src/modules/common/interfaces/policy.interface'

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: (UserPolicyHandler | UserPolicyHandlerCallback | PropertyPolicyHandler | PropertyPolicyHandlerCallback | CategoryPolicyHandler | CategoryPolicyHandlerCallback | DivisionPolicyHandler | DivisionPolicyHandlerCallback | PropertyTypePolicyHandler | PropertyTypePolicyHandlerCallback)[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
