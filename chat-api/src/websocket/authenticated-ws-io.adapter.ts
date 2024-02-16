import { INestApplicationContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { wsQueryParam } from 'src/auth/constants';
import { parse } from 'url';

export class AuthenticatedWsIoAdapter extends IoAdapter {
  private readonly jwtService: JwtService;
  constructor(private app: INestApplicationContext) {
    super(app);
    this.jwtService = this.app.get(JwtService);
  }
  createIOServer(port: number, options?: any): any {
    options.allowRequest = async (request, allowFunction) => {
      console.log(request.url);
      const parsed_url = parse(request.url, true);
      const token = parsed_url.query[wsQueryParam.token];
      const verified =
        token &&
        (await this.jwtService.verify(Array.isArray(token) ? token[0] : token));
      if (verified) {
        return allowFunction(null, true);
      } else {
        return allowFunction('Unauthorized', false);
      }
    };

    return super.createIOServer(port, options);
  }
}
