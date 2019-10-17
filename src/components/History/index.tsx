import React from 'react'
import { Col, Row, Progress, Spin, Button, Icon } from 'antd'
import { IHistory } from 'models'

import styles from './styles.module.scss'

interface IProps extends Pick<IHistory, 'img' | 'tags'> {
  loading?: boolean
}

const History: React.FC<IProps> = ({ img, tags, loading }) => {
  return (
    <section>
      <Row gutter={30} type="flex" justify="center">
        <Col sm={8} className={styles.image}>
          <img src={img} alt="history" />
        </Col>
        <Col sm={7}>
          <Spin spinning={loading === true}>
            {tags.map(({ confidence, tag: { en } }) => (
              <Progress key={en} percent={confidence} format={() => en} />
            ))}
          </Spin>
        </Col>
      </Row>
      <Button.Group className={styles.btnGroup}>
        <Button type="link" href="/">
          <Icon type="left" />
          Back to histories list
        </Button>
        <Button type="link" href="/new-history">
          Get image info
          <Icon type="plus" />
        </Button>
      </Button.Group>
    </section>
  )
}

export default History
