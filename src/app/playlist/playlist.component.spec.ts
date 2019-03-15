import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getTestScheduler, cold } from 'jasmine-marbles';
import { ActivatedRoute } from '@angular/router';
import { PlaylistComponent } from './playlist.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { of } from 'rxjs';
import { Playlist } from '../services/deezer.class';
import { DeezerService } from '../services/deezer.service';
describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;
  const routeStub = {
    params: of({id: '5'})
  };
  const fakeData: Playlist = {
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
      const q$ = cold('---x|', { x: fakeData });
      return q$;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ PlaylistComponent ],
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

  it('should have playlist id from current route', () => {
    expect(component.id).toBe('5');
  });

  it('should have a playlist', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component.playlist).toEqual(fakeData);
  });
});
