import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router'
import { message as antMessage } from 'antd'

interface IProps extends RouteProps {
  allow: boolean
  message?: string
  redirectTo?: string | object
}

const PrivateRoute: React.FC<IProps> = ({ allow, message, redirectTo, ...rest }) => {
  if (!allow) antMessage.warning(message ? message : `You have not access to this page`)

  return allow ? <Route {...rest} /> : <Redirect to={redirectTo ? redirectTo : '/'} />
}

export default PrivateRoute
