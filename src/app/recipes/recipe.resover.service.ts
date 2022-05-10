import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router'
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
// import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})

export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService:DataStorageService,private recipesService:RecipeService){

    }
    //! งงตรงนี้แหละ
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
        const recipes = this.recipesService.getRecipes();
        //* เช็คว่า เรามี recipes ไม่ ถ้าไม่มีให้ fetch แต่ถ้ามีอยู่แล้วให้ return list
        if (recipes.length === 0){
            return this.dataStorageService.fetchRecipes();

        }else{
            return recipes;
        }
    }
}