import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Http, Response } from '@angular/http';

import { DialogComponent } from '@app/shared';
import { ProfileService, StorageService } from '@app/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'intro-dialog',
  templateUrl: 'intro-dialog.component.html',
  styleUrls: ['intro-dialog.component.scss']
})
export class IntroDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  @ViewChild('cropper', undefined)
  public cropper: ImageCropperComponent;

  @ViewChild('avatarInput')
  public avatarInput: ElementRef;

  @Input()
  public editAdd = true;

  public bsConfig: Partial<BsDatepickerConfig>;
  public countries: Observable<object[]>;
  public educationLevels: Observable<string[]>;
  public loading = false;

  public model;

  data: any;
  cropperSettings: CropperSettings;

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
    this.bsConfig = Object.assign({}, {containerClass: 'theme-blue'});
    this.profileService.getProfile().subscribe(profile => this.model = JSON.parse(JSON.stringify(profile)));
    this.countries = this.http.get('@app/../assets/data/countries.json').map((res: Response) => res.json());
    this.educationLevels = this.http.get('@app/../assets/data/education-levels.json').map((res: Response) => res.json());
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
    const user = this.storageService.getUser();
    this.profileService.updateProfile(user.role, this.model).subscribe(() => {
      this.dialog.hide();
    });
  }

  public avatarFileSelected(event) {
    var image: any = new Image();
    var file: File = event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  public selectImage() {
    this.avatarInput.nativeElement.click();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}