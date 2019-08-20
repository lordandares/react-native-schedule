import IconLoader from './IconLoader';
import CustomIcon from '../customIcons/NextIcons';

jest.mock('../customIcons/NextIcons');
CustomIcon.getImageSource.mockImplementation(name => new Promise(resolve => resolve(name)));

describe('IconLoader', () => {
  it('should getCalendarIcon throw error when iconLoader list is empty', () => {
    const iconLoader = new IconLoader();

    expect(iconLoader.getCalendarIcon).toThrowError(Error, 'error: icon list is not loaded');
  });

  it('should getCalendarIcon throw error when iconLoader list is loaded and the day is < 0', async () => {
    const iconLoader = new IconLoader();
    await iconLoader.loadImageIcons();
    expect(iconLoader.getCalendarIcon.bind(IconLoader, 0)).toThrowError(
      Error,
      'error: day has to be > 0 and < 31',
    );
  });

  it('should getCalendarIcon should return calendar-1 when day 1', async () => {
    const iconLoader = new IconLoader();
    await iconLoader.loadImageIcons();
    expect(iconLoader.getCalendarIcon(1)).toBe('calendar-1');
  });

  it('should getIcon thorow errro when iconLoader list is loaded and icorrecte name icon', async () => {
    const iconLoader = new IconLoader();
    await iconLoader.loadImageIcons();
    expect(iconLoader.getIcon.bind(IconLoader, 'wrong-name')).toThrowError(
      Error,
      'error: icon name "wrong-name" not found',
    );
  });

  it('should getIcon return "dashboard" when we call getIcon with name "dashboard"', async () => {
    const iconLoader = new IconLoader();
    await iconLoader.loadImageIcons();
    expect(iconLoader.getIcon('dashboard')).toBe('dashboard');
  });
});
