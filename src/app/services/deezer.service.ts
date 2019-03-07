import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
// Class & Interfaces
import { Playlist } from './deezer.class';
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
    return this.http.jsonp<any>(`${this.userURL}/${id}/playlists?output=jsonp`, 'callback').pipe(
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
  public getTracks(id: string): Observable<any[]> {
    return this.http.jsonp<any>(`${this.playlistURL}/${id}/tracks?output=jsonp`, 'callback').pipe(
      map(res => res.data)
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
