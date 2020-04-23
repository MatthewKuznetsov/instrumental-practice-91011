import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss']
})

export class BlogComponent {
  posts$: Observable<any[]>;
  form: FormGroup;
  error: any;
  formIsOpened = false;

  constructor(
    private _dataService: DataService,
    private _authService: AuthService
  ) {
    this.posts$ = _dataService.getPosts$();
    this.form = new FormGroup({
      tytle: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required])
    })
  }

  openForm() {
    this.formIsOpened = true;
  }

  closeForm() {
    this.formIsOpened = false;
    this.form.reset();
  }

  addPost() {
    const controls = this.form.controls;
    if (this.form.valid) {
      this._dataService.addPost$(
        controls.tytle.value,
        controls.text.value
      ).subscribe(e => {
        if (e) {
          this.error = false;
          this.posts$ = this._dataService.getPosts$();
          this.closeForm();
        } else {
          this.error = { message: 'Can not add post. Try again.' }
        }
      })
    }
  }

  signOut() {
    this._authService.signOut();
  }
}