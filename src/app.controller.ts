import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { Ext } from './middleware/request-ext.middleware';
import * as pkg from '../package.json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['i', 'info'])
  getInfo(@Req() req: Request): object {
    //
    const req_ext: Ext = (req as any).ext;
    //
    return {
      app: pkg.name,
      version: pkg.version,
      remote: (req as any).remote,
      remotes: req_ext.remotes,
    }
  }
}
