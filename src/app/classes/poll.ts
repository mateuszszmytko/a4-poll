import { IPoll, IVote } from '../../../api/interfaces/poll.interface';

export class Poll {
	public id:string;
	public question:string;
	public answers:Array<string>

	public votes:Array<IVote>;
	public createdAt:Date;
	
	
	constructor(poll:IPoll)
	constructor(poll:string, answers:Array<string>)
	constructor(poll:any, answers?:any) {
		if(typeof poll == 'string') {
			this.question = poll;
			this.answers = answers;
		} else {
			this.question = poll.question;
			this.answers = poll.answers;
			this.votes = poll.votes;
			this.id = poll._id;
			this.createdAt = new Date(poll.createdAt);
		}
	}
	public get allVotesCount():number {
		return this.votes.length;
	}
	public votesCount(answerId:string | number) {
		return this.votes.filter(v => (typeof answerId === 'number')? 
				v.answer_id === answerId:
				v.answer_id === this.answers.indexOf(answerId)).length;
	}
	public get votesArray() {
		const votes = [];
		for(let i = 0; i < this.answers.length; i++) {
			console.log(i);
			votes.push(this.votesCount(i));
		}
		return votes;
	}
}

