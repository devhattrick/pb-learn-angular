import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false; //* แทนค่า isOpen
  @HostListener('click') toggleOpen() {//* จับEventClick
     //* เงื่อนไขอ้างอิงการดัก event click ที่ element
     //* ถ้าเข้าเงื่อนไขเป็น toggle ถ้าไม่เข้าเงื่อนไข ปิด
    this.isOpen = !this.isOpen;
  }
}
