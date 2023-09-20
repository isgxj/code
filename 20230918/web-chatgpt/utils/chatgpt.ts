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

