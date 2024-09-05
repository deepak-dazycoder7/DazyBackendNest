import { SetMetadata } from '@nestjs/common';
import { UserPolicyHandler, UserPolicyHandlerCallback, PropertyPolicyHandler, PropertyPolicyHandlerCallback } from 'src/modules/common/casl/policy.interface'

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: (UserPolicyHandler | UserPolicyHandlerCallback | PropertyPolicyHandler | PropertyPolicyHandlerCallback)[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
