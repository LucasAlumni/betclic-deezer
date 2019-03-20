import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
// Material
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
// Component & Pipe
import { PlaylistComponent } from './playlist.component';
import { SecondsToTimePipe } from './seconds-to-time.pipe';
// RxJS
import { getTestScheduler, cold } from 'jasmine-marbles';
import { of } from 'rxjs';
//Services
import { Playlist } from '../services/deezer.class';
import { DeezerService } from '../services/deezer.service';
/**
 * PlaylistComponent SPEC
 */
describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;
  const routeStub = {
    params: of({id: '5'})
  };
  const fakePlaylist: Playlist = {
    id: 5,
    title: 'Pop musicoll',
    duration: 13234,
    cover: 'https://api.deezer.com/playlist/5/image',
    date: '2013-11-06 17:00:00',
    author: {
      id: 5,
      name: 'Daniel Marhely',
      tracklist: 'https://api.deezer.com/user/5/flow',
      type: 'user'
    }
  };
  const deezerSvcStub = {
    getPlaylist() {
      const q$ = cold('---x|', { x: fakePlaylist });
      return q$;
    },
    getTracks() {
      const q$ = cold('---x|', { x: {
        data: [],
        total: 70
      } });
      return q$;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        MatCardModule,
        ScrollingModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ PlaylistComponent, SecondsToTimePipe ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: DeezerService, useValue: deezerSvcStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a id in current route', () => {
    expect(component.id).toBe('5');
  });

  it('should have a playlist', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component.playlist).toEqual(fakePlaylist);
  });

  it('should have a total count equal tracks arr length', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component.totalCount).toBe(70);
    expect(component.tracks.length).toEqual(component.totalCount);
  });
});
