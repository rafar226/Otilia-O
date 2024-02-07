import { Component } from '@angular/core';
import { ProfessionalService } from '../features/professional/professional.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-option-bubbles',
  templateUrl: './option-bubbles.component.html',
  styleUrls: ['./option-bubbles.component.scss']
})
export class OptionBubblesComponent {

  currentProfessional: any;
  mobile!: boolean;

  options = [
    "Quienes somos",
    "Como podemos ayudarte"
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
