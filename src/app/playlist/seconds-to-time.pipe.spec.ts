import { SecondsToTimePipe } from './seconds-to-time.pipe';

describe('SecondsToTimePipe', () => {
  const pipe = new SecondsToTimePipe();
  it('providing no value return default value', () => {
    expect(pipe.transform(null)).toBe('00:00:00');
  });
  it('should transform seconds to time', () => {
    expect(pipe.transform(6000)).toBe('01:40:00');
  });
});
