import { type FileSuffix } from './types'

export const genNameTimeStamp = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const date = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}${month}${date}_${hours}${minutes}${seconds}`
}

interface DownloadConfig {
  suffix?: FileSuffix
  fileNameTimestamp: boolean
}

export const downloadFileByStream = (
  stream: BlobPart,
  name = 'file',
  config: DownloadConfig = { suffix: 'xls', fileNameTimestamp: true }
) => {
  const { suffix, fileNameTimestamp } = config
  const blob = new Blob([stream], { type: 'application/vnd.ms-excel' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}${fileNameTimestamp ? genNameTimeStamp() : ''}.${suffix}`

  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  URL.revokeObjectURL(url)
}
