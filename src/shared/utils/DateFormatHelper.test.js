import { formatToShortDate, formatToLongDate } from './DateFormatHelper';

const dateFormats = {
  DMY: 'DD/MM/YYYY',
  MDY: 'MM/DD/YYYY',
  YMD: 'YYYY/MM/DD',
};

const convertedShortFormats = {
  DMY: 'D MMM',
  MDY: 'MMM D',
  YMD: 'MMM D',
};

const convertedLongFormats = {
  DMY: 'D MMM YYYY',
  MDY: 'MMM D YYYY',
  YMD: 'YYYY MMM D',
};

describe('DateFormatHelpers', () => {
  describe('formatToShortDate', () => {
    it('should convert DD/MM/YYYY to D MMM', () => {
      const result = formatToShortDate(dateFormats.DMY);
      expect(result).toBe(convertedShortFormats.DMY);
    });

    it('should convert MM/DD/YYYY to MMM D', () => {
      const result = formatToShortDate(dateFormats.MDY);
      expect(result).toBe(convertedShortFormats.MDY);
    });

    it('should convert YYYY/MM/DD to MMM D', () => {
      const result = formatToShortDate(dateFormats.YMD);
      expect(result).toBe(convertedShortFormats.YMD);
    });
  });

  describe('formatToLongDate', () => {
    it('should convert DD/MM/YYYY to D MMM YYYY', () => {
      const result = formatToLongDate(dateFormats.DMY);
      expect(result).toBe(convertedLongFormats.DMY);
    });

    it('should convert MM/DD/YYYY to MMM D YYYY', () => {
      const result = formatToLongDate(dateFormats.MDY);
      expect(result).toBe(convertedLongFormats.MDY);
    });

    it('should convert YYYY/MM/DD to YYYY MMM D', () => {
      const result = formatToLongDate(dateFormats.YMD);
      expect(result).toBe(convertedLongFormats.YMD);
    });
  });
});
