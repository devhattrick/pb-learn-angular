import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  // EventEmitter,
  // Output
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service'
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef; //* คล้ายๆ useRef React
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef; //* คล้ายๆ useRef React
  // @Output() ingredientAdded = new EventEmitter<Ingredient>(); //* ส่งออก output event

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
  }

  //* Add Item list after onClick Add Sent Output
  onAddItem() {
    //* assign ref Element  ของ Element แล้ว .value
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    //* assign Name Amount
    const newIngredient = new Ingredient(ingName, ingAmount); 
    //* assign event
    // this.ingredientAdded.emit(newIngredient);
    this.slService.addIngredient(newIngredient);
  }

}
