import { Component, OnInit,OnDestroy } from '@angular/core';
import {ShoppingListService} from './shopping-list.service'
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
 ingredients: Ingredient[];
  private igChangeSub:Subscription
 constructor(private slService:ShoppingListService){

}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients()
      //! subscribe Observable
      this.igChangeSub = this.slService.ingredientsChanged
      .subscribe((ingredients:Ingredient[]) =>{
      this.ingredients = ingredients
      //* ขอดู $event
    })
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient); //* push ingredient ใน ingredients Array
  // }
}
