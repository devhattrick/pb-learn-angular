import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router'
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
// import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})

export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService:DataStorageService){

    }
    //! งงตรงนี้แหละ
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
        return this.dataStorageService.fetchRecipes();
    }
}