import {Router, Request, Response, NextFunction} from 'express';

import { RouterHandler } from './_router.handler';
import { Poll } from '../models/poll.model';
import { IPoll } from '../interfaces/poll.interface';

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
    let id = req.params.id;

    try {
      let poll = await Poll.findById(id);
    
      res.status(200)
        .send({
          message: 'Success',
          poll: poll
        });
    }
    catch(e) {
      res.status(404)
        .send({
          message: 'No hero found with the given id.',
          status: res.status
        });
    }
  }

  private async postPoll(req: Request, res: Response, next: NextFunction) {
    const pollRq:IPoll = req.body,
          poll = new Poll({question: pollRq.question, answers: pollRq.answers});

    try{
      await poll.save();
      res.status(200)
        .send({
          message: 'Poll created.',
          poll: poll,
          status: res.status
        });
    } catch(e) {
      res.status(400)
        .send({
          message: 'Bad request.',
          status: res.status
        });
    }
    
  }
  private async addVote(req: Request, res: Response, next: NextFunction) {
      const {answer_id, ip} = req.body,
            poll_id = req.params.id,
            poll = await Poll.findById(poll_id);
    console.log(answer_id, ip);
      
    if (poll) {
      if(poll.votes.filter(v => v.ip == ip).length > 0) {
        res.status(400)
          .send({
            message: 'Ip declared.',
            status: res.status
          });

          return;
      }
      poll.votes.push({ip: ip, answer_id: answer_id});
      try{
        await poll.save();
        res.status(200)
          .send({
            message: 'Poll changed.',
            poll: poll,
            status: res.status
          });
      } catch(e) {
        res.status(400)
          .send({
            message: 'Bad request.',
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

  private async removePoll(req:Request, res:Response) {
    let poll_id = req.params.id,
        poll = Poll.findById(poll_id);
    
    if(poll) {
      await poll.remove();
      res.status(200)
        .send({
          message: 'Poll deleted.',
          status: res.status
        });
    } else {
      res.status(404)
        .send({
          message: 'Invalid poll id.',
          status: res.status
        });
    }

  }

  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
    this.router.put('/:id', this.addVote);
    this.router.delete('/:id', this.removePoll);
    this.router.post('/', this.postPoll);
  }

}

const routerHandler = new PollRouterHandler();
export const PollRouter = routerHandler.router;