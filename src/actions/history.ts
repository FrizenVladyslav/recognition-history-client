import { api } from 'config'
import { IHistory } from 'models'

const endpoint = 'histories'

export async function getHistory(id: number): Promise<IHistory> {
  const res = await api(`${endpoint}/${id}`)
  if (res.status !== 200) throw new Error('Hostory not recieved')
  return res.data
}

export async function getHistories(): Promise<IHistory[]> {
  const res = await api.get(`${endpoint}?sort=date,DESC`)
  if (res.status !== 200) throw new Error('Histories not recieved')
  return res.data
}

export async function addHistory(history: Partial<IHistory>): Promise<void> {
  const res = await api.post(endpoint, history)
  if (res.status !== 201) throw new Error('History not created')
}
