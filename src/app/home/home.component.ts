import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { AuthServiceService } from '../auth-service.service';
import { Currency } from './currency.modal';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Currencies: Currency[] ;

  displayedColumns: string[] = ['ID', 'currency', 'value','options'];

  dataSource = new MatTableDataSource(null);
  //dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addForm: FormGroup;
  
  constructor(private fb: FormBuilder, private authService : AuthServiceService) { }

  ngOnInit(): void {
    this.fetchData();
    this.initForm();
  }

  initForm(){
    this.addForm = this.fb.group({
      currency: new FormControl('',[Validators.required]),
      value: new FormControl('',[Validators.required]),
      curr_id: new FormControl('',Validators.nullValidator)
    })
  }

  addCurrency(){
    if(this.addForm.valid){
      let curr = new Currency();
      curr.currency_desc = this.addForm.controls.currency.value;
      curr.currency_value = this.addForm.controls.value.value;
      curr.currency_id = this.addForm.controls.curr_id.value;
      this.authService.addCurrency(curr).subscribe((data: HttpResponse<any>) => {
        
        console.log({data});
        if(data.status == 201){
          console.log("data okay !!!!!!!!");
          this.fetchData();
      }else{
        alert("currency was not added");
      }
      });
    }
  }

  editCurrency(element:Currency){
    console.log({element});
    this.addForm.controls.currency.setValue(element.currency_desc);
    this.addForm.controls.value.setValue(element.currency_value);
    this.addForm.controls.curr_id.setValue(element.currency_id);
  }

  fetchData(){
    this.authService.getAllCurrencieses().subscribe(
      (data: HttpResponse<any>) => {
         console.log("response",data);
         this.Currencies = data.body.currencies;
          this.dataSource = new MatTableDataSource(this.Currencies);
      });
  }

}
