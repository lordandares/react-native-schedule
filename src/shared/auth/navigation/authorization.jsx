import React from 'react';

import { AuthorizationProps } from './authorization.type';

const authorization = (WrappedComponent, allowedRoles) => (props: AuthorizationProps) => {
  if (allowedRoles.includes(props.role)) {
    return <WrappedComponent {...props} />;
  }
  return <h1>You are not authorized to see this page!</h1>;
};

export default authorization;
