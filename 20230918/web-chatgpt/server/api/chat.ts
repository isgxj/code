import { formatSend } from '../../utils/chatgpt'
import { OpenAI } from 'openai-streams'
import { sendStream } from 'h3'

const apiKey = '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'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const stream = await OpenAI(
    'chat',
    {
      ...formatSend(body),
      stream: true
    },
    { apiKey },
  );
  return sendStream(event, stream)
})