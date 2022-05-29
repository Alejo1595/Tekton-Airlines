import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostBinding, HostListener, Inject } from '@angular/core';

@Directive({
  selector: '[alphabetAndSpecialCharacters]'
})
export class AlphabetAndSpecialCharactersDirective {

  constructor(private el: ElementRef) { }
  
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[0-9]/, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
