import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private _http: HttpClient ) {
  }

  getCakes(){
  	return this._http.get('/cakes');
  }

  postCreate(cake){
  	return this._http.post('/cakes', cake);
  }

  putRating(id, rating){
  	return this._http.put('/cakes/' + id, rating)
  }

  getCake(id){
  	return this._http.get('/cakes/' + id)
  }

}
