import { Component } from '@angular/core';
import { ProfessionalService } from '../professional/professional.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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
      alt: 'yoga'
    },
    {
      text: 'Doctor',
      img: './../../../assets/images/doctor.jpg',
      alt: 'doctor'
    },
    {
      text: 'Prearador prenatal',
      img: './../../../assets/images/preparador.jpg',
      alt: 'Preparador prenatal'
    },
    {
      text: 'Psicologia',
      img: './../../../assets/images/psicologia.jpg',
      alt: 'psicologia'
    },
    {
      text: 'Fisioterapia',
      img: './../../../assets/images/fisio.jpg',
      alt: 'fisio'
    }

  ];

  constructor(
    private professionalService: ProfessionalService,
    config: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		// config.interval = 10000;
		// config.wrap = false;
		// config.keyboard = false;
		// config.pauseOnHover = false;
	}

  ngOnInit() {
    // if (window.screen.width >= 900) { // 768px portrait
    //   this.mobile = true;
    //   console.log('1', this.mobile)
    // }
    // if (window.screen.width < 900) { // 768px portrait
    //   this.mobile = true;
    //   console.log('2', this.mobile)

    // }
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
