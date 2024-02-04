import { Component } from '@angular/core';

@Component({
  selector: 'app-option-bubbles',
  templateUrl: './option-bubbles.component.html',
  styleUrls: ['./option-bubbles.component.scss']
})
export class OptionBubblesComponent {

  options = [
    "Quienes somos",
    "Como podemos ayudarte",
    "Informacion confiable",
    "Profesionales listos para ayduarte 24hs" ,
  ];

}
