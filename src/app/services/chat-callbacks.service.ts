import { Injectable } from '@angular/core';
import { IsChatShownService } from './is-chat-shown.service';
import { ResizeService } from './resize.service';

@Injectable({
  providedIn: 'root'
})
export class ChatCallbacksService {

  constructor(
    private isChatShownService: IsChatShownService,
    private resizeService: ResizeService
  ) { }

  public executeCallback(callback: string) {
    switch (callback) {
      case 'closeChat':
        this.closeChat();
        break;
      default:
        console.error(`Callback ${callback} not found`);
        break;
    }
  }

  private closeChat() {
    this.resizeService.setIconSize();
    this.isChatShownService.setIsChatShown(false);
  }
}
