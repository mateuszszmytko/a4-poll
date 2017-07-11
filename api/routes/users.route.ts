import {Router, Request, Response, NextFunction} from 'express';
import { User } from '../models/user.model';

export class UsersRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Heroes.
   */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    let users = await User.find();
    
    res.status(200).send({
      message: 'Success',
      status: res.status,
      user: users
    });
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    let userName = req.params.name;
    let user = await User.findOne({"firstName":userName});
    if (user) {
      res.status(200)
        .send({
          message: 'Success',
          status: res.status,
          user
        });
    }
    else {
      res.status(404)
        .send({
          message: 'No hero found with the given id.',
          status: res.status
        });
    }
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:name', this.getOne);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const usersRouter = new UsersRouter();
usersRouter.init();

export const UsersR = usersRouter.router;