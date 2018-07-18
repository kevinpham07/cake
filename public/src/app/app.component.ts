import { Component, OnInit } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	cakes: any = [];
	newCake: any;
	addRating: any;
	showCake: any;
	avg: any;

	constructor( private _httpService: HttpService){

  }

  ngOnInit(){
  	this.getCakesFromService();
  	this.newCake = { baker: "", img: "" }
  	this.addRating = { rating: "", comment: ""}
  }

  getCakesFromService(): void{
  	this._httpService.getCakes().subscribe(data => {
  		this.cakes = data['cake']
  	})
  }
  onSubmit(): void{
  	this._httpService.postCreate(this.newCake).subscribe( data =>{
  		this.cakes.push(data)
  		this.newCake = { baker: "", img: "" }
  		this.getCakesFromService()
  	})
  }

  onRating(id): void{
  	console.log(this.addRating)
  	console.log(id)
  	this._httpService.putRating(id, this.addRating).subscribe( data =>{
  	})
  	this.getCakesFromService();
  }

  getShowCakeFromService(id): void{
  	console.log(id)
  	this._httpService.getCake(id).subscribe( data =>{
  		console.log("***************DATA*******************", data)
  		this.showCake = data;
  		console.log(this.showCake)
  		let sum = 0;
  	for(let x of this.showCake.ratings){
  		sum += x.rating;
  	}
  	this.avg = sum/this.showCake.ratings.length;
  	})
  }

}
