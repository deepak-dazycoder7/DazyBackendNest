import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { UserEntity } from 'src/entity/user.entities'; 

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private jwtAuthGuard: JwtAuthGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Ensure JWT authentication
    const isAuthenticated = await this.jwtAuthGuard.canActivate(context);
    if (!isAuthenticated) {
      return false; // JWT authentication failed
    }

    // Authorization
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Populated by JwtAuthGuard
    const ability = this.caslAbilityFactory.createForUser(user);

    // Extract metadata
    const requiredAction = this.reflector.get<string>('action', context.getHandler());
    const subjectMetadata = this.reflector.get<string>('subject', context.getHandler());

    // Debugging logs
    console.log('User:', user);
    console.log('Required Action:', requiredAction);
    console.log('Subject Metadata:', subjectMetadata);

    if (!requiredAction || !subjectMetadata) {
      throw new ForbiddenException('Action or subject metadata not found');
    }

    // Ensure subject is correctly typed
    let subject: any;
    if (subjectMetadata === 'UserEntity') {
      subject = UserEntity;
    } else {
      subject = subjectMetadata;
    }

    if (!ability.can(requiredAction, subject as any)) {
      throw new ForbiddenException('Access denied: Forbidden resource');
    }

    return true;
  }
}
