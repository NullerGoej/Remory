import { Component, Input, OnInit, inject } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { DatabaseService } from 'src/app/services/database.service';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class EditCategoryComponent  implements OnInit {

  originalCategoryTitle: string = "";
  @Input() category!: Category;

  toastController: ToastController = inject(ToastController);

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private dbService: DatabaseService, private modalController: ModalController) { }

  ngOnInit() {
    this.originalCategoryTitle = this.category.title;
  }
  
  updateCategory(){
    this.categoryService.update(this.category.category_id, this.category).subscribe((data: any) => { 
      let d = data; 
      this.cancel();
      this.presentToast();
      this.category = new Category();
    });
  }

   async presentToast() {
    const toast = await this.toastController.create({
      message: "Updated category name to:  " + this.category.title, 
      duration: 1200,
      position: "middle",
      cssClass: "toast"
    });
    
    await toast.present();
  }
  
  async cancel(){
    await this.modalController.dismiss();
  }
}
