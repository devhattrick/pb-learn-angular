import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  //* inject srevice DataStorageService
  constructor(private dataStorageService:DataStorageService){}

  onSaveData(){
    //* call service func store -> Recipes
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
