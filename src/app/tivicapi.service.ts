import { Injectable } from '@angular/core';
import { BaseModel } from './BaseModel';
import { Conta} from './tivicapi';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { Cliente } from './Cliente';
import { DepositoModel } from './DepositoModel';
import { TransacoesModel} from './TransacoesModel';
import { SaqueModel } from './SaqueModel';
import { TransacoesModelSaque } from './TrassacoesModelSaque';
import { BancoModel } from './BancoModel';

@Injectable({
  providedIn: 'root'
})
export class TivicapiService {

  apiClientes = 'http://localhost:8080/api/clientes';
  apiContas  = 'http://localhost:8080/api/contas';
  apiBanco  = 'http://localhost:8080/api/bancos';
  apiDeposito  = 'http://localhost:8080/api/deposito';
  apiSaque  = 'http://localhost:8080/api/saque';
  constructor(
    private http: HttpClient
  ) { }

  /*
  salva(contaid: Conta) : Observable<Conta>{
    return this.http.post<Conta>(this.apiURL, contaid)
  }
  
 

  salva(contaid: BaseModel) : Observable<BaseModel>{
    return this.http.post<BaseModel>(this.apiURL, contaid);
  } */

  
  infoClienteBase() : Observable<Cliente>{
    return this.http.get<Cliente>(this.apiClientes+"/1");
  }

  infoClienteConta() : Observable<Conta>{
    return this.http.get<Conta>(this.apiContas+"/1");
  }

  infoBanco(): Observable<BancoModel>{
    return this.http.get<BancoModel>(this.apiBanco+"/1");
  }
  
  salva(trasacaoMod: TransacoesModel) : Observable<TransacoesModel>{
    return this.http.post<DepositoModel>(this.apiDeposito, trasacaoMod);
  }

  novoSaque(trasacaoModSaque: TransacoesModelSaque) : Observable<TransacoesModelSaque>{
    console.log(trasacaoModSaque)
    return this.http.post<SaqueModel>(this.apiSaque, trasacaoModSaque);
  }

  listaSaques(): Observable<SaqueModel[]>{
    return this.http.get<SaqueModel[]>(this.apiSaque);
  }

  listaDepositos(): Observable<DepositoModel[]>{
    return this.http.get<DepositoModel[]>(this.apiDeposito);
  }
}
