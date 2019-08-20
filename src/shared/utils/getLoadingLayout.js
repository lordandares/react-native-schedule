import { SCREEN_LOADING } from '../constants/screens';

export default id => ({
  id,
  component: {
    id,
    name: SCREEN_LOADING,
    options: {
      overlay: {
        interceptTouchOutside: false,
      },
    },
  },
});
