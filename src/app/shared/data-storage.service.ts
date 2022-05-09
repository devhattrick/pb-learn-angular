import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import {map,tap} from 'rxjs/operators'

@Injectable({providedIn:'root'})
export class DataStorageService {
    constructor(private http:HttpClient,private recipesService:RecipeService){}

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
       return this.http.put('https://ng-course-recipe-book-f2f71-default-rtdb.firebaseio.com/recipes.json',recipes)
       .subscribe(res=>{
           console.log('response',res);
           
       })
    }
    fetchRecipes(){
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-f2f71-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes=>{
            return recipes.map(recipe=>{
                // console.log('>check',ingredients:recipe.ingredients ? recipe.ingredients:[])
                //* ป้องกันข้อผิดพลาด ทำให้มัน เป็น Array ว่างก่อน
                return {...recipe, ingredients:recipe.ingredients ? recipe.ingredients:[]}
            });
        }),tap(recipes =>{
            this.recipesService.setRecipe(recipes);
        }))
        // .subscribe(resList=>{
        //     console.log('ResGetData',resList)
        //     this.recipesService.setRecipe(resList);
        // })
    }
}