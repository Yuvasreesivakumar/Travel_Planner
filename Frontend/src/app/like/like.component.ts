import { Component, OnInit } from '@angular/core';
import { LikesService } from '../like.service';

@Component({
  selector: 'app-likes',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikesComponent implements OnInit {
  likedItems: any[] = [];

  constructor(private likesService: LikesService) { }

  ngOnInit(): void {
    this.likesService.getLikes().subscribe(items => {
      this.likedItems = items;
    });
  }
}
