import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit, Output, EventEmitter , OnDestroy   } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frase.mock';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit, OnDestroy {
  public frases : Frase[] = FRASES;
  public instrucao : string = 'Traduza a frase';
  public resposta : string = '';

  public rodada : number = 0;
  public rodadaFrase : Frase = this.frases[this.rodada];

  public progresso : number = 0;

  public tentativas : number = 3;

  @Output() public encerrarJogo= new EventEmitter();

  
  constructor() {
    this.atualizaRodada();
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      console.log('Painel Destruido');
  }

  public atualizaResposta( resposta : Event) : void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta() : void {
    if (this.rodadaFrase.frasePtbr.trim() == this.resposta.trim() ){

      this.rodada++;
      this.atualizaRodada();

      this.progresso = this.progresso + (100 / this.frases.length);

      if (this.rodada === 4) {
        this.encerrarJogo.emit('Vitória');
      }

    } else {
        
        this.tentativas --;
        if (this.tentativas <= -1){
          this.encerrarJogo.emit('Derrota');
        } 
    }

  }

  public atualizaRodada() :void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }

}
