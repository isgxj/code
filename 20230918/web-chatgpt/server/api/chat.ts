import { formatSend } from '../../utils/chatgpt'
import { OpenAI } from 'openai-streams'
import { sendStream } from 'h3'

const apiBaseUrl = 'https://api.openai-proxy.com/v1'
const apiKey = process.env.NUXT_OPENAI_API_KEY

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const stream = await OpenAI(
    'chat',
    {
      ...formatSend(body),
      stream: true,
    },
    { apiKey, apiBase: apiBaseUrl },
  )
  return sendStream(event, stream)
})