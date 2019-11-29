import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AutocompleteAngular';
  MyControl = new FormControl();
  options: string[] = [''];
  filteredOptions: Observable<string[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.filteredOptions = this.MyControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
