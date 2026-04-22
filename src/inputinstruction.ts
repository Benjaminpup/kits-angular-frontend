import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appInputRestriction]'
})
export class InputRestrictionDirective {
    inputElement: ElementRef;

    @Input('appInputRestriction') appInputRestriction!: string;
    @Input('length') length: number = 0;
    nameRegex = /^[a-zA-Z\s]*$/;
    mobileNumRegex = /^[0-9]*$/;
    noSpclChar = /^[a-zA-Z0-9]*$/;;

    constructor(el: ElementRef,private renderer: Renderer2) {
        this.inputElement = el;
    }

    @HostListener('keypress', ['$event']) onKeyPress(event:any) {
        if (this.appInputRestriction === 'name') {
            this.restrictForName(event);
        }  else if (this.appInputRestriction === 'mobileNum') {
            alert('k')
            this.onlyNumbers(event);
        } 
    }

    restrictForName(event:any){
        const e = <KeyboardEvent>event;
        if (this.nameRegex.test(e.key)) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }
    }


    onlyNumbers(event:any){
        const e = <KeyboardEvent>event;
        if (this.mobileNumRegex.test(e.key)) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }
    }
    @HostListener('paste', ['$event']) onPaste(event:any) {
        let regex;
        if (this.appInputRestriction === 'name') {
            regex = this.nameRegex;
        } else if (this.appInputRestriction === 'noSpecialChars') {
            regex = this.noSpclChar;
        }
        const e = <ClipboardEvent>event;
            return true;
      }

   

      toggle() {
        const layoutWrapper = this.inputElement.nativeElement.querySelector('#layout-wrapper');
        this.renderer.addClass(layoutWrapper, 'toggled');
      }
}