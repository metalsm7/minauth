import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface Ext {
  remote: string|null;
  remotes: object|null;
  is_secure: boolean;
}

// export class RequestExt extends Request {
//   ext: Ext;
//   constructor(input: RequestInfo, init?: RequestInit) {
//     super(input, init);
//   }
// }

@Injectable()
export class RequestExtMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    //
    const ext: Ext = {
      remote: req.ip?? null,
      remotes: {
        'x-real-ip': req.headers['x-real-ip']?? null,
        'x-forwarded-for': req.headers['x-forwarded-for']?? null,
        ip: req.ip?? null,
      },
      is_secure: false,
    } as Ext;
    //
    ext.remotes['x-forwarded-for'] && (ext.remote = ext.remotes['x-forwarded-for']);
    ext.remotes['x-real-ip'] && (ext.remote = ext.remotes['x-real-ip']);
    //
    (req as any).ext = ext;
    //
    next();
  }
}
