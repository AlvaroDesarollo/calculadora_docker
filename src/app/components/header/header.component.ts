import { MenuController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('titulo') titulo: string = '<b>Calculadora';

  constructor(private globalService: GlobalService, private menuController:MenuController) {
  }

  ngOnInit() {}

  menu() {
    const actual:boolean = this.globalService.showMenu.getValue();

    this.globalService.showMenu.next(!actual)
    this.menuController.enable(true, 'first-menu')
    actual ? this.menuController.close('first-menu') : this.menuController.open('first-menu')
    console.log('evento menu, componente', actual, this.menuController.isOpen('first-menu'));
  }
}
