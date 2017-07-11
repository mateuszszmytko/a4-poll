import {Router, Request, Response, NextFunction} from 'express';

import { RouterHandler } from './_router.handler';
import { Poll } from '../models/poll.model';

class PollRouterHandler extends RouterHandler {
  router: Router

  constructor() {
    super();
  }

  /**
   * Routes
   */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    let polls = await Poll.find();
    
    res.status(200).send({
      message: 'Success',
      status: res.status,
      polls: polls
    });
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    let userName = req.params.name;

    let user = await Poll.findOne({"firstName":userName});
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

  private async postPoll(req: Request, res: Response, next: NextFunction) {
    const {question, answers} = req.body,
          poll = new Poll({question: question, answers: answers});

    try{
      await poll.save();
      res.status(200)
        .send({
          message: 'Poll created.',
          poll: poll,
          status: res.status
        });
    } catch(e) {
      res.status(500)
        .send({
          message: 'Unexptected error.',
          status: res.status
        });
    }
    
  }
  private async addAnswer(req: Request, res: Response, next: NextFunction) {
      const 
            {answers_id} = req.body,
            poll_id = req.params.id,
            poll = await Poll.findById(poll_id);

      
    if (poll) {
      poll.votes.push({ip: req.ip, answers_id: answers_id});
      try{
        await poll.save();
        res.status(200)
          .send({
            message: 'Poll changed.',
            poll: poll,
            status: res.status
          });
      } catch(e) {
        res.status(500)
          .send({
            message: 'Unexptected error.',
            status: res.status
          });
      }

    }
    else {
      res.status(404)
        .send({
          message: 'Invalid poll id.',
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
    this.router.get('/:id', this.getOne);
    this.router.put('/:id', this.addAnswer);
    this.router.post('/', this.postPoll);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const routerHandler = new PollRouterHandler();
export const PollRouter = routerHandler.router;