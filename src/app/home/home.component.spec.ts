import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestScheduler, cold } from 'jasmine-marbles';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { DeezerService } from '../services/deezer.service';
import { Playlist } from '../services/deezer.class';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
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
    getAllPlaylist() {
      const q$ = cold('---x|', { x: [fakeData] });
      return q$;
    }
  };
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ HomeComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: DeezerService, useValue: deezerSvcStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be return array of Playlist on init', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    const playlists = component.playlists;
    expect(playlists.length).toBe(1);
    expect(playlists[0]).toEqual(fakeData);
  });

  it('should click link', () => {
    const id = 5;
    component.goPlaylist(id);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['playlist', id]);
  });

  it('should unsubscribe on destroy', () => {
    component['subscription$'] = of(true).subscribe();
    component.ngOnDestroy();
    expect(component['subscription$'].closed).toBeTruthy();
  });
});
