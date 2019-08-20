// Sttyles
const styles = theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.unit16,
    paddingStart: theme.spacing.unit16,
    paddingEnd: theme.spacing.unit28,
    minHeight: theme.spacing.unit72,
    backgroundColor: theme.palette.common.white,
    borderLeftColor: theme.palette.common.white,
    borderLeftWidth: 3,
  },
  leftContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textsContainer: {
    flex: 1,
  },
  rightContainer: {
  },
  hoursTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: theme.palette.subTitle.fontSize,
    fontWeight: theme.palette.subTitle.fontWeight,
    color: theme.palette.text.primary,
  },
  locationText: {
    fontSize: theme.palette.subInformation.fontSize,
    color: theme.palette.text.secondary,
  },
  acceptButton: {
    justifyContent: 'center',
    width: 108,
    height: 34,
    backgroundColor: theme.palette.success.main,
    borderRadius: 4,
  },
  acceptButtonText: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
