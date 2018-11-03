import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public data:any=[];
  constructor(private service: AdminService, private router: Router, private formBuilder: FormBuilder) {
  }
  ngOnInit() {
  }
}