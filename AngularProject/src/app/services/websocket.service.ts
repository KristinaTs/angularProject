import {EventEmitter, Injectable} from '@angular/core';
import {Client, Frame, Message} from "stompjs";

import { Subject } from 'rxjs/Subject';

import * as stompjs from 'stompjs';
import * as SockJS from "sockjs-client";


@Injectable()
export class WebSocketService {
  private sock;
  private _subject: Subject<MessageEvent>;
  public url: string = 'ws://192.168.100.6:8080/ticket-websocket';
  public onMessageEmitter = new EventEmitter();
    private messageSource = new Subject<string>();
    messageReceived$ = this.messageSource.asObservable();

    stompClient: Client;


    constructor() {

    }

    connect(id) {
        const socket = new SockJS('http://192.168.100.6:8080/ticket-websocket') as WebSocket;
        this.stompClient = stompjs.over(socket);
        this.stompClient.connect('', '', (frame: Frame) => {
            console.log('CONNECT CONNECT');
            this.stompClient.subscribe('/topic/ticket.' + id , (message: Message) => {
                this.onMessage(message);
            });
        });
    }


    private onMessage(message: Message) {
        console.log('Received greeting:', message);
        //let json = JSON.parse(message.body);
        //this.messageSource.next(json['content']);
        this.onMessageEmitter.emit(message.body);
    }

  //
  // private close(): void {
  //   if (!!this._ws) {
  //     this._ws.close();
  //     this._ws = null;
  //     this._subject = null;
  //   }
  // }
  //
  // private createSubject(url): Subject<MessageEvent> {
  //   let ws = new WebSocket(url);
  //
  //   ws.onopen = function(data) {
  //     console.log("OPEN");
  //     ws.send(JSON.stringify(data));
  //   };
  //
  //   this._ws = ws;
  //
  //   let observable = Observable.create(
  //     (obs: Observer<MessageEvent>) => {
  //       this._ws.onmessage = this.onMessage.bind(this);
  //       this._ws.onerror = obs.error.bind(obs);
  //       this._ws.onclose = obs.complete.bind(obs);
  //
  //       return this._ws.close.bind(this._ws);
  //     });
  //
  //   let observer = {
  //     next: (data: Object) => {
  //       if (this._ws.readyState === WebSocket.OPEN) {
  //         this._ws.send(JSON.stringify(data));
  //       }
  //     }
  //   };
  //
  //   return Subject.create(observer, observable);
  // }
  //
  // public onMessage(data): void {
  //   console.log("TETTTTT");
  //   this.onMessageEmitter.emit(data);
  // }
}
