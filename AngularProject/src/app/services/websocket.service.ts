import {EventEmitter, Injectable} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class WebSocketService {
  private _ws: WebSocket;
  private _subject: Subject<MessageEvent>;
  public url: string = 'ws://192.168.33.102:8080/ticket-websocket';
  public onMessageEmitter = new EventEmitter();


  public connect(url = this.url): Subject<MessageEvent> {
    if (!this._subject) {
      this._subject = this.createSubject(url);
    }

    return this._subject;
  }

  private close(): void {
    if (!!this._ws) {
      this._ws.close();
      this._ws = null;
      this._subject = null;
    }
  }

  private createSubject(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    ws.onopen = function(data) {
      ws.send(JSON.stringify(data));
    };

    this._ws = ws;

    let observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        this._ws.onmessage = this.onMessage.bind(this);
        this._ws.onerror = obs.error.bind(obs);
        this._ws.onclose = obs.complete.bind(obs);

        return this._ws.close.bind(this._ws);
      });

    let observer = {
      next: (data: Object) => {
        if (this._ws.readyState === WebSocket.OPEN) {
          this._ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }

  public onMessage(data): void {
    this.onMessageEmitter.emit(data);
  }
}
