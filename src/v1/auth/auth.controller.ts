import { Controller, Get, Post, Req, Put } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { stringify } from 'querystring';

@Controller('v1')
export class AuthController {
    @Post('')
    sign(): object {
        const secret: string = 'test';
        const payload: object = {
            // exp: ,
            // nbf: ,
            // iss: '',
            // sub: '',
            // aud: '',
            k1: 'v1',
            k2: 2
        }
        const access_token: string = jwt.sign(
            payload,
            secret, 
            { 
                algorithm: 'HS256',
                expiresIn: 60 * 1,
                issuer: 'mparang'
            });
        //
        const refresh_token: string = jwt.sign(
            payload,
            secret, 
            { 
                algorithm: 'HS256',
                expiresIn: 60 * 60 * 24 * 30,
                issuer: 'mparang'
            });
        //
        const tokens: Array<string> = access_token.split('.');
        const r_header: string = tokens.shift();
        const r_payload: string = tokens.shift();
        const r_signature_access: string = tokens.shift();
        const r_signature_refresh: string = refresh_token.split('.').pop();
        //
        return {
            header: r_header,
            payload: r_payload,
            signature: {
                access: r_signature_access,
                refresh: r_signature_refresh,
            },
        };
    }

    @Put('')
    verify(@Req() req: Request): object {
        return {
            access_token: req.headers.accken?? null,
            refresh_token: req.headers.refken?? null,
            payload: jwt.verify(req.headers.accken as string, 'test')
        };
    }
}
