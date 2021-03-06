import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { Observable } from 'rxjs/Observable';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import * as _ from 'lodash';

@Component({
  selector: 'noe-intro-dialog',
  templateUrl: 'intro-dialog.component.html',
  styleUrls: ['intro-dialog.component.scss']
})
export class IntroDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  @ViewChild('cropper', undefined)
  private cropper: ImageCropperComponent;

  @ViewChild('avatarInput')
  private avatarInput: ElementRef;

  public grades: Observable<string[]>;
  public countries: Observable<object[]>;
  public bsConfig: Partial<BsDatepickerConfig>;
  public model: any;

  public data: any;
  public cropperSettings: CropperSettings;

  constructor(
    private http: Http,
    private profileService: ProfileService,
    private storageService: StorageService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.croppedWidth = 140;
    this.cropperSettings.croppedHeight = 140;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = true;
    this.cropperSettings.noFileInput = true;

    this.data = {};
  }

  ngOnInit() {
    this.bsConfig = _.assign({}, {containerClass: 'theme-blue'});

    // get profile and make a deep copy of it
    this.profileService.getProfile().subscribe(profile => this.model = JSON.parse(JSON.stringify(profile)));

    // load static resources for input tag
    this.grades = this.http.get('@app/../assets/data/grades.json').map((res: Response) => res.json());
    this.countries = this.http.get('@app/../assets/data/countries.json').map((res: Response) => res.json());
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
    this.model.name = `${this.model.firstname} ${this.model.lastname}`;
    const user = this.storageService.getUser();
    this.profileService.updateProfile(user.role, this.model).subscribe(() => {
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
