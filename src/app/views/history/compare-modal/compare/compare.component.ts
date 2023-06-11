
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})

export class CompareComponent implements OnInit{
  @Input() title='';
  
  
  
  public show=false;
  
  ngOnInit(): void {}
 
  showModal(){
    this.show=true;
  }
  hideModal(){
    this.show=false;
  }
}