export interface ITag {
  confidence: number
  tag: {
    en: string
  }
}

export interface IHistory {
  id: number
  img: string
  tags: ITag[]
  date: Date
}
