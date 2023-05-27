import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Category } from 'src/app/models/category';
import { IonicModule, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { DatabaseService } from 'src/app/services/database.service';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';

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

  async presentPopover(category: Category) { // still a bunch of code just to use a object/component
    const popover = await this.popoverController.create({  // we create a popup from the existing pop-upComponent class so to say, you could switch out the component to create
      component: PopUpComponent,
      componentProps: { description: "Are you sure you want to delete " + category.title } // value to send as input param
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
      let d = data; 
      this.presentToast(false);
    });
  }

  editCategory(id: number){
    this.categoryService.update(id, this.category).subscribe((data: any) => {  /// TODO implement this
      let d = data; 
      this.presentToast(false);
    });
  }

  async createCategory(): Promise<void>{
    this.category = this.createForm.value;
    this.category.user_id = this.dbService.getLoggedInUser().user_id;

    //console.log(this.category);
    this.categoryService.create(this.createForm.value).subscribe((data: any) => {
      let d = data;
      this.category = new Category;
    });
    this.presentToast();
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
    this.getAllCategories();
  }

  async cancel(){
    await this.modalController.dismiss();
  }

}
