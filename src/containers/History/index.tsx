import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { message, Spin, notification } from 'antd'
import { getHistory } from 'actions/history'
import History from 'components/History'
import { IHistory } from 'models'

const HistoryPage: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const { id } = props.match.params
  const [history, setHistory] = useState<IHistory | null>(null)

  useEffect(() => {
    const hideMessage = message.loading('Loading...')
    ;(async () => {
      try {
        const history = await getHistory(+id)
        setHistory(history)
      } catch (e) {
        notification.error({ message: e.message || e })
        props.history.replace('/')
      } finally {
        hideMessage()
      }
    })()
  }, [props.history, id])

  return (
    <Spin spinning={!history}>{history && <History img={history.img} tags={history.tags} />}</Spin>
  )
}

export default HistoryPage
