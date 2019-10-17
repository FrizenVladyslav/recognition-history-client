import React from 'react'
import { Form, Input as AntInput } from 'antd'
import { InputProps } from 'antd/lib/input'

interface IProps extends InputProps {
  error?: boolean | string
  label?: React.ReactNode
}

const Input: React.FC<IProps> = ({ error, label, ...rest }) => {
  return (
    <Form.Item label={label} validateStatus={!!error ? 'error' : ''} help={error}>
      <AntInput {...rest} />
    </Form.Item>
  )
}

export default Input
