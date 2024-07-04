import { Component, ViewChild } from '@angular/core';
import { ImageInputComponent } from '../image-input/image-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDisplayService } from '../../services/form-display.service';

@Component({
  selector: 'app-fma-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, ImageInputComponent],
  templateUrl: './fma-form.component.html',
  styleUrl: './fma-form.component.scss'
})
export class FmaFormComponent {

  @ViewChild('picture') pictureInput: ImageInputComponent | undefined

  fmaForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    incorrectAddress: new FormControl('', [Validators.required]),
    correctAddress: new FormControl('', Validators.required),
    imageOverLink: new FormControl(false),
    cartographyLink: new FormControl(''),
    comment: new FormControl('', [Validators.required])
  })

  constructor(
    private formService: FormDisplayService
  ) {

  }

  closeChat() {
    this.formService.close()
  }

  submitForm() {

  }

  get cartographyValid(): boolean {
    const imageOverLink = this.fmaForm.value.imageOverLink;
    if(imageOverLink) {
      return this.pictureInput?.isImageValid ? true : false
    } else {
      return (this.fmaForm.value.cartographyLink?.length ?? 0) > 0
    }
  }

}