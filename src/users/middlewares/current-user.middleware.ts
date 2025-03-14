import { NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service';
import { NextFunction, Request, Response } from 'express';

export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
 
    if (userId) {
      const user = await this.usersService.findOne(userId);
      console.log("🚀 ~ CurrentUserMiddleware ~ use ~ user:", user)

      // @ts-ignore
      req.currentUser = user;
    }

    next();
  }
}
