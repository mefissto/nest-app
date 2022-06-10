import { ComponentRef, Directive, ElementRef, HostListener, Input, TemplateRef } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipComponent } from './tooltip.component';
import { FormErrorType } from '@core/types/form-error-type';

@Directive({ selector: '[appTooltip]' })
export class TooltipRendererDirective {
  /**
   * This will be used to show tooltip or not
   * This can be used to show the tooltip conditionally
   */
  @Input() public showToolTip: boolean = true;

  //If this is specified then the specified text will be shown in the tooltip
  @Input(`appTooltip`) public text: string;

  //If this is specified then specified form error will be rendered in the tooltip
  @Input() public formErrors: Record<string, FormErrorType>;

  //If this is specified then specified template will be rendered in the tooltip
  @Input() public contentTemplate: TemplateRef<any>;

  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  /**
   * Init life cycle event handler
   */
  public ngOnInit(): void {
    if (!this.showToolTip) {
      return;
    }

    //you can take the position as an input to adjust the position
    //, for now, it will show at the bottom always; but you can adjust your code as per your need
    const positionStrategy = this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([
      {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: -5,
      },
    ]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  /**
   * This method will be called whenever the mouse enters in the Host element
   * i.e. where this directive is applied
   * This method will show the tooltip by instantiating the CustomToolTipComponent and attaching to the overlay
   */
  @HostListener('mouseenter')
  public show(): void {
    //attach the component if it has not already attached to the overlay
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
      tooltipRef.instance.text = this.text;
      tooltipRef.instance.contentTemplate = this.contentTemplate;
      tooltipRef.instance.formErrors = this.formErrors;
    }
  }

  /**
   * This method will be called when the mouse goes out of the host element
   * i.e. where this directive is applied
   * This method will close the tooltip by detaching the overlay from the view
   */
  @HostListener('mouseleave')
  public hide(): void {
    this.closeToolTip();
  }

  /**
   * Destroy lifecycle event handler
   * This method will make sure to close the tooltip
   */
  public ngOnDestroy(): void {
    this.closeToolTip();
  }

  /**
   * This method will close the tooltip by detaching the component from the overlay
   */
  private closeToolTip(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
