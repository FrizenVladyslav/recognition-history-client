import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { message, notification } from 'antd'
import { addHistory } from 'actions/history'
import { getInfo } from 'actions/files'
import History from 'components/History'
import { ITag } from 'models'

const CreateHistory: React.FC<RouteComponentProps<{ img: string }>> = props => {
  const img = decodeURIComponent(props.match.params.img)
  const [loading, setLoading] = useState(true)
  const [tags, setTags] = useState<ITag[]>([])

  useEffect(() => {
    ;(async () => {
      const hideMessage = message.loading('Loading image tags...')

      try {
        const tags = await getInfo(img)
        setTags(tags)
        await addHistory({ img, tags })
      } catch (e) {
        notification.error({ message: e.message || e })
        props.history.replace('/new-history')
      } finally {
        hideMessage()
        setLoading(false)
      }
    })()
  }, [img, props.history])

  return (
    <section>
      <History img={img} tags={tags} loading={loading} />
    </section>
  )
}

export default CreateHistory
