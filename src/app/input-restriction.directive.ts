import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputRestriction]'
})
export class InputRestrictionDirective {
  @Input('appInputRestriction') appInputRestriction!: string;
  
  nameRegex = /^[a-zA-Z\s]*$/;
  mobileNumRegex = /^[0-9]*$/;
  noSpclChar = /^[a-zA-Z0-9]*$/;

  constructor(private el: ElementRef) {} // Inject ElementRef here

  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    if (this.appInputRestriction === 'name') {
      this.restrictForName(event);
    } else if (this.appInputRestriction === 'noSpecialChars') {
      this.noSpecialChars(event);
    } else if (this.appInputRestriction === 'mobileNum') {
      this.onlyNumbers(event);
    }
  }

  restrictForName(event: any) {
    const e = <KeyboardEvent>event;
    if (this.nameRegex.test(e.key)) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }

  noSpecialChars(event: any) {
    const e = <KeyboardEvent>event;
    if (this.noSpclChar.test(e.key)) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }

  onlyNumbers(event: any) {
    const e = <KeyboardEvent>event;
    if (this.mobileNumRegex.test(e.key)) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }
}
