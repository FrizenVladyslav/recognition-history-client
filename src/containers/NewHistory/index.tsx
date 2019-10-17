import React, { Component } from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router'
import { Steps, message, notification } from 'antd'
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface'
import * as filesActions from 'actions/files'
import PrivateRoute from 'components/PrivateRoute'
import { isImage } from 'utils/validate'
import CreateHistory from './CreateHistory'
import UploadImage from './UploadImage'

import styles from './styles.module.scss'

export interface IState {
  allow: boolean
  loading: boolean
  error: string
  imgUrl?: string
  file?: UploadFile
}

const path = '/new-history'

class History extends Component<RouteComponentProps<{ img?: string }>, IState> {
  state: IState = {
    allow: false,
    loading: false,
    error: '',
    imgUrl: undefined,
  }

  get allow() {
    return this.state.allow || isImage(String(this.props.match.params.img))
  }

  get step() {
    return this.props.location.pathname === path ? 0 : 1
  }

  changeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState<never>({ [name]: value, error: '' })
  }

  handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()
    const { imgUrl } = this.state
    if (!imgUrl || !isImage(imgUrl)) return this.setState({ error: 'No valid image URL' })

    this.setState({ allow: true }, () =>
      this.props.history.push(`${path}/${encodeURIComponent(imgUrl)}`)
    )
  }

  uploadImage = async ({ file }: UploadChangeParam<UploadFile>) => {
    if (file.status === 'removed') return this.setState({ imgUrl: undefined, file: undefined })
    if (!file.originFileObj) return

    this.setState({ loading: true })
    const { loading, imgUrl } = this.state
    const hideMessage = !loading && message.loading('Image uploading...')
    const newState = { loading: false, imgUrl, file }

    try {
      const imageName = await filesActions.uploadImage(file.originFileObj)
      newState.imgUrl = await filesActions.getImage(imageName)
    } catch (e) {
      notification.error({ message: e.message || e })
    } finally {
      this.setState(newState, () => !!hideMessage && hideMessage())
    }
  }

  render(): JSX.Element {
    const { imgUrl, error, file } = this.state

    return (
      <section className="container">
        <Steps current={this.step} className={styles.steps}>
          <Steps.Step title="Upload" description="Select a image." />
          <Steps.Step title="Tags" description="View information." />
        </Steps>
        <Switch>
          <PrivateRoute
            allow={this.allow}
            message="Please upload image"
            path={`${path}/:img`}
            redirectTo={path}
            component={CreateHistory}
          />
          <Route
            path={path}
            render={() => (
              <UploadImage
                imgUrl={imgUrl}
                error={error}
                onChange={this.changeField}
                onSubmit={this.handleSubmit}
                onUpload={this.uploadImage}
                file={file}
              />
            )}
          />
        </Switch>
      </section>
    )
  }
}

export default History
