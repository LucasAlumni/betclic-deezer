import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  map
} from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Playlist } from './deezer.class';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {
  /**
   * @name userURL
   */
  private userURL: string = `${environment.api}/user`;
  /**
   * @name playlistURL
   */
  private playlistURL: string = `${environment.api}/playlist`;
  /**
   * Inject HttpClient
   * @param http
   */
  constructor(private http: HttpClient) { }

  getAllPlaylist(id: string): Observable<Playlist[]> {
    return this.http.jsonp<any>(`${this.userURL}/${id}/playlists?output=jsonp`, 'callback').pipe(
      map(res => {
        return res.data.map(item => new Playlist(
          item.id,
          item.title,
          item.picture_big,
          item.creator,
          item.creation_date,
          item.duration
        ));
      })
    )
  }
  getPlaylist(id: string) {
    return this.http.get(`${this.playlistURL}/${id}`);
  }
  getTracks(id: string) {
    return this.http.get(`${this.playlistURL}/${id}/tracks`);
  }
}
