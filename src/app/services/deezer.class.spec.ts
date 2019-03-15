import { Playlist } from './deezer.class';

describe('Playlist', () => {
  it('should create an instance', () => {
    expect(new Playlist(
      0,
      'test',
      'cover',
      null,
      'date',
      0
    )).toBeTruthy();
  });
});
