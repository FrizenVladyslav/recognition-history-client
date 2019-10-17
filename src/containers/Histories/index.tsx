import React, { Component } from 'react'
import { notification, Empty, message, Icon } from 'antd'
import classNames from 'classnames'
import { getHistories } from 'actions/history'
import { Input } from 'components'
import { IHistory } from 'models'
import History from './History'

import styles from './styles.module.scss'

interface IState {
  loading: boolean
  histories: IHistory[]
  search: string
}

class Histories extends Component<{}, IState> {
  state: IState = {
    loading: true,
    histories: [],
    search: '',
  }

  componentDidMount() {
    this.loadHistories()
  }

  loadHistories = async () => {
    const hideMessage = message.loading('Loading histories list...')
    let histories: IHistory[] = []

    try {
      histories = await getHistories()
    } catch (e) {
      notification.error({ message: e.message || e })
    } finally {
      this.setState({ loading: false, histories }, hideMessage)
    }
  }

  filterHistories = () => {
    const { search, histories } = this.state
    if (search === '') return histories

    return histories.filter(({ tags }) => {
      return tags.some(({ tag: { en } }) => en.indexOf(search.toLowerCase()) !== -1)
    })
  }

  render() {
    const { loading } = this.state
    const histories = this.filterHistories()

    return (
      <section className={classNames('container', styles.histories)}>
        <Input
          className={styles.input}
          placeholder="search by tag"
          prefix={<Icon type="search" />}
          onChange={e => this.setState({ search: e.target.value })}
        />
        <div className={styles.list}>
          {!!histories.length
            ? histories.map(history => <History key={history.id} history={history} />)
            : !loading && <Empty />}
        </div>
      </section>
    )
  }
}

export default Histories
