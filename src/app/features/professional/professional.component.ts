import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfessionalService } from 'src/app/features/professional/professional.service';
import { LoaderService } from 'src/app/shared/loader';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent {

  languageOptions = [
    "Español",
    "Inglés",
    "Portugués"
  ]

  countries = [
    "Argentina",
    "México",
    "Estados Unidos",
    "Brasil"
  ]

  professions = [
    "Obstetricia",
    "Psicologia",
    "Yoga",
    "Instructor prenatal",
    "Fisioterapia"
  ]

  constructor(
    private activeModal: NgbActiveModal,
    private professionalService: ProfessionalService,
    private loaderService: LoaderService) {
  }

  closeModal() {
    this.activeModal.close();
  }

  dismissModal() {
    this.activeModal.dismiss();
  }

  search() {
    this.loaderService.showSpinner()
    this.loaderService.showText('Estamos buscando un profesional para ti')
  }

}
