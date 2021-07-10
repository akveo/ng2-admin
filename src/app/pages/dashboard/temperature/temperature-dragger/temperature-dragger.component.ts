import {
  Component,
  HostListener,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

let uniqueId = 0;
const VIEW_BOX_SIZE = 300;

@Component({
  selector: 'ngx-temperature-dragger',
  templateUrl: './temperature-dragger.component.html',
  styleUrls: ['./temperature-dragger.component.scss'],
})
export class TemperatureDraggerComponent implements AfterViewInit, OnChanges {

  @ViewChild('svgRoot', { static: true }) svgRoot: ElementRef;

  @Input() fillColors: string|string[];
  @Input() disableArcColor;
  @Input() bottomAngle = 90;
  @Input() arcThickness = 18; // CSS pixels
  @Input() thumbRadius = 16; // CSS pixels
  @Input() thumbBorder = 3;
  @Input() thumbBg;
  @Input() thumbBorderColor;
  @Input() maxLeap = 0.4;

  value = 50;
  @Output() valueChange = new EventEmitter<Number>();
  @Input('value') set setValue(value) {
    this.value = value;
  }

  @Input() min = 0; // min output value
  @Input() max = 100; // max output value
  @Input() step = 0.1;

  @Output() power = new EventEmitter<boolean>();

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event) {
    this.recalculateValue(event);
    this.isMouseDown = false;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.recalculateValue(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.invalidate();
  }

  off = false;
  oldValue: number;

  svgControlId = uniqueId++;
  scaleFactor = 1;
  bottomAngleRad = 0;
  radius = 100;
  translateXValue = 0;
  translateYValue = 0;
  thickness = 6;
  pinRadius = 10;
  colors: any = [];

  styles = {
    viewBox: '0 0 300 300',
    arcTranslateStr: 'translate(0, 0)',
    clipPathStr: '',
    gradArcs: [],
    nonSelectedArc: {},
    thumbPosition: { x: 0, y: 0 },
    blurRadius: 15,
  };

  private isMouseDown = false;
  private init = false;

  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
  ) {
    this.oldValue = this.value;
  }

  ngAfterViewInit(): void {
    // IE fix
    setTimeout(() => {
      this.invalidate();
      this.init = true;
    });
  }

  ngOnChanges(): void {
    if (this.init) {
      this.invalidate();
    }
  }

  mouseDown(event) {
    this.isMouseDown = true;
    if (!this.off) {
      this.recalculateValue(event, true);
    }
  }

  switchPower() {
    this.off = !this.off;
    this.power.emit(!this.off);

    if (this.off) {
      this.oldValue = this.value;
      this.value = this.min;
    } else {
      this.value = this.oldValue;
    }

    this.invalidatePinPosition();
  }

  getUrlFragment(id: string) {
    return `url(${id}${this.svgControlId})`;
  }

  private invalidate(): void {
    this.bottomAngleRad = TemperatureDraggerComponent.toRad(this.bottomAngle);
    this.calculateVars();

    this.invalidateClipPathStr();
    this.invalidatePinPosition();

    // Chrome fix, temporary solution
    // TODO: review set data to styles object
    setTimeout(() => {
      this.invalidateGradientArcs();
    });
  }

  private calculateVars() {
    this.bottomAngleRad = TemperatureDraggerComponent.toRad(this.bottomAngle);
    this.colors = (typeof this.fillColors === 'string') ? [this.fillColors] : this.fillColors;

    const halfAngle = this.bottomAngleRad / 2;

    const svgBoundingRect = this.svgRoot.nativeElement.getBoundingClientRect();
    const svgAreaFactor = svgBoundingRect.height && svgBoundingRect.width / svgBoundingRect.height || 1;
    const svgHeight = VIEW_BOX_SIZE / svgAreaFactor;
    const thumbMaxRadius = this.thumbRadius + this.thumbBorder;
    const thumbMargin = 2 * thumbMaxRadius > this.arcThickness
      ? (thumbMaxRadius - this.arcThickness / 2) / this.scaleFactor
      : 0;

    this.scaleFactor = svgBoundingRect.width / VIEW_BOX_SIZE || 1;
    this.styles.viewBox = `0 0 ${VIEW_BOX_SIZE} ${svgHeight}`;


    const circleFactor = this.bottomAngleRad <= Math.PI
      ? ( 2 / (1 + Math.cos(halfAngle)) )
      : ( 2 * Math.sin(halfAngle) / (1 + Math.cos(halfAngle)) );
    if (circleFactor > svgAreaFactor) {
      if (this.bottomAngleRad > Math.PI) {
        this.radius = (VIEW_BOX_SIZE - 2 * thumbMargin) / (2 * Math.sin(halfAngle));
      } else {
        this.radius = VIEW_BOX_SIZE / 2 - thumbMargin;
      }
    } else {
      this.radius = (svgHeight - 2 * thumbMargin) / (1 + Math.cos(halfAngle));
    }

    this.translateXValue = VIEW_BOX_SIZE / 2 - this.radius;
    this.translateYValue = (svgHeight) / 2 - this.radius * (1 + Math.cos(halfAngle)) / 2;

    this.styles.arcTranslateStr = `translate(${this.translateXValue}, ${this.translateYValue})`;

    this.thickness = this.arcThickness / this.scaleFactor;
    this.pinRadius = this.thumbRadius / this.scaleFactor;
  }

  private calculateClipPathSettings() {
    const halfAngle = this.bottomAngleRad / 2;
    const innerRadius = this.radius - this.thickness;

    const xStartMultiplier = 1 - Math.sin(halfAngle);
    const yMultiplier = 1 + Math.cos(halfAngle);
    const xEndMultiplier = 1 + Math.sin(halfAngle);

    return {
      outer: {
        start: {
          x: xStartMultiplier * this.radius,
          y: yMultiplier * this.radius,
        },
        end: {
          x: xEndMultiplier * this.radius,
          y: yMultiplier * this.radius,
        },
        radius: this.radius,
      },
      inner: {
        start: {
          x: xStartMultiplier * innerRadius + this.thickness,
          y: yMultiplier * innerRadius + this.thickness,
        },
        end: {
          x: xEndMultiplier * innerRadius + this.thickness,
          y: yMultiplier * innerRadius + this.thickness,
        },
        radius: innerRadius,
      },
      thickness: this.thickness,
      big: this.bottomAngleRad < Math.PI ? '1' : '0',
    };

  }

  private invalidateClipPathStr() {
    const s = this.calculateClipPathSettings();

    let path = `M ${s.outer.start.x},${s.outer.start.y}`; // Start at startangle top

    // Outer arc
    // Draw an arc of radius 'radius'
    // Arc details...
    path += ` A ${s.outer.radius},${s.outer.radius}
       0 ${s.big} 1
       ${s.outer.end.x},${s.outer.end.y}`; // Arc goes to top end angle coordinate

    // Outer to inner connector
    path += ` A ${s.thickness / 2},${s.thickness / 2}
       0 1 1
       ${s.inner.end.x},${s.inner.end.y}`;

    // Inner arc
    path += ` A ${s.inner.radius},${s.inner.radius}
       1 ${s.big} 0
       ${s.inner.start.x},${s.inner.start.y}`;

    // Outer to inner connector
    path += ` A ${s.thickness / 2},${s.thickness / 2}
       0 1 1
       ${s.outer.start.x},${s.outer.start.y}`;

    // Close path
    path += ' Z';
    this.styles.clipPathStr = path;
  }

  private calculateGradientConePaths(angleStep) {
    const radius = this.radius;

    function calcX(angle) {
      return radius * (1 - 2 * Math.sin(angle));
    }

    function calcY(angle) {
      return radius * (1 + 2 * Math.cos(angle));
    }

    const gradArray = [];

    for (let i = 0, currentAngle = this.bottomAngleRad / 2; i < this.colors.length; i++, currentAngle += angleStep) {
      gradArray.push({
        start: { x: calcX(currentAngle), y: calcY(currentAngle) },
        end: { x: calcX(currentAngle + angleStep), y: calcY(currentAngle + angleStep) },
        big: Math.PI <= angleStep ? 1 : 0,
      });
    }
    return gradArray;
  }

  private invalidateGradientArcs() {
    const radius = this.radius;

    function getArc(des) {
      return `M ${radius},${radius}
         L ${des.start.x},${des.start.y}
         A ${2 * radius},${2 * radius}
         0 ${des.big} 1
         ${des.end.x},${des.end.y}
         Z`;
    }

    const angleStep = (2 * Math.PI - this.bottomAngleRad) / this.colors.length;
    const s = this.calculateGradientConePaths(angleStep);

    this.styles.gradArcs = [];
    for (let i = 0; i < s.length; i++) {
      const si = s[i];
      const arcValue = getArc(si);
      this.styles.gradArcs.push({
        color: this.colors[i],
        d: arcValue,
      });
    }

    this.styles.blurRadius = 2 * radius * Math.sin(angleStep / 6);
  }

  private invalidateNonSelectedArc() {
    const angle = this.bottomAngleRad / 2 + (1 - this.getValuePercentage()) * (2 * Math.PI - this.bottomAngleRad);
    this.styles.nonSelectedArc = {
      color: this.disableArcColor,
      d: `M ${this.radius},${this.radius}
       L ${this.radius},${3 * this.radius}
       A ${2 * this.radius},${2 * this.radius}
       1 ${angle > Math.PI ? '1' : '0'} 0
       ${this.radius + this.radius * 2 * Math.sin(angle)},${this.radius + this.radius * 2 * Math.cos(angle)}
       Z`,
    };
  }

  private invalidatePinPosition() {
    const radiusOffset = this.thickness / 2;
    const curveRadius = this.radius - radiusOffset;
    const actualAngle = (2 * Math.PI - this.bottomAngleRad) * this.getValuePercentage() + this.bottomAngleRad / 2;
    this.styles.thumbPosition = {
      x: curveRadius * (1 - Math.sin(actualAngle)) + radiusOffset,
      y: curveRadius * (1 + Math.cos(actualAngle)) + radiusOffset,
    };
    this.invalidateNonSelectedArc();
  }

  private recalculateValue(event, allowJumping = false) {
    if (this.isMouseDown && !this.off) {
      const rect = this.svgRoot.nativeElement.getBoundingClientRect();
      const center = {
        x: rect.left + VIEW_BOX_SIZE * this.scaleFactor / 2,
        y: rect.top + (this.translateYValue + this.radius) * this.scaleFactor,
      };
      let actualAngle = Math.atan2(center.x - event.clientX, event.clientY - center.y);
      if (actualAngle < 0) {
        actualAngle = actualAngle + 2 * Math.PI;
      }

      const previousRelativeValue = this.getValuePercentage();
      let relativeValue = 0;
      if (actualAngle < this.bottomAngleRad / 2) {
        relativeValue = 0;
      } else if (actualAngle > 2 * Math.PI - this.bottomAngleRad / 2) {
        relativeValue = 1;
      } else {
        relativeValue = (actualAngle - this.bottomAngleRad / 2) / (2 * Math.PI - this.bottomAngleRad);
      }

      const value = this.toValueNumber(relativeValue);

      if (this.value !== value && (allowJumping || Math.abs(relativeValue - previousRelativeValue) < this.maxLeap)) {
        this.value = value;
        this.valueChange.emit(this.value);
        this.invalidatePinPosition();
      }
    }
  }

  private getValuePercentage() {
    return (this.value - this.min) / (this.max - this.min);
  }

  private toValueNumber(factor) {
    return Math.round(factor * (this.max - this.min) / this.step) * this.step + this.min;
  }

  private static toRad(angle) {
    return Math.PI * angle / 180;
  }
}
