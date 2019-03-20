import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (!value) {
      return '00:00:00';
    }
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    const seconds: number = Math.floor(value % 60);

    return `${this.zero(hours)}:${this.zero(minutes)}:${this.zero(seconds)}`;
  }
  private zero(val: number): number | string {
    return val < 10 ? `0${val}` : val;
  }
}
