import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
@Injectable() 
//* การใช้ Decorator @Injectable นั้น เป็นการบอก Injector ว่า Class นี้สามารถถูก Inject ได้ (ใช้ Dependency Injection ได้นั้นเอง) 
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  //* mockup Data
  private recipes: Recipe[] = [
    new Recipe(
      'name',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
          new Ingredient('Meat',1),
          new Ingredient('Berger',20),
          new Ingredient('French Fires',30),
      ]
    ),
    new Recipe(
      'One more',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Buns',1),
        new Ingredient('Nugget',2),
        new Ingredient('Rice',3)
      ]
    ),
    
  ];

  constructor(private slService:ShoppingListService){

  }
  getRecipes() {
    return this.recipes.slice();
  }
  
  addIngredientsToShoppongList(ingredients: Ingredient[]){
      //* ส่ง Ingredient  ไป ShoppingListService
    this.slService.addIngredients(ingredients);
  }
  //! แสดง ด้วย index
  getRecipe(index:number) {
    return this.recipes[index];
  }
}
