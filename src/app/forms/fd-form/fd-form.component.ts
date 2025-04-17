import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageInputComponent } from '../image-input/image-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormDisplayService } from '../../services/form-display.service';
import { cities } from '../../utils/city';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fd-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ImageInputComponent,
    CommonModule,
  ],
  templateUrl: './fd-form.component.html',
  styleUrl: './fd-form.component.scss',
})
export class FdFormComponent {
  cities = cities;
  @ViewChild('picture') pictureInput: ImageInputComponent | undefined;

  fdForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    risk: new FormControl('', Validators.required),
    comment: new FormControl('', [Validators.required]),
  });

  constructor(private formService: FormDisplayService) {}

  getForm() {
    return this.fdForm.value;
  }

  getScreenShot() {
    return this.pictureInput?.image;
  }

  cityLabel(city: any) {
    return `${city.name} (${city.postalCode})`;
  }

  get isDisabled() {
    return this.fdForm.invalid || !this.pictureInput?.isImageValid;
  }
}
