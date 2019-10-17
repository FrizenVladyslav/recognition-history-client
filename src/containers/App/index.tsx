import React from 'react'
import { Switch, Route, Router } from 'react-router'
import { Layout } from 'antd'
import { Header, Footer } from 'components'
import history from 'utils/history'
import Histories from '../Histories'
import History from '../History'
import NewHistory from '../NewHistory'

import styles from './styles.module.scss'

export default function Public(): React.ReactElement {
  return (
    <Router history={history}>
      <Layout className={styles.layout}>
        <Header />
        <Layout.Content className={styles.content}>
          <Switch>
            <Route path="/new-history/:img?" component={NewHistory} />
            <Route path="/:id" component={History} />
            <Route path="/" component={Histories} />
          </Switch>
        </Layout.Content>
        <Footer />
      </Layout>
    </Router>
  )
}
