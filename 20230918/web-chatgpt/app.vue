<script setup lang="ts">
import { nextTick, reactive, ref, onMounted } from 'vue'
import Side from './components/Side.vue'
import List from './components/List.vue'
import Loading from 'vue-loading-overlay'
import 'highlight.js/styles/monokai.css'
import 'vue-loading-overlay/dist/css/index.css'
import './assets/main.css'

const selectIndex = ref(0)

const defaultItem = { items: [] }

const chatList: any = reactive([])

onMounted(() => {
  const listStorage = localStorage.getItem('list')
  const list = listStorage ? JSON.parse(listStorage) : []
  chatList.push(...list)
  if (!chatList.length) {
    chatList.push(defaultItem)
  }
})

function saveStorage() {
  localStorage.setItem('list', JSON.stringify(chatList))
}

function onIndexChange(index: number) {
  if (index === -1) {
    selectIndex.value = selectIndex.value + 1
    chatList.push({ name: '', items: [] })
    saveStorage()
    return
  }
  selectIndex.value = index
}

function onDelChat(index: number) {
  chatList.splice(index, 1)
  if (!chatList.length) {
    chatList.push(defaultItem)
  }
  saveStorage()
}

const inputStr = ref('')
const isLoading = ref(false)

const scrollContainer: any = ref(null)
const scrollToBottom = () => {
  if (scrollContainer.value) {
    const container = scrollContainer.value
    container.scrollTop = container.scrollHeight
  }
}

function pushChat(content: string, isAi = false) {
  chatList[selectIndex.value].items.push({
    role: isAi ? 'assistant' : 'user',
    content,
    time: Date.now(),
    isAi,
  })
  saveStorage()
  nextTick(scrollToBottom)
}

async function submit() {
  if (!inputStr.value) return
  pushChat(inputStr.value)
  inputStr.value = ''
  isLoading.value = true
  const completion = await fetch('/api/chat', {
    method: 'post',
    body: chatList[selectIndex.value].items,
  })
  console.log(completion, 81);
  const reader = completion.body?.getReader();
  if (!reader) return
  const decoder = new TextDecoder('utf-8');
  let generateText = ''
  const read = async () => {
    const { done, value } = await reader.read();
    if (done) {
      console.log("release locked");
      return reader.releaseLock();
    }
    
    const chunk = decoder.decode(value, { stream: true });
    const temp = chunk.replace(/\}/g, '},'); //JSON.parse(JSON.stringify(chunk));
    console.log(temp, 8);
    const jsonData = temp
      .split(',')
      .map((data) => {
        const trimData = data.trim();
        console.log(trimData);
        if (trimData === '') return undefined;
        if (trimData === '{"content":"\n\n"}') return undefined;
        if (trimData === '[DONE]') return undefined;
        return trimData;
      })
      .filter((data) => data);
    
    let textOutput = ''

    for (let i = 0; i < jsonData.length; i++) {
      try {
        const str = jsonData[i] || '{}'
        if (JSON.parse(str).content === '\n\n') {
          textOutput = '';
        } else {
          textOutput = JSON.parse(str).content;
        }
      } catch(e) {
        console.log(e);
      }

      if (textOutput) {
        generateText = generateText + textOutput;
        console.log(generateText);
      }
    }
    return read();
  };
  await read();
  console.log(generateText);
  // pushChat(res, true)
  // isLoading.value = false
}
</script>

<template>
  <div class="app">
    <div class="aside">
      <Side :chatList="chatList" :selectIndex="selectIndex" @indexChange="onIndexChange" @del="onDelChat" />
    </div>

    <div class="main">
      <div class="main__box" :ref="el => scrollContainer = el">
        <List v-if="chatList[selectIndex]" :list="chatList[selectIndex].items" />
      </div>

      <div class="input__wrap" :class="[isLoading && 'disabled']">
        <div class="input__box">
          <textarea class="input" placeholder="Ctrl + Enter 发送" v-model="inputStr" @keyup.ctrl.enter="submit"></textarea>
          <button class="input__btn" @click="submit">发送</button>
        </div>
      </div>
    </div>
    <loading v-model:active="isLoading" />
  </div>
</template>

<style lang="less">
@asideW: 260px;
.app {
  max-width: 1200px;
  margin: 5vh auto;
  display: flex;
  height: 90vh;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.aside {
  width: @asideW;
  height: 100%;
  padding: 1rem 0.5rem;
  background: rgb(32, 33, 35);
  color: #fff;
}

.main {
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main__box {
  flex: 1;
  overflow-y: auto;
}

.input__wrap {
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  .input__box {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .input {
    flex: 1;
    height: 150px;
    outline: none;
    border: 0;
    padding: 1rem;
    padding-right: 100px;
    border: 1px solid rgba(255, 255, 255, 0.192);
    resize: none;
    font-size: inherit;
  }

  .input__btn {
    position: absolute;
    right: 20px;
    bottom: 22px;
    background-color: rgb(29, 147, 171);
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
  }
}
</style>
