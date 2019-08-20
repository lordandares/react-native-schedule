import type { User } from '../../types/schedule.types';

export type CoverageListItemStyle = {
  wrapper: any,
  leftContainer: any,
  avatarContainer: any,
  rightContainer: any,
  nameTextContainer: any,
  payRateTextContainer: any,
  fullNameText: any,
  payRateText: any,
  avatarStyles: any,
};

export type CoverageListItemProps = {
  user: ?User,
  isAssigned: boolean,
  isSelected: boolean,
  styles: CoverageListItemStyle,
};
