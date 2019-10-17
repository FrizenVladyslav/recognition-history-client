import React from 'react'
import { Upload, Icon, Divider, Form, Button } from 'antd'
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface'
import Input from 'components/Input'
import { IState as RootState } from '../'

import styles from './styles.module.scss'

interface IProps extends Pick<RootState, 'imgUrl' | 'error'> {
  file?: UploadFile
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>
  ) => void
  onUpload: (info: UploadChangeParam<UploadFile>) => void
}

const UploadImage: React.FC<IProps> = ({ file, imgUrl, error, onUpload, onSubmit, onChange }) => {
  return (
    <Form className={styles.form} onSubmit={onSubmit}>
      <h2>Upload your image</h2>
      <p>You can upload a image or paste a URL of an image</p>
      <Input
        label="Image URL"
        name="imgUrl"
        placeholder="Enter Image URL"
        error={error}
        value={imgUrl}
        onChange={onChange}
      />
      <Divider />
      <Upload.Dragger
        accept=".jpg, .jpeg, .png, .svg"
        className={styles.uploader}
        name="image"
        onChange={onUpload}
        listType="picture"
        fileList={!!file ? [file] : []}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="file-image" />
        </p>
        <p className="ant-upload-text">Click or drag image to this area to upload</p>
      </Upload.Dragger>
      <Button disabled={!imgUrl} type="primary" shape="round" size="large" onClick={onSubmit}>
        Next
      </Button>
    </Form>
  )
}

export default UploadImage
