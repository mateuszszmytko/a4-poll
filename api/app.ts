import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import { Response, Request, NextFunction } from 'express';

import { User } from './models/user.model';

import {UsersR} from './routes/users.route';

import { Poll } from './models/poll.model';

import {PollRouter} from './routes/poll.router';
import mongoose = require("mongoose"); //import mongoose

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    
  }

  async init() {
    this.express = express();
    await this.DBConnect();
    this.middleware();
    this.routes();
    
  }

  private async DBConnect() {
    const MONGODB_CONNECTION: string = "mongodb://raa:randompass12@ds153682.mlab.com:53682/votes";
    let connection: mongoose.MongooseThenable = await mongoose.connect(MONGODB_CONNECTION);

  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(function(req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    let a = new User({"email":"rak@02.pl", "firstName":"rak", "lastName":"rakk"});
    console.log(a.fullName());

    router.get('/', async (req:Request, res:Response, next:NextFunction) => {
      const rak = await User.findOne();
 
      res.json({
        message: 'Hello World!',
        data: rak,
        data2: a
      });
    });

    router.post('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });


    this.express.use('/polls', PollRouter);
  }
}

const app = new App();
app.init();

export default app.express;