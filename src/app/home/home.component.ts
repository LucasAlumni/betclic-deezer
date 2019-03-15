import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DeezerService } from '../services/deezer.service';
import { Playlist } from '../services/deezer.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription$: Subscription;
  public playlists: Playlist[];
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
    this.subscription$ = this.deezerSvc.getAllPlaylist('5')
      .subscribe(playlists => this.playlists = playlists);
  }
  /**
   * @name goPlaylist
   * @param id: playlist
   * @desc Link to go playlist
   */
  goPlaylist(id: number) {
    this.router.navigate(['playlist', id]);
  }
  /**
   * OnDestroy
   */
  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
