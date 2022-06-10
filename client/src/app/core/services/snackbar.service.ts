import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { SNACKBAR_CONFIG } from '@constants';

@Injectable()
export class SnackbarService {
  constructor(private toastrService: ToastrService) {}

  public success(message: string, title?: string): void {
    this.toastrService.success(message, title, SNACKBAR_CONFIG);
  }

  public error(message: string, title?: string): void {
    this.toastrService.error(message, title, SNACKBAR_CONFIG);
  }

  public warning(message: string, title?: string): void {
    this.toastrService.warning(message, title, SNACKBAR_CONFIG);
  }

  public info(message: string, title?: string): void {
    this.toastrService.info(message, title, SNACKBAR_CONFIG);
  }
}
