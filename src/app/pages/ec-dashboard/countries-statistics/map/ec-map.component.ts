import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';

import { EcMapService } from './ec-map.service';
import { NbThemeService } from '@nebular/theme';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'ngx-ec-map',
  styleUrls: ['./ec-map.component.scss'],
  template: `
    <div leaflet [leafletOptions]="options" [leafletLayers]="layers" (leafletMapReady)="mapReady($event)"></div>
  `,
})
export class EcMapComponent implements OnDestroy {

  @Input() countryId: string;

  @Output() select: EventEmitter<any> = new EventEmitter();

  layers = [];
  currentTheme: any;
  alive = true;
  selectedCountry;

  options = {
    zoom: 3,
    minZoom: 2,
    maxZoom: 6,
    zoomControl: false,
    center: L.latLng({lat: 38.991709, lng: -76.886109}),
  };

  constructor(private ecMapService: EcMapService,
              private theme: NbThemeService) {

    combineLatest([
      this.ecMapService.getCords(),
      this.theme.getJsTheme(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([cords, config]: [any, any]) => {
        this.currentTheme = config.variables.countriesStatistics;
        this.layers.push(this.createGeoJsonLayer(cords));
        this.selectFeature(this.findFeatureLayerByCountryId(this.countryId));
      });
  }

  mapReady(map: L.Map) {
    map.addControl(L.control.zoom({position: 'bottomright'}));
  }

  private createGeoJsonLayer(cords) {
    return L.geoJSON(
      (cords) as any,
      {
        style: () => ({color: this.currentTheme.countryBorderColor}),
        onEachFeature: (f, l) => {
          this.onEachFeature(f, l)
        },
      })
  }

  private onEachFeature(feature, layer) {
    layer.on({
      mouseover: (e) => {
        this.highlightFeature(e.target)
      },
      mouseout: (e) => {
        this.moveout(e.target)
      },
      click: (e) => {
        this.selectFeature(e.target)
      },
    });
  }

  private highlightFeature(featureLayer) {
    if (featureLayer) {
      featureLayer.setStyle({
        weight: 4,
        color: this.currentTheme.hoveredCountryColor,
        fillColor: this.currentTheme.countryBorderColor,
        dashArray: '',
      });

      if (!L.Browser.ie && !L.Browser.opera12 && !L.Browser.edge) {
        featureLayer.bringToFront();
      }
    }
  }

  private moveout(featureLayer) {
    if (featureLayer !== this.selectedCountry) {
      this.resetHighlight(featureLayer);

      // When countries have common border we should highlight selected country once again
      this.highlightFeature(this.selectedCountry);
    }
  }

  private resetHighlight(featureLayer) {
    if (featureLayer) {
      const geoJsonLayer = this.layers[0];
      geoJsonLayer.resetStyle(featureLayer);
    }
  }

  private selectFeature(featureLayer) {
    if (featureLayer !== this.selectedCountry) {
      this.resetHighlight(this.selectedCountry);
      this.highlightFeature(featureLayer);
      this.selectedCountry = featureLayer;
      this.select.emit({id: featureLayer.feature.id, name: featureLayer.feature.properties.name});
    }
  }

  private findFeatureLayerByCountryId(id) {
    const layers = this.layers[0].getLayers();

    for (let key in layers) {
      let value = layers[key];
      if (value.feature.id === id) {
        return value;
      }
    }

    return null;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
