import type { AppBarButton } from './navigation.types';
import IconLoader from '../utils/IconLoader';
import theme from '../theme';

export function getAppBarButton(id: string, name: string, iconName: string): AppBarButton {
  const iconLoader = new IconLoader();
  return {
    id,
    name,
    icon: iconLoader.getIcon(iconName),
    color: theme.palette.common.white,
  };
}
