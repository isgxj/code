const apiBaseUrl = 'https://api.openai-proxy.com/v1/chat/completions'
const apiKey = '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'

const DEFAULT_SYSTEM_TEMPLATE = `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2021-09
Current model: {{model}}
Current time: {{time}}`

function getDefaultSystem(option: { model: string }) {
  const opts = {
    model: option.model,
    time: new Date().toLocaleString(),
  }
  let output = DEFAULT_SYSTEM_TEMPLATE
  Object.entries(opts).forEach(([name, val]) => {
    output = output.replace(`{{${name}}}`, val)
  })
  return output
}

type OpenAiChatBody = {
  model: string,
  messages: any[],
  temperature?: number,
  top_p?: number,
}

async function requestOpenai(body: OpenAiChatBody) {
  const fetchOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  }
  return await $fetch(apiBaseUrl, fetchOptions)
}

export async function sendRequest(messages: any) {
  const modelConfig = {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
  }
  const msgs = [
    {
      role: 'system',
      content: getDefaultSystem(modelConfig),
    },
    ...messages,
  ].map(item => ({ role: item.role, content: item.content }))
  return requestOpenai({ ...modelConfig, messages: msgs })
}

export function formatSend(messages: any) {
  const modelConfig = {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
  }
  const msgs = [
    {
      role: 'system',
      content: getDefaultSystem(modelConfig),
    },
    ...messages,
  ].map(item => ({ role: item.role, content: item.content }))
  return { ...modelConfig, messages: msgs }
}

export function formatMessage(res: any) {
  return res.choices?.[0]?.message?.content ?? ''
}

// export class chatgptTools {
//   aiBot: ChatGPTAPI;
//   chatItems: any;
//   constructor() {
//     this.aiBot = new ChatGPTAPI({
//       apiBaseUrl: 'http://service-mlb9xgxe-1251208590.usw.apigw.tencentcs.com/release/v1',
//       fetch,
//       apiKey: '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',
//     })
//     this.chatItems = {}
//   }

//   async sendMessage(message: string, talkid: string | number) {
//     if (!this.aiBot) return
//     try {
//       const { conversationId, text, id } = await sendRequest(message, this.chatItems[talkid]);
//       this.chatItems[talkid] = {
//         conversationId,
//         parentMessageId: id,
//       }
//       return text
//     } catch (error) {
//       return '请求失败了，请过一会再试试吧'
//     }
//   }
// }
