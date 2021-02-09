import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { TrafficChartData } from '../../../@core/data/traffic-chart';

@Component({
  selector: 'ngx-traffic',
  styleUrls: ['./traffic.component.scss'],
  template: `
    <nb-card size="tiny">
      <nb-card-header>
        <span>Traffic Consumption</span>

        <nb-select matRipple [(selected)]="type">
          <nb-option matRipple *ngFor="let t of types" [value]="t">{{ t }}</nb-option>
        </nb-select>
      </nb-card-header>

      <ngx-traffic-chart [points]="trafficChartPoints"></ngx-traffic-chart>
    </nb-card>
  `,
})
export class TrafficComponent implements OnDestroy {

  private alive = true;

  trafficChartPoints: number[];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private trafficChartService: TrafficChartData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
      this.currentTheme = theme.name;
    });

    this.trafficChartService.getTrafficChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.trafficChartPoints = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
