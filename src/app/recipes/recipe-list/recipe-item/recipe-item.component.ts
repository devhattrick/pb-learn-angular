import { Component, OnInit, Input} from '@angular/core';
// import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  
  // constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    console.log('index',this.index)
  }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe)
  //   // this.recipeSelected.emit();
  // }

}
