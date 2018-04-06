import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-fullpage',
  templateUrl: './fullpage.component.html',
  styleUrls: ['./fullpage.component.css']
})
export class FullpageComponent implements OnInit, OnDestroy  {


  private sub: any;
  private data: any;
  id:String;
  expressuri="http://localhost:9000/";
  constructor(private router: Router,private route: ActivatedRoute,private http:Http) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
    var valldt='{'+'"rugid":"'+this.id+'"}';

    this.getRug(valldt).subscribe(data=>{
       if(data.success)
         {
          this.data=data.rug;
         }else{

         }
      });

  }
  ngOnDestroy() {
}
editItem(event)
{
  var target = event.target || event.srcElement || event.currentTarget;
  var idAttr = target.attributes.id;
  var target = event.target || event.srcElement || event.currentTarget;
  var idAttr = target.attributes.id;
  this.router.navigate(['/editrug', idAttr.nodeValue]);
}
getRug(data){
let headers=new Headers();
headers.append('Content-Type','application/json');
return this.http.post(this.expressuri+'getrug',data,{headers:headers}).map(res=>res.json());
}

}
