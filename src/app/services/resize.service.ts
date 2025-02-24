import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatComponent } from '../chat/chat.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  pageHeight: number;
  private chat: ChatComponent | undefined;

  private chatObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (this.deviceService.isMobile()) {
        this.resizeSubject.next({
          height: 100,
          heightUnit: '%',
          width: 100,
          widthUnit: '%',
        });
        return;
      }

      let { height, width } = entry.contentRect;

      const lastChild = entry.target.lastChild;
      const lastChildScrollHeight = (lastChild as HTMLElement)!.scrollHeight;

      const maxPossibleHeightOfChat = lastChildScrollHeight + 30;

      if (maxPossibleHeightOfChat > this.pageHeight * 0.8) {
        height = this.pageHeight * 0.8;
      } else {
        height = maxPossibleHeightOfChat;
      }

      //Add icon height
      height += 110;

      this.resizeSubject.next({
        height,
        heightUnit: 'px',
        width,
        widthUnit: 'px',
      });
    }
  });

  public resizeSubject: Subject<{
    height: number;
    heightUnit: string;
    width: number;
    widthUnit: string;
  }> = new Subject<{
    height: number;
    heightUnit: string;
    width: number;
    widthUnit: string;
  }>();

  constructor(private deviceService: DeviceDetectorService) {
    this.pageHeight = window.innerHeight;

    window.addEventListener('message', (event) => {
      if (event.data.action === 'getHeight') {
        this.pageHeight = event.data.height;
        this.updateChatObserverWithoutChat();
      }
    });
    window.parent.postMessage({ action: 'getHeight' }, '*');

    this.resizeSubject.subscribe(({ height, heightUnit, width, widthUnit }) => {
      this.sendMessageToParent(height, heightUnit, width, widthUnit);
    });
  }

  private sendMessageToParent(
    height: number,
    heightUnit: string,
    width: number,
    widthUnit: string
  ): void {
    console.log('Sending message to parent');
    console.log(height, heightUnit, width, widthUnit);
    window.parent.postMessage(
      {
        action: 'resize',
        height: `${height}${heightUnit}`,
        width: `${width}${widthUnit}`,
      },
      '*'
    );
  }

  public setIconSize(): void {
    this.stopChatObserver();
    if (this.deviceService.isMobile()) {
      this.resizeSubject.next({
        height: 100,
        heightUnit: 'px',
        width: 100,
        widthUnit: 'px',
      });
      return;
    }
    this.resizeSubject.next({
      height: 110,
      heightUnit: 'px',
      width: 110,
      widthUnit: 'px',
    });
  }

  public startChatObserver(chat: ChatComponent): void {
    this.chat = chat;
    this.chatObserver.observe(chat.chatContent.nativeElement);
  }

  public updateChatObserverWithoutChat(): void {
    this.chatObserver.disconnect();
    if (this.chat) {
      this.startChatObserver(this.chat);
    }
  }

  public setMobile() {
    window.parent.postMessage({ action: 'setMobile' }, '*');
  }

  public stopChatObserver(): void {
    this.chat = undefined;
    this.chatObserver.disconnect();
  }
}
