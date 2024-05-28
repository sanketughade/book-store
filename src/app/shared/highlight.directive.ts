import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#f0f8ff');
    this.renderer.setStyle(
      this.el.nativeElement,
      'boxShadow',
      '0 4px 8px rgba(0, 0, 0, 0.1)'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
    this.renderer.removeStyle(this.el.nativeElement, 'boxShadow');
  }
}
