import { Injectable } from '@nestjs/common';
import { I18nResolver } from 'nestjs-i18n';

@Injectable()
export class CustomHeaderResolver implements I18nResolver {
  resolve(req: any): string {
    if (!req || !req.headers) {
      return 'en'; // Default to English if request or headers are not defined
    }
    console.log('Header Resolver - x-lang:', req.headers['x-lang']);
    return req.headers['x-lang'] || 'en'; // Default to English if x-lang is not set
  }
}
