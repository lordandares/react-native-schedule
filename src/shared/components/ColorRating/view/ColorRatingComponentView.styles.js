import { Dimensions } from 'react-native';

const Radius = Dimensions.get('window').width / 9;

const ratingBorder = {
  width: Radius,
  height: Radius,
  resizeMode: 'cover',
  borderRadius: Radius,
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 3,
};

export const colorRatingComponentViewStyles = () => ({
  container: {
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ratingBorderFilled: ratingBorder,
  ratingBorderUnfilled: ratingBorder,
});
