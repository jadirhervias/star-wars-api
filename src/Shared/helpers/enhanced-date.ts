import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';

dayjs().format();
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export default class EnhancedDate extends Date {
  constructor(value: number | string | Date) {
    super(value);
  }

  static from(value: number | string | Date): EnhancedDate {
    return new EnhancedDate(value);
  }

  // Current date with an specific tz
  static nowTz(timezone: string): string {
    return dayjs().tz(timezone).format();
  }

  static get NOW(): string {
    return dayjs.utc().toISOString();
  }
}
