import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';

import { CoreModule } from './core';
import { SharedModule } from './shared';
import { FeaturesSharedModule } from '@app/features/shared';

import { AppComponent } from './app.component';
import { AsideToggleDirective } from './shared/aside/aside.directive';

@NgModule({
  declarations: [
    AppComponent,
    AsideToggleDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    FeaturesSharedModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
