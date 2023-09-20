import { sendRequest, formatMessage } from '../../utils/chatgpt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return formatMessage(await sendRequest(body))
})