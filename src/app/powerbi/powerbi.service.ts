import { Injectable, EventEmitter} from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class PowerBIService {
  layoutShowTabs = new EventEmitter<void>();
  constructor(private http: Http) { }
  private _serverError(err: any) {
    return Observable.throw(err || 'backend server error');
  }
  //get embaddedToken and accessToken after authenticate users in Azure AD.
  getEmbedTokens(id) {
    return this.http.get('/api/aurth/dashboardembaddedtoken/'+ id)
      .map(res => res.json())
      .catch(this._serverError);
  }
  getDashbaordEmbedTokens(id) {
    return this.http.get('/api/aurth/dashboardembaddedtoken/'+ id)
      .map(res => res.json())
      .catch(this._serverError);
  }
  getReportEmbedTokens(id) {
    return this.http.get('/api/aurth/reportembaddedtoken/'+ id)
      .map(res => res.json())
      .catch(this._serverError);
  }
  getReportList() {
    return this.http.get('/api/collection/reports')
      .map(res => res.json())
      .catch(this._serverError);
  }
  getWorkspacetList() {
    return this.http.get('/api/collection/workspaces')
      .map(res => res.json())
      .catch(this._serverError);
  }
  getDashboarList() {
    return this.http.get('/api/collection/dashboards')
      .map(res => res.json())
      .catch(this._serverError);
  }
}
