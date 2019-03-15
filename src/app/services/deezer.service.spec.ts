import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  HttpClientJsonpModule,
  HttpBackend,
  JsonpClientBackend
} from '@angular/common/http';
import { DeezerService } from './deezer.service';
import { Playlist } from './deezer.class';

describe('DeezerService', () => {
  const fakeData: any = {
    id: 5,
    title: 'Pop musicoll',
    duration: 13234,
    picture_big: 'https://api.deezer.com/playlist/5/image',
    creation_date: '2013-11-06 17:00:00',
    creator: {
      id: 5,
      name: 'Daniel Marhely',
      tracklist: 'https://api.deezer.com/user/5/flow',
      type: 'user'
    }
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DeezerService, { provide: JsonpClientBackend, useExisting: HttpBackend }],
    imports: [HttpClientTestingModule]
  }));
  it('should be return observable of Playlist[]', inject(
    [HttpTestingController, DeezerService],
    (httpMock: HttpTestingController, service: DeezerService) => {
      // call the service
      const id: string = '5';
      const url: string = `https://api.deezer.com/user/${id}/playlists?output=jsonp`;
      const json: any = {
        data : [fakeData]
      };
      service.getAllPlaylist(id).subscribe(data => {
        const mock: Playlist[] = json.data.map(item => new Playlist(
          item.id,
          item.title,
          item.picture_big,
          item.creator,
          item.creation_date,
          item.duration
        ));
        expect(data.length).toBe(1);
        expect(data).toEqual(mock);
      });
      const req = httpMock.expectOne(request => request.url === url);
      expect(req.request.method).toBe('JSONP');
      req.flush(json);
      httpMock.verify();
    })
  );
  it('should be return observable of Playlist', inject(
    [HttpTestingController, DeezerService],
    (httpMock: HttpTestingController, service: DeezerService) => {
      const id = fakeData.id;
      const url = `https://api.deezer.com/playlist/${id}?output=jsonp`;
      service.getPlaylist(id).subscribe(data => {
        const mock: Playlist = new Playlist(
          fakeData.id,
          fakeData.title,
          fakeData.picture_big,
          fakeData.creator,
          fakeData.creation_date,
          fakeData.duration
        );
        expect(data).toEqual(mock);
      });
      const req = httpMock.expectOne(request => request.url === url);
      expect(req.request.method).toBe('JSONP');
      req.flush(fakeData);
      httpMock.verify();
    })
  );
});
