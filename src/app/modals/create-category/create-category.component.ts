import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Category } from 'src/app/models/category';
import { IonicModule, ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class CreateCategoryComponent{

  category!: Category;
  createForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private dbService: DatabaseService, private modalController: ModalController) { }

  ngOnInit(){
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
    });
  }

  async cancel(){
    await this.modalController.dismiss();
  }

  async createCategory(): Promise<void>{
    this.category = this.createForm.value;
    this.category.user_id = this.dbService.getLoggedInUser().user_id;

    console.log(this.category);
    this.categoryService.create(this.createForm.value).subscribe((data: any) => {
      let d = data;
    });
  }

}
