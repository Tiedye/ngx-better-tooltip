import { Component, Directive, OnInit, HostBinding, HostListener, Input, Output, ContentChild, EventEmitter } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({selector: 'tooltip-content'})
export class TooltipContentDirective {}

// tslint:disable-next-line:directive-selector
@Directive({selector: 'tooltip-target'})
export class TooltipTargetDirective {
  click = new EventEmitter<void>();

  @HostListener('click') private _click() {
    this.click.emit();
  }
}

@Component({
  selector: 'tooltip-wrapper',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @ContentChild(TooltipTargetDirective) target: TooltipTargetDirective;

  get active() { return this._active; }
  set active(v: boolean) {
    this._active = v;
    if (v) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }
  @HostBinding('class.active') private _active = false;
  @HostBinding('class.left') private _left = false;
  @HostBinding('class.right') private _right = false;
  @HostBinding('class.top') private _top = true;
  @HostBinding('class.bottom') private _bottom = false;
  @Input() @HostBinding('style.display') display = 'inline-block';
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
  @Input() toggle = false;
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @HostListener('mouseenter') onmouseenter() {
    if (!this.toggle) {
      this.active = true;
    }
  }
  @HostListener('mouseleave') onmouseleave() {
    if (!this.toggle) {
      this.active = false;
    }
  }

  doToggle() {
    if (this.toggle) {
      this.active = !this.active;
    }
  }

  close() {
    this.active = false;
  }

  open() {
    this.active = true;
  }

  constructor() { }

  ngOnInit() {
    this.target.click.subscribe(() => this.doToggle());
  }

}
