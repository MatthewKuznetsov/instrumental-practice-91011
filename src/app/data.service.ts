import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class DataService {
  readonly baseURL = 'http://localhost:8080/api/';
}