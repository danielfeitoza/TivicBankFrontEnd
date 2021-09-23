import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BancoModel } from './BancoModel';
import { BaseModel } from './BaseModel';
import { Cliente } from './Cliente';
import { DepositoModel } from './DepositoModel';
import { SaqueModel } from './SaqueModel';
import { Conta } from './tivicapi';
import { TivicapiService } from './tivicapi.service';
import { TransacoesModel } from './TransacoesModel';
import { TransacoesModelSaque } from './TrassacoesModelSaque';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  depBool: Boolean = false;
  saqBool: Boolean = false;
  depLista: DepositoModel[] = [];
  saqLista: SaqueModel[] = [];
  idClient: string = '';
  infoCliente: Cliente
  infoContaCliente: Conta
  infoBancoCliente: BancoModel
  form: FormGroup = new FormGroup({
    id : new FormControl('1'),
    valor_deposito : new FormControl('')
  })

  formSac: FormGroup = new FormGroup({
    id: new FormControl('1'),
    valor_saque: new FormControl('')
  })

  constructor(private service: TivicapiService){

  }
  ngOnInit(){
    
    this.submitInfoClienteBase()
    this.submitInfoClienteConta()
    this.submitInfoBanco()
  }

  submitInfoClienteBase(){
    this.service.infoClienteBase().subscribe(infoUser => {
      console.log(infoUser)
      this.infoCliente = infoUser
      this.idClient = infoUser.id.toString();
    })
  }

  submitInfoClienteConta(){
    this.service.infoClienteConta().subscribe(infoConta => {
      console.log(infoConta)
      this.infoContaCliente = infoConta
    })
  }

  submitInfoBanco(){
    this.service.infoBanco().subscribe(infoBank => {
      console.log(infoBank)
      this.infoBancoCliente = infoBank
    })
  }

  submitConta(){
    this.service.infoClienteConta().subscribe(infoConta => {
      this.infoContaCliente.saldo = infoConta.saldo
    })
  }

  submitDep(){
    console.log(this.form.value)
    const contapi: TransacoesModel = {... this.form.value}
    this.service.salva(contapi).subscribe(contapi => console.log(contapi))
  }

  submitSac(){
    console.log(this.formSac.value)
    const saqueapi: TransacoesModelSaque = {... this.formSac.value}
    this.service.novoSaque(saqueapi).subscribe(saqueapi => console.log(saqueapi))
  }

  submitListaSaques(){
      this.depBool = false;
      this.saqBool = true;
      this.service.listaSaques().subscribe(teste => {
        
      this.saqLista = teste
    });
  }

  submitListaDepositos(){
    this.saqBool = false;
    this.depBool = true;
    this.service.listaDepositos().subscribe(teste => {
      
    this.depLista = teste
    console.log(teste)
  });
}
}
