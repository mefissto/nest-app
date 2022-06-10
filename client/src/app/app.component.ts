import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CUSTOM_ICONS } from '@constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    CUSTOM_ICONS.forEach(({ name, path }) =>
      this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(path))
    );
  }
}
