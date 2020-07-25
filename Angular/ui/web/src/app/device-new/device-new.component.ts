import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { Category } from '../../model/model';

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.css']
})

export class DeviceNewComponent implements OnInit {

  deviceForm: FormGroup;
  dev_id: number = null;
  dev_category: number = null;
  dev_color: String = '';
  dev_partNumber: number = null;
  isLoadingResults = false;
  categories: Category[];

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.deviceForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'category' : [null, Validators.required],
      'color' : [null, Validators.required],
      'partNumber':[null, Validators.required]
    });

    this.api.getCategories()
      .subscribe(res => {
        this.categories = res
      });
  }

  addDevice(form: NgForm) {
    console.log(form);
    this.isLoadingResults = true;
    this.api.addDevice(form)
      .subscribe(res => {
          const id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/device-detail', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
