import { SetMetadata } from '@nestjs/common';
import { PolicyHandler, PolicyHandlerCallback } from './policy.interface';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: (PolicyHandler | PolicyHandlerCallback)[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
