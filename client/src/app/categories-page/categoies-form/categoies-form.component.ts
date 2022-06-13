import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';


@Component({
  selector: 'app-categoies-form',
  templateUrl: './categoies-form.component.html',
  styleUrls: ['./categoies-form.component.css']
})
export class CategoiesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  image: File
  imagePreview = null
  isNew = true
  category: Category

  constructor(
    private route: ActivatedRoute,
    private categoiesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.categoiesService.getById(params['id'])
            }

            return of(null)
          }
        )
      )
      .subscribe(
        (category: Category) => {
          if (category) {
            this.category = category
            this.form.patchValue({
              name: category.name
            })
            
            this.imagePreview = category.imagesrc
            MaterialService.updateTextImputs()
          }
          this.form.enable()
        },
        (error) => MaterialService.toast(error.error.message, 'red darken-1 rounded')
      )
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены, что хотите удалить категорию ${this.category.name}`)

    if (decision) {
      this.categoiesService.delete(this.category.id)
      .subscribe(
        response => MaterialService.toast(`${response.message}`, 'green rounded'),
        
        error => MaterialService.toast(error.error.message, 'red darken-1 rounded'),
        () => this.router.navigate(['/categories'])
      )
    }
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()
    
    if (this.isNew) {
      // create
      obs$ = this.categoiesService.create(this.form.value.name, this.image)
      obs$.subscribe(
        (category) => {
          this.category = category
          
          this.form.enable()
          MaterialService.toast('Категория создана', 'green rounded')
        },
        (error) => {
          MaterialService.toast(error.error.message, 'red darken-1 rounded')
          this.form.enable()
        } 
      )
    } else {
      //update
      if (this.image) {
        obs$ = this.categoiesService.update(this.category.id, this.form.value.name, this.image)
      } else {
        obs$ = this.categoiesService.update(this.category.id, this.form.value.name)
      }
      
      obs$.subscribe(
        (category) => {
          
          this.form.enable()
          MaterialService.toast('Изменения сохранены', 'green rounded')
        },
        (error) => {
          MaterialService.toast(error.error.message, 'red darken-1 rounded')
          this.form.enable()
        } 
      )
    }

    
  }
}
