import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Button } from 'antd'

import styles from './styles.module.scss'

const Header: React.FC = () => {
  return (
    <Layout.Header className={styles.header}>
      <Link to="/">
        <Icon type="file-image" /> Images recognition history
      </Link>
      <Link to="/new-history">
        <Button type="primary" icon="info-circle">
          Get image info
        </Button>
      </Link>
    </Layout.Header>
  )
}

export default Header
