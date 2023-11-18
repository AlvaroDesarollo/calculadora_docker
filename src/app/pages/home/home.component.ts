import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alert.service';
import { PetitionsService } from 'src/app/services/petitions.service';
import { environment } from 'src/environments/environment.local';

interface Operacion {
  num1: string;
  num2: string;
  op: string;
  res: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public op: Operacion[] = [];
  public resultado: string = '';
  public numTemporal: string = '';

  constructor(
    private petition: PetitionsService,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    this.op = [];
  }

  realizarOperacion(opcion: string) {
    switch (opcion) {
      case 'C':
        this.op = [];
        this.resultado = '';
        return;
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
        this.op[0].op = opcion;
        this.resultado = '';
        return;
      case 'sqrt':
        this.op[0].op = opcion;
        break;
    }
    if (this.op.length === 0) {
      this.op.push({
        num1: opcion,
        num2: '',
        op: '',
        res: '',
      });
      this.resultado = opcion;
      return;
    }
    const operacion =
      opcion === '+' ||
      opcion === '-' ||
      opcion === '*' ||
      opcion === '/' ||
      opcion === '%';
    if (opcion === '=' || (this.op[0].op && operacion) || opcion === 'sqrt') {
      console.log('Realizar operación');
      this.realizarOP();
      return;
    }
    if (this.op[0].op === '') {
      this.op[0].num1 += opcion;
      this.resultado = this.op[0].num1;
    } else {
      this.op[0].num2 += opcion;
      this.resultado = this.op[0].num2;
    }
  }

  realizarOP() {
    if (environment.useServiceExterno) {
      console.log('llamado a servicio');
      this.realizarOperacionForServicio();
      return;
    }
    const operacionCompleta =
      this.op[0].op === 'sqrt'
        ? Math.sqrt(parseFloat(this.op[0].num1))
        : `${this.op[0].num1} ${this.op[0].op} ${this.op[0].num2}`;

    const result = eval(operacionCompleta.toString());
    console.log('result: ', result);
    this.op[0].res = result;
    this.op[0].num1 = result;
    this.numTemporal = this.op[0].num2
    this.op[0].num2 = '';
    this.resultado = result.toString();
  }

  async realizarOperacionForServicio() {
    let that = this;
    const body = {
      priNum: parseFloat(this.op[0].num1),
      segNum: parseFloat(this.op[0].num2 ? this.op[0].num2 : this.numTemporal),
    };
    const operacion = this.convertirSignoEnLetra(this.op[0].op);
    if (operacion == 'raiz') {
      body.priNum = 2;
      body.segNum = parseFloat(this.op[0].num1);
    }
    this.petition.petitionPost(body, operacion).subscribe({
      next(value) {
        that.op[0].res = value;
        that.op[0].num1 = value;
        that.numTemporal = that.op[0].num2 ? that.op[0].num2 : that.numTemporal
        that.op[0].num2 = '';

        that.resultado = value;
      },
      error(err) {
        console.error('Error al realizar operacion', err);
        that.alertError(err);
      },
    });
  }

  alertError(err: any) {
    const msg1: string = err?.error.text ? err?.error.text : err.message;
    const payload = {
      header: 'Error',
      subHeader: '',
      msg: msg1,
      buttons: ['Aceptar'],
    };
    this.alertService.alertSimple(payload);
  }
  convertirSignoEnLetra(
    signo: string
  ): 'sumar' | 'multiplicar' | 'restar' | 'dividir' | 'raiz' | 'modulo' {
    let signoLetras:
      | 'sumar'
      | 'multiplicar'
      | 'restar'
      | 'dividir'
      | 'raiz'
      | 'modulo' = 'sumar';
    switch (signo) {
      case '+':
        signoLetras = 'sumar';
        break;
      case '-':
        signoLetras = 'restar';
        break;
      case '*':
        signoLetras = 'multiplicar';
        break;
      case '/':
        signoLetras = 'dividir';
        break;
      case '%':
        signoLetras = 'modulo';
        break;
      case 'sqrt':
        signoLetras = 'raiz';
        break;
    }
    return signoLetras;
  }
}
