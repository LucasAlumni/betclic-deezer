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
  public playlists$: Observable<Playlist[]>;
  /**
   * Inject
   * @param deezerSvc
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
   * @name goPlaylist
   * @param id: playlist
   * @desc Link to go playlist
   */
  public goPlaylist(id: number) {
    this.router.navigate(['playlist', id]);
  }
}
