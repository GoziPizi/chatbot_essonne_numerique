import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PdfInputComponent } from '../pdf-input/pdf-input.component';

@Component({
  selector: 'app-fb-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgSelectModule, PdfInputComponent],
  templateUrl: './fb-form.component.html',
  styleUrl: './fb-form.component.scss'
})
export class FbFormComponent {

  @ViewChild('attachedPiece') attachedPieceInput: PdfInputComponent | undefined

  fbForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    operator: new FormControl('', [Validators.required]),
    incidentDate: new FormControl('', [Validators.required]),
    incidentNumber: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required])
  })

  getForm() {
    return this.fbForm.value;
  }

  getAttachedPiece() {
    return this.attachedPieceInput?.pdf;
  }

  get isDisabled() {
    if(this.fbForm.invalid) {
      return true;
    }
    return false;
  }

}
