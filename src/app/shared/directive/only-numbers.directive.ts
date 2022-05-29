import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[onlyNumbersAlphabet]'
})
export class OnlyNumbersDirective {

  @Input()
  public isOnlyNumber: boolean = true;

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = this.isOnlyNumber
      ? initalValue.replace(/[^0-9]*/g, '')
      : initalValue.replace(/[^0-9a-zA-Z]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
