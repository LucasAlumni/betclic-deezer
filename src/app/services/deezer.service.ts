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
  /**
   * @name getAllPlaylist
   * @param id
   */
  public getAllPlaylist(id: string): Observable<Playlist[]> {
    return this.http.jsonp<DeezerResponse>(`${this.userURL}/${id}/playlists?output=jsonp`, 'callback').pipe(
      map(res => res.data.map(item => this.mappingPlaylist(item)))
    );
  }
  /**
   * @name getPlaylist
   * @param id
   */
  public getPlaylist(id: string): Observable<Playlist> {
    return this.http.jsonp<any>(`${this.playlistURL}/${id}?output=jsonp`, 'callback').pipe(
      map(res => this.mappingPlaylist(res))
    );
  }
  /**
   * @name getTracks
   * @param id
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
   * @name mappingPlaylist
   * @param item
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
