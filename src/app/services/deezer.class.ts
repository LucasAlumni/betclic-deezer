interface Author {
  id: number;
  name: string;
  tracklist: string;
  type: string;
}
export class Playlist {
  constructor(
    public id: number,
    public title: string,
    public cover: string,
    public author: Author,
    public date: string,
    public duration: number
  ) {}
}
