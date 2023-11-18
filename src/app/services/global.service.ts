import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public showMenu:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }
}
