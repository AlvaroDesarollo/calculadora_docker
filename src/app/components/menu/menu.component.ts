import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public menuShow: boolean = true;
  public menuSubscriber: Subscription = new Subscription();
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private globalService: GlobalService) {
  }

  ngOnInit() {
    this.menuSubscriber =  this.globalService.showMenu.subscribe(ev => {
      console.log('evento en menu:', ev);
      this.menuShow = ev;
    })

  }

  ngOnDestroy(): void {
    console.log('eliminando subscribción');
    this.menuSubscriber.unsubscribe();
  }
}
