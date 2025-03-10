import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormDisplayService } from '../../services/form-display.service';
import { ImageInputComponent } from '../image-input/image-input.component';
import { cities } from '../../utils/city';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fmn-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgSelectModule, ImageInputComponent, CommonModule],
  templateUrl: './fmn-form.component.html',
  styleUrl: './fmn-form.component.scss'
})
export class FmnFormComponent {

  cities = cities
  @ViewChild('screenShot') screenShotInput: ImageInputComponent | undefined
  @ViewChild('certificate') screenShotCertificateInput: ImageInputComponent | undefined

  fmnForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    firstDemandDate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    dossierNumber: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required])
  })

  getForm() {
    return this.fmnForm.value;
  }

  getScreenShot() {
    return this.screenShotInput?.image;
  }

  getCertificate() {
    return this.screenShotCertificateInput?.image;
  }

  cityLabel(city: any) {
    return `${city.name} (${city.postalCode})`;
  }

  get isDisabled() {
    return this.fmnForm.invalid || !this.screenShotInput?.isImageValid || !this.screenShotCertificateInput?.isImageValid;
  }

}
