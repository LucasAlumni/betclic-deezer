import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
// Class & Interfaces
import { Playlist, DeezerResponse, Track } from './deezer.class';
/**
 * Deezer Service
 */
@Injectable({
  providedIn: 'root'
})
export class DeezerService {
  /**
   * userURL
   * @type { string }
   */
  private userURL: string = `${environment.api}/user`;
  /**
   * playlistURL
   * @type { string }
   */
  private playlistURL: string = `${environment.api}/playlist`;
  /**
   * Inject HttpClient
   * @param { HttpClient } http
   */
  constructor(private http: HttpClient) { }
  /**
   * getAllPlaylist
   * @param { string } id
   * @return { Observable<Playlist[]> } A observable playlist list
   */
  public getAllPlaylist(id: string): Observable<Playlist[]> {
    return this.http.jsonp<DeezerResponse>(`${this.userURL}/${id}/playlists?output=jsonp`, 'callback').pipe(
      map(res => res.data.map(item => this.mappingPlaylist(item)))
    );
  }
  /**
   * getPlaylist
   * @param { string } id
   * @return { Observable<Playlist> } A observable playlist
   */
  public getPlaylist(id: string): Observable<Playlist> {
    return this.http.jsonp<any>(`${this.playlistURL}/${id}?output=jsonp`, 'callback').pipe(
      map(res => this.mappingPlaylist(res))
    );
  }
  /**
   * getTracks
   * @param { string } id
   * @return { Observable<DeezerResponse> } Return a observable
   */
  public getTracks(id: string, index: number, rows: number): Observable<DeezerResponse> {
    return this.http.jsonp<DeezerResponse>(`${this.playlistURL}/${id}/tracks?index=${index}&limit=${rows}&output=jsonp`, 'callback').pipe(
      map(res => {
        res.data = res.data.map(item => new Track(
          item.id,
          item.title,
          item.artist.name,
          item.duration
        ));
        return res;
      })
    );
  }
  /**
   * mappingPlaylist
   * @param {*} item
   * @return { Playlist } A playlist
   */
  private mappingPlaylist(item): Playlist {
    return new Playlist(
      item.id,
      item.title,
      item.picture_big,
      item.creator,
      item.creation_date,
      item.duration
    );
  }
}
