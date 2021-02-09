import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent implements OnInit {
  public constructor(private readonly themeService: NbThemeService) {
  }

  public materialTheme$: Observable<boolean>;
  public starRate: number = 2;
  public heartRate: number = 4;
  public radioGroupValue: string = 'This is value 2';
  public showMaterialInputs = false;

  ngOnInit() {
    this.materialTheme$ = this.themeService.onThemeChange()
    .pipe(tap(theme => {
      const themeName: string = theme?.name || '';
      this.showMaterialInputs = themeName.startsWith('material');
    }));
  }
}
