import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[Lightbox]'
})
export class LightboxDirective implements OnChanges{

 @Input() HighlightColor:string="yellow";
 @Input() DefualtColor:string="green";

  constructor(private elemRef: ElementRef) {
// elemRef.nativeElement.style.border="10px solid black";
// elemRef.nativeElement.style.padding="5px";
// elemRef.nativeElement.style.margin="5px";

   }
  ngOnChanges(changes: SimpleChanges): void {
    this.elemRef.nativeElement.style.border=`3px solid ${this.DefualtColor}`;
  }

  @HostListener('mouseover') onMouseOver(){
    this.elemRef.nativeElement.style.border=`3px solid ${this.HighlightColor}`;
   }
   @HostListener('mouseout') onMouseOut(){
    this.elemRef.nativeElement.style.border="2px solid blue";
   }

}
