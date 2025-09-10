import { Component, ViewChild } from '@angular/core';
import { form } from '../../models/models';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FmaFormComponent } from '../../forms/fma-form/fma-form.component';
import { FbFormComponent } from '../../forms/fb-form/fb-form.component';
import { FdFormComponent } from '../../forms/fd-form/fd-form.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FnpFormComponent } from '../../forms/fnp-form/fnp-form.component';
import { FmnFormComponent } from '../../forms/fmn-form/fmn-form.component';
import { FcsFormComponent } from '../../forms/fcs-form/fcs-form.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-route',
  standalone: true,
  imports: [
    CommonModule,
    FmaFormComponent,
    FbFormComponent,
    FdFormComponent,
    FnpFormComponent,
    FmnFormComponent,
    FcsFormComponent,
  ],
  templateUrl: './form-route.component.html',
  styleUrl: './form-route.component.scss',
})
export class FormRouteComponent {
  @ViewChild(FbFormComponent) fbFormComponent!: FbFormComponent;
  @ViewChild(FmnFormComponent) fmnFormComponent!: FmnFormComponent;
  @ViewChild(FdFormComponent) fdFormComponent!: FdFormComponent;
  @ViewChild(FmaFormComponent) fmaFormComponent!: FmaFormComponent;
  @ViewChild(FnpFormComponent) fnpFormComponent!: FnpFormComponent;
  @ViewChild(FcsFormComponent) fcsFormComponent!: FcsFormComponent;

  formDisplay: form = form.FBFORM;
  formNames = form;
  endpoint = 'https://chatbot.essonnenumerique.com/api/form-endpoint';

  isMobile = this.deviceService.isMobile();

  isLoading = false;
  isSentSuccessfull = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.formDisplay = params['form'];
    });
  }

  sendForm() {
    this.isLoading = true;
    let finalForm = new FormData();

    finalForm.append('formName', this.formDisplay as string);

    let form: any;

    switch (this.formDisplay) {
      case 'FBFORM':
        form = this.fbFormComponent.getForm();
        let attachedPiece = this.fbFormComponent.getAttachedPiece();
        if (attachedPiece) {
          finalForm.append('attachedPiece', attachedPiece);
        }
        break;
      case 'FMNFORM':
        form = this.fmnFormComponent.getForm();
        let screenShotFmn = this.fmnFormComponent.getScreenShot();
        let certificateFmn = this.fmnFormComponent.getCertificate();
        if (screenShotFmn) {
          finalForm.append('screenShot', screenShotFmn);
        }
        if (certificateFmn) {
          finalForm.append('certificateScreenShot', certificateFmn);
        }
        break;
      case 'FDFORM':
        form = this.fdFormComponent.getForm();
        let screenShotFd = this.fdFormComponent.getScreenShot();
        if (screenShotFd) {
          finalForm.append('screenShot', screenShotFd);
        }
        break;
      case 'FMAFORM':
        form = this.fmaFormComponent.getForm();
        let screenShotFma = this.fmaFormComponent.getScreenShot();
        let attachedPieceFma = this.fmaFormComponent.getAttachedPiece();
        if (screenShotFma) {
          finalForm.append('screenShot', screenShotFma);
        }
        if (attachedPieceFma) {
          finalForm.append('attachedPiece', attachedPieceFma);
        }
        break;
      case 'FNPFORM':
        form = this.fnpFormComponent.getForm();
        break;
      case 'FCSFORM':
        form = this.fcsFormComponent.getForm();
        let screenShotFcs = this.fcsFormComponent.getConvention();
        if (screenShotFcs) {
          finalForm.append('certificateScreenShot', screenShotFcs);
        }
        break;
      default:
        console.error('Unknown form type');
    }

    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        finalForm.append(key, form[key]);
      }
    }

    this.http.post(this.endpoint, finalForm).subscribe({
      next: (response: any) => {
        this.isSentSuccessfull = true;
        this.isLoading = false;
        this.error = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.isSentSuccessfull = false;
        this.error = true;
      },
    });
  }

  get currentFormComponent() {
    switch (this.formDisplay) {
      case 'FBFORM':
        return this.fbFormComponent;
      case 'FMNFORM':
        return this.fmnFormComponent;
      case 'FDFORM':
        return this.fdFormComponent;
      case 'FMAFORM':
        return this.fmaFormComponent;
      case 'FNPFORM':
        return this.fnpFormComponent;
      case 'FCSFORM':
        return this.fcsFormComponent;
      default:
        return this.fbFormComponent;
    }
  }

  get isDisabled() {
    if (this.isSentSuccessfull) {
      return true;
    }
    if (this.currentFormComponent) {
      return this.currentFormComponent.isDisabled;
    }
    if (!this.currentFormComponent) {
      return true;
    }
    return false;
  }
}
