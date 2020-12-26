import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AccessTokenEntity } from '../moduls/users/entity/access.token.entity';

@Injectable()
export class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization && !request.query.token) {
      return false;
    }

    const accessToken = request.headers.authorization || request.query.token;
    const token = await AccessTokenEntity.findOne({
      where: { token: accessToken },
      relations: ['user'],
    });
    const currentTime = Math.floor(Date.now() / 1000);


    const { id, email } = token.user;

    request.session.user = { id, email };

    return token && token.user && currentTime < token.expires;

  }
}