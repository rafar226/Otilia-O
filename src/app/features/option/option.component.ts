import { Component } from '@angular/core';
import { ProfessionalService } from '../professional/professional.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent {

  currentProfessional: any;
  mobile!: boolean;

  options = [
    {
      text: 'Yoga',
      img: './../../../assets/images/yoga.png',
      alt: 'yoga',
    },
    {
      text: 'Doctor',
      img: './../../../assets/images/doctor.jpg',
      alt: 'doctor'
    },
    {
      text: 'Prearador',
      img: './../../../assets/images/preparador.jpg',
      alt: 'Preparador'
    },
    {
      text: 'Psicologia',
      img: './../../../assets/images/psicologia.jpg',
      alt: 'psicologia'
    },
    {
      text: 'Fisio',
      img: './../../../assets/images/fisio.jpg',
      alt: 'fisio'
    }

  ];

  constructor(
    private professionalService: ProfessionalService)
    {}

  ngOnInit() {
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
