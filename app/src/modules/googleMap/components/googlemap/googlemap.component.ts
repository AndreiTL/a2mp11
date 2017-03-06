import {Component, Input, ChangeDetectorRef} from '@angular/core';

import {Observable, Observer} from 'rxjs';

import {GoogleMapModelService} from '../../services/google_maps_model.service';
import {WeatherModelService} from '../../../weatherModule/services/weather_model.service';
import {MarkersService} from '../../services/markers.service';

import {template} from './googlemap.tpl';

@Component({
  selector: 'googlemap',
  template: template
})
export class GooglemapComponent {
  @Input() location: ILocation.ICoordinates;
  @Input() zoom: number = 1;

  selector: string = 'googlemap';

  townsTable: Weather.ITownWeather[];

  townsWeatherSource: Observable<Weather.ITownWeather[]>;
  townsWeatherObserver: () => Observer<Weather.ITownWeather[]>;

  markerArray: NGoogleMapService.IMarkerPoint[];
  markerArrayDetach: any[];

  googlemapCoordinates: ILocation.ISimpleCoordinate;
  googlemapPositionSource: Observable<ILocation.ISimpleCoordinate>;
  googleMapPositionObserver: () => Observer<ILocation.ISimpleCoordinate>;

  constructor(
              private cd: ChangeDetectorRef,
              private weatherModelService: WeatherModelService,
              private markersService: MarkersService,
              private googleMapModelService: GoogleMapModelService
  ) {
    console.log('GooglemapComponent init.');
    this.markerArrayDetach = [];

    this.markerArray = [];
    this.townsTable = [];
    this.googlemapCoordinates = {lat: 0, lng: 0};

    this.townsWeatherSource = this.weatherModelService.getRxTownsWeather();
    this.googlemapPositionSource = this.googleMapModelService.getRxCurrentPosition();

    // get towns weather
    this.townsWeatherObserver = () => {return {
      next: value => {
        console.log('next googlemp');
        console.dir(value);
        this.townsTable = value;
        this.markerArray = this.markersService.processMarkers(this.townsTable);
        this.googleMapModelService.updateMarkers(this.markerArray);
        this.cd.detectChanges();
      },
      error: err => {
        console.log('err googlemp');
        console.dir(err);
      },
      complete: () => {
        console.log('comlete thread googlemp');
      }
    }};
    this.townsWeatherSource.subscribe(this.townsWeatherObserver());

    this.googleMapPositionObserver = () => {return {
      next: value => {
        this.googlemapCoordinates = value;
        this.cd.detectChanges();
      },
      error: err => {
        console.log('err position of googlemap');
        console.dir(err);
      },
      complete: () => {
        console.log('comlete thread position of googlemap');
      }
    }};

    // let openings = Observable.interval(200);
    // RX.jx query
    this.googlemapPositionSource
      .map( (value: ILocation.ISimpleCoordinate) => {
        let newValue: ILocation.ISimpleCoordinate = {
          lat: Math.round(value.lat * 10000) / 10000,
          lng: Math.round(value.lng * 10000) / 10000
        };
        return newValue
      })
      // .window( openings, (value: Observable<ILocation.ISimpleCoordinate>) => {
      //   return value;
      // })
      // .merge()
      .debounce( () => {
        return Observable.timer(100);
      } )
      .subscribe(this.googleMapPositionObserver());
  }

  ngAfterContentInit() {
    this.googleMapModelService.initMap(this.location, this.zoom, this.selector);
  }

  addNearestTownWeather(lat: number, lng: number) {
    this.weatherModelService.addNearestTowns({
      latitude: lat,
      longitude: lng,
      count: 1
    })
  }

}
