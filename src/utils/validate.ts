export function isImage(url: string) {
  return url.match(/(?=.*(jpeg|jpg|svg|png))/) !== null
}
