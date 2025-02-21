import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { cities } from '../../utils/city';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fnp-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgSelectModule, CommonModule],
  templateUrl: './fnp-form.component.html',
  styleUrl: './fnp-form.component.scss'
})
export class FnpFormComponent {

  cities = cities

  fnpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    actualOutletNumber: new FormControl('', Validators.required),
    totalOutletNumber: new FormControl('', Validators.required)
  }) 

  getForm() {
    return this.fnpForm.value;
  }

  cityLabel(city: any) {
    return `${city.name} (${city.postalCode})`;
  }

  get isDisabled() {
    return this.fnpForm.invalid;
  }

}
