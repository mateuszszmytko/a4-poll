export interface IPoll {

	question?:string;
	answers?:Array<string>;
	votes?:Array<IVote>;
}

export interface IVote {
	ip?:string;
	
	answer_id?:number;
}