import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { RugClass }    from '../components/add-rug/rug-class';
@Injectable()
export class RugserviceService {
  file: File;
  constructor(private http:Http) {
  }
  issubmitted = false;
  rugmodel = new RugClass("","","","","","","");

  resetrug() {
    this.rugmodel = new RugClass("","","","","","","");
  }
  validateRugForm()
  {
    if(this.rugmodel.name==undefined||this.rugmodel.design==undefined||this.rugmodel.pattern==undefined||this.rugmodel.color==undefined||this.rugmodel.style==undefined||this.rugmodel.country==undefined||this.file==undefined)
    {
      console.log("1");
      return false;
    }
    else if(this.rugmodel.name==""||this.rugmodel.design==""||this.rugmodel.pattern==""||this.rugmodel.color==""||this.rugmodel.style==""||this.rugmodel.country=="")
    {
      console.log("2");
      console.log(this.rugmodel);
      return false;
    }
    return true;
  }
  onSubmit() {
     this.issubmitted = true;
     const headers = new Headers({});
   let options = new RequestOptions({ headers });

     const fd = new FormData();

     fd.append('name', this.rugmodel.name);
     fd.append('design', this.rugmodel.design);
     fd.append('pattern', this.rugmodel.pattern);
     fd.append('color', this.rugmodel.color);
     fd.append('style', this.rugmodel.style);
     fd.append('country', this.rugmodel.country);
     fd.append('file', this.file);
     //console.log(this.rugmodel.name);
     return this.http.post('http://localhost:9000/addrug',fd,options);
  }

}
