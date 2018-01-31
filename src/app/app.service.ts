import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class AppService {
  constructor(private http: Http) { }
}
