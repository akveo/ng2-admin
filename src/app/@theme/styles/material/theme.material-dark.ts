import { NbJSThemeOptions } from '@nebular/theme';

const palette = {
  primary: '#e91d63',
  success: '#60af20',
  info: '#0495ee',
  warning: '#ff9f05',
  danger: '#b00020',
};

export const baseTheme: NbJSThemeOptions = {
  name: 'material-dark',
  base: 'dark',
  variables: {
    fontMain: 'Roboto, sans-serif',
    fontSecondary: 'Roboto, sans-serif',

    bg: '#383838',
    bg2: '#292929',
    bg3: '#1f1f1f',
    bg4: '#141414',

    border: '#383838',
    border2: '#292929',
    border3: '#1f1f1f',
    border4: '#141414',
    border5: '#141414',

    fg: '#808080',
    fgHeading: '#ffffff',
    fgText: '#ffffff',
    fgHighlight: palette.primary,
    layoutBg: '#1f1f1f',
    separator: '#1f1f1f',

    primary: palette.primary,
    success: palette.success,
    info: palette.info,
    warning: palette.warning,
    danger: palette.danger,

    primaryLight: '#f24681',
    successLight: '#8fcf50',
    infoLight: '#40bbf4',
    warningLight: '#ffbe43',
    dangerLight: '#cf3341',
  },
};

const baseThemeVariables = baseTheme.variables;

export const MATERIAL_DARK_THEME = {
  name: 'material-dark',
  base: 'default',
  variables: {
    temperature: {
      arcFill: [
        baseThemeVariables.primary,
        baseThemeVariables.primary,
        baseThemeVariables.primary,
        baseThemeVariables.primary,
        baseThemeVariables.primary,
      ],
      arcEmpty: baseThemeVariables.bg2,
      thumbBg: baseThemeVariables.bg2,
      thumbBorder: baseThemeVariables.primary,
    },

    solar: {
      gradientLeft: baseThemeVariables.primary,
      gradientRight: baseThemeVariables.primary,
      shadowColor: 'rgba(0, 0, 0, 0)',
      secondSeriesFill: baseThemeVariables.bg2,
      radius: ['80%', '90%'],
    },

    traffic: {
      tooltipBg: baseThemeVariables.bg,
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',

      yAxisSplitLine: baseThemeVariables.separator,

      lineBg: baseThemeVariables.border4,
      lineShadowBlur: '1',
      itemColor: baseThemeVariables.border4,
      itemBorderColor: baseThemeVariables.border4,
      itemEmphasisBorderColor: baseThemeVariables.primary,
      shadowLineDarkBg: 'rgba(0, 0, 0, 0)',
      shadowLineShadow: 'rgba(0, 0, 0, 0)',
      gradFrom: baseThemeVariables.bg2,
      gradTo: baseThemeVariables.bg2,
    },

    electricity: {
      tooltipBg: baseThemeVariables.bg,
      tooltipLineColor: baseThemeVariables.fgText,
      tooltipLineWidth: '0',
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',

      axisLineColor: baseThemeVariables.border3,
      xAxisTextColor: baseThemeVariables.fg,
      yAxisSplitLine: baseThemeVariables.separator,

      itemBorderColor: baseThemeVariables.primary,
      lineStyle: 'solid',
      lineWidth: '4',
      lineGradFrom: baseThemeVariables.primary,
      lineGradTo: baseThemeVariables.primary,
      lineShadow: 'rgba(0, 0, 0, 0)',

      areaGradFrom: baseThemeVariables.bg2,
      areaGradTo: baseThemeVariables.bg2,
      shadowLineDarkBg: 'rgba(0, 0, 0, 0)',
    },

    bubbleMap: {
      titleColor: baseThemeVariables.fgText,
      areaColor: baseThemeVariables.bg4,
      areaHoverColor: baseThemeVariables.fgHighlight,
      areaBorderColor: baseThemeVariables.border5,
    },

    profitBarAnimationEchart: {
      textColor: baseThemeVariables.fgText,

      firstAnimationBarColor: baseThemeVariables.primary,
      secondAnimationBarColor: baseThemeVariables.success,

      splitLineStyleOpacity: '1',
      splitLineStyleWidth: '1',
      splitLineStyleColor: baseThemeVariables.separator,

      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
      tooltipFontSize: '16',
      tooltipBg: baseThemeVariables.bg,
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipBorderWidth: '1',
      tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
    },

    trafficBarEchart: {
      gradientFrom: baseThemeVariables.warningLight,
      gradientTo: baseThemeVariables.warning,
      shadow: baseThemeVariables.warningLight,
      shadowBlur: '0',

      axisTextColor: baseThemeVariables.fgText,
      axisFontSize: '12',

      tooltipBg: baseThemeVariables.bg,
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
    },

    countryOrders: {
      countryBorderColor: baseThemeVariables.border4,
      countryFillColor: baseThemeVariables.bg3,
      countryBorderWidth: '1',
      hoveredCountryBorderColor: baseThemeVariables.primary,
      hoveredCountryFillColor: baseThemeVariables.primaryLight,
      hoveredCountryBorderWidth: '1',

      chartAxisLineColor: baseThemeVariables.border4,
      chartAxisTextColor: baseThemeVariables.fg,
      chartAxisFontSize: '16',
      chartGradientTo: baseThemeVariables.primary,
      chartGradientFrom: baseThemeVariables.primaryLight,
      chartAxisSplitLine: baseThemeVariables.separator,
      chartShadowLineColor: baseThemeVariables.primaryLight,

      chartLineBottomShadowColor: baseThemeVariables.primary,

      chartInnerLineColor: baseThemeVariables.bg2,
    },

    echarts: {
      bg: baseThemeVariables.bg,
      textColor: baseThemeVariables.fgText,
      axisLineColor: baseThemeVariables.fgText,
      splitLineColor: baseThemeVariables.separator,
      itemHoverShadowColor: 'rgba(0, 0, 0, 0.5)',
      tooltipBackgroundColor: baseThemeVariables.primary,
      areaOpacity: '0.7',
    },

    chartjs: {
      axisLineColor: baseThemeVariables.separator,
      textColor: baseThemeVariables.fgText,
    },

    orders: {
      tooltipBg: baseThemeVariables.bg,
      tooltipLineColor: 'rgba(0, 0, 0, 0)',
      tooltipLineWidth: '0',
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
      tooltipFontSize: '20',

      axisLineColor: baseThemeVariables.border4,
      axisFontSize: '16',
      axisTextColor: baseThemeVariables.fg,
      yAxisSplitLine: baseThemeVariables.separator,

      itemBorderColor: baseThemeVariables.primary,
      lineStyle: 'solid',
      lineWidth: '4',

      // first line
      firstAreaGradFrom: baseThemeVariables.bg3,
      firstAreaGradTo: baseThemeVariables.bg3,
      firstShadowLineDarkBg: 'rgba(0, 0, 0, 0)',

      // second line
      secondLineGradFrom: baseThemeVariables.primary,
      secondLineGradTo: baseThemeVariables.primary,

      secondAreaGradFrom: 'rgba(51, 102, 255, 0.2)',
      secondAreaGradTo: 'rgba(51, 102, 255, 0)',
      secondShadowLineDarkBg: 'rgba(0, 0, 0, 0)',

      // third line
      thirdLineGradFrom: baseThemeVariables.success,
      thirdLineGradTo: baseThemeVariables.successLight,

      thirdAreaGradFrom: 'rgba(0, 214, 143, 0.2)',
      thirdAreaGradTo: 'rgba(0, 214, 143, 0)',
      thirdShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
    },

    profit: {
      bg: baseThemeVariables.bg,
      textColor: baseThemeVariables.fgText,
      axisLineColor: baseThemeVariables.border4,
      splitLineColor: baseThemeVariables.separator,
      areaOpacity: '1',

      axisFontSize: '16',
      axisTextColor: baseThemeVariables.fg,

      // first bar
      firstLineGradFrom: baseThemeVariables.bg3,
      firstLineGradTo: baseThemeVariables.bg3,
      firstLineShadow: 'rgba(0, 0, 0, 0)',

      // second bar
      secondLineGradFrom: baseThemeVariables.primary,
      secondLineGradTo: baseThemeVariables.primary,
      secondLineShadow: 'rgba(0, 0, 0, 0)',

      // third bar
      thirdLineGradFrom: baseThemeVariables.success,
      thirdLineGradTo: baseThemeVariables.successLight,
      thirdLineShadow: 'rgba(0, 0, 0, 0)',
    },

    orderProfitLegend: {
      firstItem: baseThemeVariables.success,
      secondItem: baseThemeVariables.primary,
      thirdItem: baseThemeVariables.bg3,
    },

    visitors: {
      tooltipBg: baseThemeVariables.bg,
      tooltipLineColor: 'rgba(0, 0, 0, 0)',
      tooltipLineWidth: '1',
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
      tooltipFontSize: '20',

      axisLineColor: baseThemeVariables.border4,
      axisFontSize: '16',
      axisTextColor: baseThemeVariables.fg,
      yAxisSplitLine: baseThemeVariables.separator,

      itemBorderColor: baseThemeVariables.primary,
      lineStyle: 'dotted',
      lineWidth: '6',
      lineGradFrom: '#ffffff',
      lineGradTo: '#ffffff',
      lineShadow: 'rgba(0, 0, 0, 0)',

      areaGradFrom: baseThemeVariables.primary,
      areaGradTo: baseThemeVariables.primaryLight,

      innerLineStyle: 'solid',
      innerLineWidth: '1',

      innerAreaGradFrom: baseThemeVariables.success,
      innerAreaGradTo: baseThemeVariables.success,
    },

    visitorsLegend: {
      firstIcon: baseThemeVariables.success,
      secondIcon: baseThemeVariables.primary,
    },

    visitorsPie: {
      firstPieGradientLeft: baseThemeVariables.success,
      firstPieGradientRight: baseThemeVariables.success,
      firstPieShadowColor: 'rgba(0, 0, 0, 0)',
      firstPieRadius: ['70%', '90%'],

      secondPieGradientLeft: baseThemeVariables.warning,
      secondPieGradientRight: baseThemeVariables.warningLight,
      secondPieShadowColor: 'rgba(0, 0, 0, 0)',
      secondPieRadius: ['60%', '97%'],
      shadowOffsetX: '0',
      shadowOffsetY: '0',
    },

    visitorsPieLegend: {
      firstSection: baseThemeVariables.warning,
      secondSection: baseThemeVariables.success,
    },

    earningPie: {
      radius: ['65%', '100%'],
      center: ['50%', '50%'],

      fontSize: '22',

      firstPieGradientLeft: baseThemeVariables.success,
      firstPieGradientRight: baseThemeVariables.success,
      firstPieShadowColor: 'rgba(0, 0, 0, 0)',

      secondPieGradientLeft: baseThemeVariables.primary,
      secondPieGradientRight: baseThemeVariables.primary,
      secondPieShadowColor: 'rgba(0, 0, 0, 0)',

      thirdPieGradientLeft: baseThemeVariables.warning,
      thirdPieGradientRight: baseThemeVariables.warning,
      thirdPieShadowColor: 'rgba(0, 0, 0, 0)',
    },

    earningLine: {
      gradFrom: baseThemeVariables.primary,
      gradTo: baseThemeVariables.primary,

      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
      tooltipFontSize: '16',
      tooltipBg: baseThemeVariables.bg,
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipBorderWidth: '1',
      tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
    },
  },
} as NbJSThemeOptions;
