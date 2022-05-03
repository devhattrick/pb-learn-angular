import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from './shopping-list.service'
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
 ingredients: Ingredient[];

 constructor(private slService:ShoppingListService){

}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients()
    //! subscribe Observable
    this.slService.ingredientsChanged.subscribe((ingredients:Ingredient[]) =>{
      this.ingredients = ingredients
      //* ขอดู $event
    })
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient); //* push ingredient ใน ingredients Array
  // }
}
