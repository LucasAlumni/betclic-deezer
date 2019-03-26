import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeezerService } from '../services/deezer.service';
import { Playlist } from '../services/deezer.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   * list of playlist
   * @type { Observable<Playlist[]> }
   */
  public playlists$: Observable<Playlist[]>;
  /**
   * Dependencies
   * @param { Router } router
   * @param { DeezerService } deezerSvc
   */
  constructor(
    private router: Router,
    private deezerSvc: DeezerService
  ) { }
  /**
   * OnInit
   */
  ngOnInit() {
    this.playlists$ = this.deezerSvc.getAllPlaylist('5');
  }
  /**
   * goPlaylist()
   *
   * Go to the playlist
   * @param { string } id playlist id
   */
  public goPlaylist(id: number) {
    this.router.navigate(['playlist', id]);
  }
}
