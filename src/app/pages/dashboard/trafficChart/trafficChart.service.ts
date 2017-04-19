import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, ColorHelper } from '../../../theme';

@Injectable()
export class TrafficChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }


  getData() {
    const dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 2000,
        color: dashboardColors.white,
        highlight: ColorHelper.shade(dashboardColors.white, 15),
        label: 'Other',
        percentage: 87,
        order: 1,
      }, {
        value: 1500,
        color: dashboardColors.gossip,
        highlight: ColorHelper.shade(dashboardColors.gossip, 15),
        label: 'Search engines',
        percentage: 22,
        order: 4,
      }, {
        value: 1000,
        color: dashboardColors.silverTree,
        highlight: ColorHelper.shade(dashboardColors.silverTree, 15),
        label: 'Referral Traffic',
        percentage: 70,
        order: 3,
      }, {
        value: 1200,
        color: dashboardColors.surfieGreen,
        highlight: ColorHelper.shade(dashboardColors.surfieGreen, 15),
        label: 'Direct Traffic',
        percentage: 38,
        order: 2,
      }, {
        value: 400,
        color: dashboardColors.blueStone,
        highlight: ColorHelper.shade(dashboardColors.blueStone, 15),
        label: 'Ad Campaigns',
        percentage: 17,
        order: 0,
      },
    ];
  }
}
