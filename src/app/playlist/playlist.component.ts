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
  private params$: Subscription;
  private playlist$: Subscription;
  private tracks$: Subscription;
  public id: string;
  public playlist: Playlist;
  public tracks: any[] = null;
  public totalCount: number;
  public itemSize: number = 100;
  public scrollHeight: number = 500;
  public rows: number = 20;
  public page: number = 0;
  constructor(
    private route: ActivatedRoute,
    private deezerSvc: DeezerService
  ) { }

  ngOnInit() {
    this.params$ = this.route.params.subscribe(params => this.id = params.id ? params.id : null);
    this.playlist$ = this.deezerSvc.getPlaylist(this.id).subscribe(playlist => this.playlist = playlist);
    this.getData(0, this.rows);
  }
  getData(index: number, rows: number): void {
    this.tracks$ = this.deezerSvc.getTracks(this.id, index, rows).subscribe(res => {
      const data = res.data;
      if (!this.tracks && index === 0) {
        this.totalCount = res.total;
        this.tracks = Array.from({length: this.totalCount});
      }
      let arr = [...this.tracks];
      for (let i = index, j = 0; i < (index + rows); i++, j++) {
        arr[i] = data[j];
      }
      this.tracks = arr;
    });
  }
  onScrollIndexChange(index: number) {
    const currentPage = Math.floor(index / this.rows);
    if (currentPage !== this.page) {
      this.page = currentPage;
      const currentIdx = this.page * this.rows;
      this.getData(currentIdx, this.rows);
    }
  }
  ngOnDestroy() {
    this.params$.unsubscribe();
    this.playlist$.unsubscribe();
    this.tracks$.unsubscribe();
  }
}
