import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfessionalComponent } from './professional.component';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  professional: any;

  constructor(private modalService: NgbModal
    ) { }

  getSelectedItem() {
    return this.professional;
  }

  setSeletedItem(professional: any) {
    this.professional = professional;
  }

  showModal(title = ''): Promise<any> {
    const modalRef = this.modalService.open(ProfessionalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.title = title;
    return modalRef.result;
  }
}
