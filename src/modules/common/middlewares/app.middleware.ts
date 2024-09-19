import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //const lang = req.headers['x-lang'] || 'en'; 
//req['language'] = lang;
    console.log(`Request... ${req.method} ${req.originalUrl}`);
    next();
  }
}
