import { Component } from '@angular/core';
import { ProfessionalService } from '../features/professional/professional.service';

@Component({
  selector: 'app-option-bubbles',
  templateUrl: './option-bubbles.component.html',
  styleUrls: ['./option-bubbles.component.scss']
})
export class OptionBubblesComponent {

  currentProfessional: any;

  options = [
    "Quienes somos",
    "Como podemos ayudarte",
    // "Informacion confiable",
    // "Profesionales listos para ayduarte 24hs" ,
  ];

  constructor(private professionalService: ProfessionalService) {

  }

  openProfessionalLookup() {
    this.searchProfessional().then(professional => {
      if (professional) {
        this.currentProfessional = professional;
      }
    });
  }

  private searchProfessional(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.professionalService.showModal().then(
        () => {
          const professional = this.professionalService.getSelectedItem();
          if (professional) {
            resolve(professional);
          } else {
            reject();
          }
        },
        () => {
          return;
        }
      );
    });
  }
}
