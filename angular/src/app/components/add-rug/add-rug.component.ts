import { Component, OnInit } from '@angular/core';
import {RugserviceService} from '../../services/rugservice.service';
import {Router} from '@angular/router';
import { RugClass }    from './rug-class';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-add-rug',
  templateUrl: './add-rug.component.html',
  styleUrls: ['./add-rug.component.css']
})

export class AddRugComponent implements OnInit {
  rugmodel = this.rugservice.rugmodel;
  isformhidden=null;
  filename="";
  get diagnostic() { return JSON.stringify(this.rugmodel); }
  resetrug()
  {
    this.rugservice.resetrug();
  }
  addingRug()
  {
    if(this.rugservice.validateRugForm())
    {
      this.rugservice.onSubmit().subscribe(data => {
      console.log(data);
      this.isformhidden=true;
      this.flashmessage.show('New Rug Added.', { cssClass: 'alert-success', timeout: 5000 });
      this.rugservice.file=undefined;
    });
    }
    else{
      this.flashmessage.show('Enter All the Fields.', { cssClass: 'alert-danger', timeout: 5000 });
    }
  }

  onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.rugservice.file = files[0];
        console.log(this.rugservice.file );
        this.filename=this.rugservice.file.name;
    }
  constructor(private rugservice:RugserviceService,private flashmessage:FlashMessagesService){

  }

  ngOnInit() {
  }

}
