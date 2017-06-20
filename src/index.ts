import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent, TooltipContentDirective, TooltipTargetDirective } from './tooltip.component';

export { TooltipComponent } from './tooltip.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TooltipComponent,
    TooltipContentDirective,
    TooltipTargetDirective
  ],
  exports: [
    TooltipComponent,
    TooltipContentDirective,
    TooltipTargetDirective
  ]
})
export class TooltipModule {
}
