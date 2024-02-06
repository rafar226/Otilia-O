import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfessionalService } from 'src/app/features/professional/professional.service';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent {

  searchOff: boolean = true;

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
    "Obstetra",
    "Couch",
    "Pediatra"
  ]

  constructor(
    private activeModal: NgbActiveModal,
    private professionalService: ProfessionalService) {
  }

  closeModal() {
    this.activeModal.close();
  }

  dismissModal() {
    this.activeModal.dismiss();
  }

  search() {
    this.searchOff = false;
  }

}
