import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
	@Input() cakeToShow: any;
	@Input() cakeAvg: any;
	avg: number;
  constructor() { }

  ngOnInit() {
  }

  average(){
  	let sum = 0;
  	for(let x of this.cakeToShow.ratings){
  		sum += parseInt(x.rating);
  	}
  	this.avg = sum/this.cakeToShow.ratings.length;
  }

}
