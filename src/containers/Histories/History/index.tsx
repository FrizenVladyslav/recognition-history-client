import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Card, Tag } from 'antd'
import { IHistory } from 'models'

import styles from './styles.module.scss'

function getTagColor(percent: number) {
  switch (true) {
    case percent > 89:
      return 'green'
    case percent > 49:
      return 'cyan'
    default:
      return 'red'
  }
}

const History: React.FC<{ history: IHistory }> = ({ history }) => {
  return (
    <Link to={`/${history.id}`}>
      <Card className={styles.card} cover={<img alt="example" src={history.img} />}>
        <Card.Meta
          className={styles.meta}
          title={moment(history.date).format('MMMM Do YYYY, h:mm:ss a')}
          description={history.tags.map(({ tag: { en }, confidence }) => (
            <Tag key={en} color={getTagColor(confidence)}>
              {en}
            </Tag>
          ))}
        />
      </Card>
    </Link>
  )
}

export default History
