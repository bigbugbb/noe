import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService, BusinessDetailService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { Observable } from 'rxjs/Observable';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-info-edit-dialog',
  templateUrl: 'business-info-edit-dialog.component.html',
  styleUrls: ['business-info-edit-dialog.component.scss']
})
export class BusinessInfoEditDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  @ViewChild('cropper', undefined)
  private cropper: ImageCropperComponent;

  @ViewChild('avatarInput')
  private avatarInput: ElementRef;

  private model: { [key: string]: any };

  public states: Observable<object[]>;
  public countries: Observable<object[]>;

  public data: any;
  public cropperSettings: CropperSettings;

  constructor(
    private http: Http,
    private profileService: ProfileService,
    private businessDetailService: BusinessDetailService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 400;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.rounded = true;
    this.cropperSettings.noFileInput = true;

    this.data = {};
  }

  ngOnInit() {
    // load static resources for input tag
    this.states = this.http.get('@app/../assets/data/us-states.json').map((res: Response) => res.json());
    this.countries = this.http.get('@app/../assets/data/countries.json').map((res: Response) => res.json());

    this.businessDetailService.getBusiness().subscribe(business => this.model = business);
  }

  get imageData() {
    return _.isEmpty(this.data.image) ? this.model.avatar : this.data.image;
  }

  public show() {
    this.data = {};
    this.dialog.show();
  }

  public onSubmit() {
    if (!_.isEmpty(this.data)) {
      this.model.avatar = this.data.image;
    }
    this.businessDetailService.updateBusiness(this.model).subscribe(() => {
      this.dialog.hide();
    });
  }

  public avatarFileSelected(event) {
    const image: any = new Image();
    const file: File = event.target.files[0];
    const fileReader: FileReader = new FileReader();
    fileReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };
    fileReader.readAsDataURL(file);
  }

  public selectImage() {
    this.avatarInput.nativeElement.click();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
