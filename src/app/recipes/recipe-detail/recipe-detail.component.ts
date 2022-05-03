import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { ActivatedRoute ,Params} from '@angular/router';

import { Recipe } from '../recipe.model';
import  {RecipeService } from '../recipe.service'; //* เรียก service มาใช้
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe; //*  รับ input props recipe
  recipe: Recipe;
  id:number;
  constructor(private recipeService: RecipeService,private route:ActivatedRoute) {
    console.log('test - constructor')
   }

  ngOnInit() {
    // console.log('test - ngOnInit')
    // const id = this.route.snapshot.params['id']
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id']; //* เอา ID จาก params มาแทนค่า 
      this.recipe =this.recipeService.getRecipe(this.id); //* แทนค่า recipe แล้วแสดงผล
    })
  }
  ngOnChanges(){
    // console.log('>data<',this.recipe)

  }
  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppongList(this.recipe.ingredients)
  }

}
