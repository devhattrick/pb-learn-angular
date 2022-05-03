import  {Directive, HostBinding, HostListener,OnChanges,ElementRef} from '@angular/core'

 @Directive({
    selector: '[appDropdown]'
})
// export class DropdownDirective {
//     @HostBinding('class.open') isOpen = false; //* แทนค่า isOpen
//     @HostListener('click') toggleOpen(){ //* จับEventClick
//     this.isOpen = !this.isOpen;
   
//    }
// }
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        //* เงื่อนไขอ้างอิงการดัก event click ที่ element
        //* ถ้าเข้าเงื่อนไขเป็น toggle ถ้าไม่เข้าเงื่อนไข ปิด
      this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    constructor(private elRef: ElementRef) {}
    
}