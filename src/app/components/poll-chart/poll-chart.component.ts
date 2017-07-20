import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { Poll } from '../../classes/poll';

import { BaseChartDirective } from 'ng2-charts';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'poll-chart',
  templateUrl: './poll-chart.component.html',
  styleUrls: ['./poll-chart.component.css'],
  providers: []
})
export class PollChartComponent implements OnInit {
  @Input() pollStream:Subject<Poll>;
  poll:Poll; 
  
  public dataSets:Array<any> = [
    {data: [,,,,,,,,]}
  ];
  public labels:Array<any> = [];
  public chartOptions:any = {
    responsive: false
  };

 

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: {poll: Poll}) => {
        this.poll = data.poll;
        this.update();
      });

    this.pollStream.subscribe(p => {
      this.poll = p;
      this.update();
    });
  }

  update() {
    this.dataSets = [{data: this.poll.votesArray}];
    this.labels.length = 0;

    for (let i = 0; i < this.poll.answers.length; i++) {
      this.labels.push(this.poll.answers[i]);
    }
  }

}
