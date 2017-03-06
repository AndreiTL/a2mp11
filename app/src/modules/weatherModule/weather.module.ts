import { NgModule }      from '@angular/core';

import {SharedModule} from '../sharedModule/shared.module';

import {WeatherComponent } from './components/weather/weather.component';
import {WeatherModelService} from './services/weather_model.service';
import {WeatherFavoriteModelService} from './services/weather_favorite_model.service';
import {StorageService} from './services/storage.service';
import {RestService} from './services/rest.service';

import {TemperatureCelciumPipe} from './pipes/temperature.pipe';
import {WindDirectionTextPipe} from './pipes/winddirectiontext.pipe';

import {TownColorDirective} from './directives/town-color.directive';
import {WeatherIconDirective} from './directives/weather-icon.directive';
import {WindArrowDirective} from './directives/wind-arrow.directive';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    WeatherComponent,
    TemperatureCelciumPipe,
    WindDirectionTextPipe,
    WindArrowDirective,
    WeatherIconDirective,
    TownColorDirective
  ],
  providers: [
    WeatherModelService,
    WeatherFavoriteModelService,
    StorageService,
    RestService
  ],
  exports: [
    WeatherComponent
  ]
})
export class WeatherModule { }
