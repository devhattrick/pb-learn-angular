import { Component, OnInit,OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }
  ngOnChanges(){


  }
  ngOnInit() {
    console.log('>>check param',this.route.params['id'] = !null)

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; //todo  Id get มาจาก param
          this.editMode = params['id'] != null; //* set mode
          this.initForm();
          
        }
      );
  }

  onSubmit() {
    console.log('mode',this.editMode)
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      //* เมื่อกด submit update จะส่ง id กับ value ไป ที่ service
      alert('update')
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      alert('new')

      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  //* push ค่า input list  Ingredient
  onAddIngredient() {
    console.log('Add list Ingredient');
    
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        //! input Ingredient form recipe
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  //* ลบ list ที่ index นั้น
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  //! fix bug
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  
  //* เมื่อกด Cancle รีหน้ามาที่ path ก่อนหน้า
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);


    //* โหมด edit จะ set default ค่า เดิม มาแสดง ตาม  index  ที่ get มาจาก param  
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }


    //* validation input Form
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
