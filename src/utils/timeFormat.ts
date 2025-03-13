/**
 * Convert a timestamp to a human-readable date and time.
 * @param timestamp - The timestamp in milliseconds.
 * @param options - Optional formatting options.
 * @param options.locale - The locale to use (default: 'en-US').
 * @param options.format - The format to use ('date', 'time', 'datetime', or 'custom').
 * @param options.customFormat - Custom formatting options for Intl.DateTimeFormat.
 * @returns A human-readable date and/or time string.
 */
function timestampToReadable(
    timestamp: string,
    options: {
      locale?: string;
      format?: 'date' | 'time' | 'datetime' | 'custom';
      customFormat?: Intl.DateTimeFormatOptions;
    } = {}
  ): string {
    const { locale = 'en-US', format = 'datetime', customFormat } = options;
    const date = new Date(parseInt(timestamp));
  
    switch (format) {
      case 'date':
        return date.toLocaleDateString(locale);
      case 'time':
        return date.toLocaleTimeString(locale);
      case 'datetime':
        return date.toLocaleString(locale);
      case 'custom':
        return new Intl.DateTimeFormat(locale, customFormat).format(date);
      default:
        throw new Error('Invalid format specified. Use "date", "time", "datetime", or "custom".');
    }
  }
  export  default timestampToReadable;