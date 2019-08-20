export default ({ auth, user }): string =>
  ((auth.user && user.value) ? `${user.value.firstName} ${user.value.lastName}` : '');
