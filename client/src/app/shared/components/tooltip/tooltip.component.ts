import { Component, Input, TemplateRef } from '@angular/core';

import { matchErrorMessages } from '@core/helpers/form-error-matcher';
import { FormErrorType } from '@core/types/form-error-type';

/**
 * This component will be used to show custom tooltip
 *
 * This component will be rendered using OverlayModule of angular material
 * This component will be rendered by the directive on an Overlay
 *
 * CONSUMER will not be using this component directly
 * This component will be hosted in an overlay by ToolTipRenderer directive
 * This component exposes two properties. These two properties will be filled by ToolTipRenderer directive
 * 1. text - This is a simple string which is to be shown in the tooltip; This will be injected in the ToolTipRenderer directive
 *    by the consumer
 * 2. contentTemplate - This gives finer control on the content to be shown in the tooltip
 *
 * NOTE - ONLY one should be specified; If BOTH are specified then "template" will be rendered and "text" will be ignored
 */
@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  /**
   * This is simple text which is to be shown in the tooltip
   */
  @Input() public text: string;
  /**
   * This provides an object with form-control errors
   */
  @Input() public set formErrors(source: Record<string, FormErrorType>) {
    if (source && Object.keys(source).length) {
      this.messages = Object.values(matchErrorMessages(source));
    }
  }

  /**
   * This provides finer control on the content to be visible on the tooltip
   * This template will be injected in ToolTipRenderer directive in the consumer template
   * <ng-template #template>
   *  content.....
   * </ng-template>
   */
  @Input() public contentTemplate: TemplateRef<any>;

  public messages: string[] = [];
}
