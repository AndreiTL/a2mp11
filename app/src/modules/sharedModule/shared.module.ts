import {NgModule, ModuleWithProviders}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import {LoadMaskComponent} from './components/loadmask/loadmask.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    LoadMaskComponent
  ],
  exports: [
    BrowserModule,
    FormsModule,
    LoadMaskComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    }
  }

}
