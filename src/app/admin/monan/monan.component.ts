import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MonanService } from './monan.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs'
@Component({
  selector: 'admin-monan',
  templateUrl: './monan.component.html',
  styleUrls: ['./monan.component.css']
})
export class MonanComponent implements OnInit {
  @ViewChild('file') file: ElementRef;
  @ViewChild('insertFile') insertFile: ElementRef;

  public data:any=[];
  dlMonan = [];
  dlDanhmuc = [];
  hinh = "";
  insertMonan = {
    tenmon: "",
    iddanhmuc: 0,
    hinh: "",
    dongia: 0
  }
  closeResult: string;
  dlUpdate ;
  idChangePic = -1;
  constructor(private service: MonanService, private router: Router, private modalService: NgbModal) {
  }
  ngOnInit() {
    this.loadData();
  }
  loadData = () =>{
    forkJoin([ 
      this.service.getDataMonan(), 
      this.service.getDataDanhMuc(),
      this.service.getHinh()
    ])
    .subscribe((res: any)=>{
      this.dlMonan = res[0].monan;
      this.dlDanhmuc = res[1].danhmuc;
      this.hinh = res[2].hinh.filter(e => e.tensudung === 'monanmacdinh' )[0].hinhsudung;
    })
  }
  changePic(id){
    this.idChangePic = id;
    this.file.nativeElement.click();
  }
  changeInsertPic(){
    console.log(this.insertFile)
    this.insertFile.nativeElement.click();
  }
  btnUpdateMonan(i){ 
    this.service.postUpdateMonan(this.dlMonan[i]).subscribe( (res: any) => res.result === 1 ? alert('xong'): alert('lỗi') )
  }
  btnDeleteMonan(id, index){
    this.service.postDeleteMonan(id)
    .subscribe(
      (res: any) =>{
        if(res.result === 1)
        this.dlMonan.splice(index, 1);
      }
    )
  }
  onFileChanged(event){
    if (event.target.files.length === 0) return;
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let data = reader.result;
      data = data.slice(data.indexOf(',') + 1);
      this.dlMonan[this.idChangePic].hinh = data;
    };
  }

  onFileInsertChanged(event){
    if (event.target.files.length === 0) return;
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let data = reader.result;
      this.insertMonan.hinh = data;
    };
  }
  btnInsertMonan(insertmonan){
    this.modalService.open(insertmonan).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason);
    });
  }
  saveInsertMoan(){
    console.log(this.insertMonan);
    this.service.postInserMonan(this.insertMonan)
    .subscribe( (res:any) => {
      if(res.result === true){
        this.service.getDataMonan().subscribe(
          (lst: any) =>{
            this.modalService.dismissAll();
            this.dlMonan = lst.monan;
          }
        )
      }
    })
  }
  cancelMonan(){
    this.modalService.dismissAll();
  }
}