import { Component, ViewChild } from '@angular/core';
import { ChatComponent } from '../../chat/chat.component';
import { IsChatShownService } from '../../services/is-chat-shown.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ResizeService } from '../../services/resize.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-route',
  standalone: true,
  imports: [ChatComponent, CommonModule],
  templateUrl: './chat-route.component.html',
  styleUrl: './chat-route.component.scss',
})
export class ChatRouteComponent {
  @ViewChild('mainChat') mainChat!: ChatComponent;

  constructor(
    private isChatShownService: IsChatShownService,
    private deviceService: DeviceDetectorService,
    private resizeService: ResizeService
  ) {
    if (this.deviceService.isMobile()) {
      this.isChatShownService.setIsChatShown(false);
    } else {
      this.isChatShownService.setIsChatShown(true);
    }
  }

  ngAfterViewInit() {
    if (this.isMobile) {
      this.resizeService.setIconSize();
      this.resizeService.setMobile();
    } else {
      this.resizeService.startChatObserver(this.mainChat);
    }
  }

  openChat() {
    this.isChatShownService.setIsChatShown(true);
    this.resizeService.startChatObserver(this.mainChat);
  }

  get isChatShown() {
    return this.isChatShownService.isChatShown;
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }
}
