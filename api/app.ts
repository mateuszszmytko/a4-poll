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
    this.express.use(express.static(path.join(__dirname, '../dist')));
  }


  private routes(): void {
    let router = express.Router();
    
    this.express.use('/api', router);
    router.use('/polls', PollRouter);

    this.express.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });

    
  }
}

const app = new App();
app.init();

export default app.express;