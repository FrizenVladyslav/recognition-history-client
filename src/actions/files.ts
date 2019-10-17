import axios from 'axios'
import { imagga, host } from 'config'
import { ITag } from 'models'

const endpoint = 'files/'

export function getImage(fileName: string): string {
  return `${host}${endpoint}${fileName}`
}

export async function uploadImage(file: File | Blob): Promise<string> {
  const data = new FormData()
  data.append('image', file)

  const res = await axios({
    method: 'post',
    url: `${host}${endpoint}`,
    data,
    headers: { 'content-type': `multipart/form-data;` },
    validateStatus: () => true,
  })
  if (res.status !== 201) throw new Error('Image not uploaded')
  return res.data
}

export async function getInfo(url: string): Promise<ITag[]> {
  const res = await imagga.get('/tags', {
    params: {
      [`image_url`]: url,
      limit: 5,
    },
  })
  if (res.status !== 200) throw new Error('Image information not received')
  return res.data.result.tags
}
