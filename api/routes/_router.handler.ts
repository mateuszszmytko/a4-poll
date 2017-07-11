import {Router, Request, Response, NextFunction} from 'express';

export abstract class RouterHandler {
	router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	abstract init():void;
}