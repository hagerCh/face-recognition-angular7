import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { listenToElementOutputs } from '@angular/core/src/view/element';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {
  imgUrl = '../../assets/placeholder.png';
  gender = '';
  age = '';
  emotions = '';
  glasses = '';
  imgNaturalWidth = 0;
  imgNaturalHeight = 0;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  linkPic(link) {
    // setting the pic
    this.imgUrl = link;

    // identifying pic
    const rect: HTMLElement = document.getElementById('rectangle');
    const image: HTMLElement = document.getElementById('img');

    this.api.getData(link).subscribe((data: any) => {
      console.log(data);
      rect.style.top = (data[0].faceRectangle.top * image.clientHeight) / this.imgNaturalHeight + 'px';
      rect.style.left = (data[0].faceRectangle.left * image.clientWidth) / this.imgNaturalWidth + 'px';
      rect.style.width = (data[0].faceRectangle.width * image.clientWidth) / this.imgNaturalWidth + 'px';
      rect.style.height = (data[0].faceRectangle.height * image.clientHeight) / this.imgNaturalHeight + 'px';
      rect.style.visibility = 'visible';
    })
  }

  hoverList() {
    const list: HTMLElement = document.getElementById('list');
    const image: HTMLElement = document.getElementById('img');

    this.api.getData(this.imgUrl).subscribe((data: any) => {
      this.age = data[0].faceAttributes.age;
      this.gender = data[0].faceAttributes.gender;
      this.glasses = data[0].faceAttributes.glasses;
      list.style.top = (data[0].faceRectangle.top * image.clientHeight) / this.imgNaturalHeight + 20 + 'px';
      list.style.left = (data[0].faceRectangle.left * image.clientWidth) / this.imgNaturalWidth - 255 + 'px';
      if (data[0].faceAttributes.smile === 0) {
        this.emotions = 'Neutral';
      } else if (data[0].faceAttributes.smile > 0) {
        this.emotions = 'Happiness';
      } else {
        this.emotions = 'Sad';
      }
    })
    list.style.visibility = 'visible';
  }

  listBye() {
    const list: HTMLElement = document.getElementById('list');
    list.style.visibility = 'hidden';
  }


  imageLoad(event) {
    console.log(event);
    console.log(event.target.naturalWidth);
    console.log(event.target.naturalHeight);
    this.imgNaturalHeight = event.target.naturalHeight;
    this.imgNaturalWidth = event.target.naturalWidth;
  }
}
