import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import {RugserviceService} from '../../services/rugservice.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-editrug',
  templateUrl: './editrug.component.html',
  styleUrls: ['./editrug.component.css']
})
export class EditrugComponent implements OnInit {
  imgsource=""
  real_id=""
  private sub: any;
  private data: any;
  iffilechange=false;
  url: any;
  id:String;
  expressuri="http://localhost:9000/";
  rugmodel = this.rugservice.rugmodel;
  constructor(private route: ActivatedRoute,private http:Http,private rugservice:RugserviceService,private flashmessage:FlashMessagesService) { }
  filename="";
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];

    });
    var valldt='{'+'"rugid":"'+this.id+'"}';

    this.getRug(valldt).subscribe(data=>{
       if(data.success)
         {
          this.data=data.rug;
          this.rugservice.real_id=this.data.id;
          this.rugmodel.name=this.data.name;
          this.rugmodel.design=this.data.design;
          this.rugmodel.pattern=this.data.pattern;
          this.rugmodel.color=this.data.color;
          this.rugmodel.style=this.data.style;
          this.rugmodel.country=this.data.country;
          this.rugmodel.image=this.data.image;
          this.url=this.expressuri+"public/"+this.data.image;

         }else{
         }
      });
  }
  updateRug()
  {
    if(this.rugservice.validateRugFormUpdate())
    {
      if(this.iffilechange){
      this.rugservice.onUpdate().subscribe(data => {

      this.flashmessage.show('Rug Updated successfully.', { cssClass: 'alert-success', timeout: 5000 });
      this.rugservice.file=undefined;
    });
    }
    else//working here now
    {
      this.rugservice.onUpdateNofile().subscribe(data => {

      this.flashmessage.show('Rug Updated successfully.', { cssClass: 'alert-success', timeout: 5000 });
      this.rugservice.file=undefined;
    });

    }
  }
    else{
      this.flashmessage.show('Rug not updated fill all the fields.', { cssClass: 'alert-danger', timeout: 5000 });
    }
  }
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
      this.rugservice.file = event.target.files[0];
        this.iffilechange=true;
    }
  }
  onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.rugservice.file = files[0];
        this.filename=this.rugservice.file.name;

  }
  clickonimage()
  {
    var lele = document.getElementById('image');
    lele.click();
  }
  ngOnDestroy() {
    this.rugservice.resetrug();
  }
  getRug(data){
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post(this.expressuri+'getrug',data,{headers:headers}).map(res=>res.json());
  }
}
