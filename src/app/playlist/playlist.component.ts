import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeezerService } from '../services/deezer.service';
import { Playlist } from '../services/deezer.class';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  params$: Subscription;
  playlist$: Subscription;
  id: string;
  playlist: Playlist;
  constructor(
    private route: ActivatedRoute,
    private deezerSvc: DeezerService
  ) { }

  ngOnInit() {
    this.params$ = this.route.params.subscribe(params => this.id = params.id ? params.id : null);
    this.playlist$ = this.deezerSvc.getPlaylist(this.id).subscribe(data => this.playlist = data)
  }
  ngOnDestroy() {
    this.params$.unsubscribe();
  }
}
