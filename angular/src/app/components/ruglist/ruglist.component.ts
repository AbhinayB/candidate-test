import { Component, OnInit } from '@angular/core';
import {RugserviceService} from '../../services/rugservice.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-ruglist',
  templateUrl: './ruglist.component.html',
  styleUrls: ['./ruglist.component.css']
})
export class RuglistComponent implements OnInit {

  rugitems=""
  rugselected=""
  rugtoEdit={"rugid":" "};
  expressuri="http://localhost:9000";
  constructor(private router: Router,private rugservice:RugserviceService,private flashmessage:FlashMessagesService,private http:Http){


  }
  fullpage(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    this.rugtoEdit.rugid=idAttr;
    //var valldt='{'+'"rugid":"'+idAttr.nodeValue+'"}';
    this.router.navigate(['/fullpage', idAttr.nodeValue]);

  }
  deleteItem(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    this.rugtoEdit.rugid=idAttr;
    var delid=idAttr.nodeValue;

    this.deleteRug(delid).subscribe(data=>{
       if(data.success)
         {
            
            var ele=document.getElementById(data.rug.id);
            ele.parentNode.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode.parentNode);
            this.flashmessage.show('Rug successfully Deleted.', { cssClass: 'alert-success', timeout: 2000 });
         }else{
          this.flashmessage.show('Unable to delete rug. Try again..', { cssClass: 'alert-danger', timeout: 5000 });
         }
      });
  }
  editItem(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    this.rugtoEdit.rugid=idAttr;
    //var valldt='{'+'"rugid":"'+idAttr.nodeValue+'"}';
    this.router.navigate(['/editrug', idAttr.nodeValue]);
  }
  ngOnInit() {
    this.getRugData().subscribe(data=>{
       if(data.success)
         {
            this.rugitems=data.rugs_data;
         }else{

         }
      });
  }
  deleteRug(delid){
  const params = new HttpParams().set('rugid', delid);
  return this.http.delete(this.expressuri+'/deleterug/'+delid,params).map(res=>res.json());
  }
  getRug(data){
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post(this.expressuri+'/getrug',data,{headers:headers}).map(res=>res.json());
  }
  getRugData(){
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post(this.expressuri+'/getrugs',null,{headers:headers}).map(res=>res.json());
  }
}
