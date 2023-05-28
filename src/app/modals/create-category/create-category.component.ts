import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Category } from 'src/app/models/category';
import { IonicModule, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { DatabaseService } from 'src/app/services/database.service';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class CreateCategoryComponent{

  toastController: ToastController = inject(ToastController);

  category!: Category;
  categories: Category[] = [];
  createForm!: FormGroup;
  isToastOpen: boolean = false;

  constructor(private formBuilder: FormBuilder, public popoverController: PopoverController, private categoryService: CategoryService, private dbService: DatabaseService, private modalController: ModalController) { }

  ngOnInit(){
    this.getAllCategories();
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
    });
  }

  async presentEditCategoryModal(cat: Category) {
    const modal = await this.modalController.create({  
      component: EditCategoryComponent,
      componentProps: { category: cat } 
    });
      await modal.present(); 
  }

  async presentPopover(category: Category) { 
    const popover = await this.popoverController.create({ 
      component: PopUpComponent,
      componentProps: { description: "Are you sure you want to delete " + category.title }
    });

      await popover.present(); 
      
      popover.onDidDismiss()
      .then((data) => {
        if(data?.data) {
          this.deleteCategory(category.category_id);
        }
      });
  }

  async getAllCategories(): Promise<void> {
    this.categoryService.getAllByUserId(this.dbService.getLoggedInUser().user_id).subscribe((data: any) => { 
      this.categories = data; 
    });
  }
  
  deleteCategory(id: number){
    this.categoryService.delete(id).subscribe((data: any) => { 
      this.presentToast(false);
      let d = data; 
    });
  }

  async createCategory(): Promise<void>{
    this.category = this.createForm.value;
    this.category.user_id = this.dbService.getLoggedInUser().user_id;

    //console.log(this.category);
    this.categoryService.create(this.createForm.value).subscribe((data: any) => {
      this.presentToast();
      this.category = new Category;
      let d = data;
    });
  }

  async presentToast(create: boolean = true) {
    let action = "Created category:  ";
    if(!create) action = "Deleted category  ";
    const toast = await this.toastController.create({
      message: action + this.category.title, // wish I knew how to make the title text have a different color to stand out
      duration: 1000,
      position: "middle",
      cssClass: "toast"
    });
    
    await toast.present();
    await this.getAllCategories();

  }

  async cancel(){
    await this.modalController.dismiss();
  }

}
