import { Component, Directive, OnInit, HostBinding, HostListener, Input } from '@angular/core';

@Directive({selector: 'tooltip-content'})
export class TooltipContentDirective {}

@Directive({selector: 'tooltip-target'})
export class TooltipTargetDirective {}

@Component({
  selector: 'tooltip-wrapper',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @HostBinding('class.active') active = false;
  @HostBinding('class.left') private _left = false;
  @HostBinding('class.right') private _right = false;
  @HostBinding('class.top') private _top = true;
  @HostBinding('class.bottom') private _bottom = false;
  @HostBinding('style.display') display = 'inline-block';
  @Input() set direction(direction: 'left'|'right'|'top'|'bottom') {
    this._left = false;
    this._right = false;
    this._top = false;
    this._bottom = false;
    switch (direction) {
      case 'left':
        this._left = true;
        break;
      case 'right':
        this._right = true;
        break;
      case 'top':
        this._top = true;
        break;
      case 'bottom':
        this._bottom = true;
        break;
      default:
        this._top = true;
        break;
    }
  }
  @Input() color = '#39F';

  @HostListener('mouseenter') onmouseenter() { this.active = true; }
  @HostListener('mouseleave') onmouseleave() { this.active = false; }

  constructor() { }

  ngOnInit() {
  }

}
