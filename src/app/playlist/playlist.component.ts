import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeezerService } from '../services/deezer.service';
import { Playlist, Track } from '../services/deezer.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  private params$: Subscription;
  private playlist$: Subscription;
  private tracks$: Subscription;
  /**
   * Playlist id
   */
  public id: string;
  /**
   * Current playlist
   */
  public playlist: Playlist;
  /**
   * list of tracks
   */
  public tracks: Track[];
  /**
   * Total count
   */
  public totalCount: number;
  /**
   * item size
   */
  public itemSize: number = 100;
  /**
   * Height for the virtual scroll
   */
  public scrollHeight: number = 500;
  /**
   * Number of rows
   */
  public rows: number = 20;
  /**
   * Current page
   */
  public page: number = 0;
  /**
   * Injected
   * @param route
   * @param deezerSvc
   */
  constructor(
    private route: ActivatedRoute,
    private deezerSvc: DeezerService
  ) { }
  /**
   * OnInit
   */
  ngOnInit() {
    this.params$ = this.route.params.subscribe(params => this.id = params.id ? params.id : null);
    this.playlist$ = this.deezerSvc.getPlaylist(this.id).subscribe(playlist => this.playlist = playlist);
    this.getData(0, this.rows);
  }
  /**
   * Get Data
   * @param index
   * @param rows
   */
  getData(index: number, rows: number): void {
    this.tracks$ = this.deezerSvc.getTracks(this.id, index, rows).subscribe(res => {
      const data: Track[] = res.data;
      if (!this.tracks && index === 0) {
        this.totalCount = res.total;
        this.tracks = Array.from({length: this.totalCount});
      }
      const arr = [...this.tracks];
      for (let i = index, j = 0; i < (index + rows); i++, j++) {
        if (i >= this.totalCount) {
          break;
        }
        arr[i] = data[j];
      }
      this.tracks = arr;
    });
  }
  /**
   * Event on scroll
   * @param index
   */
  onScrollIndexChange(index: number) {
    const currentPage = Math.floor(index / this.rows);
    if (currentPage !== this.page) {
      this.page = currentPage;
      const currentIdx = this.page * this.rows;
      this.getData(currentIdx, this.rows);
    }
  }
  /**
   * OnDestroy
   */
  ngOnDestroy() {
    this.params$.unsubscribe();
    this.playlist$.unsubscribe();
    this.tracks$.unsubscribe();
  }
}
