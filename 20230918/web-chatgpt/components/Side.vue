<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps<{
  selectIndex: number,
  chatList: any[],
}>()

const emit = defineEmits<{
  indexChange: [index: number],
  del: [index: number],
}>()

const editIndex = ref(-1)
const inputElements: any = ref([])
const asideClosed = ref(false)

function onChange(index: number) {
  if (index === props.selectIndex) return
  emit('indexChange', index)
}

function onCreateChat() {
  onChange(-1)
}

function onEdit(index: number) {
  editIndex.value = index
  nextTick(() => {
    inputElements.value[index].focus()
  })
  console.log(inputElements);
}

function onDel(index: number) {
  emit('del', index)
}

function empty() {
}
</script>

<template>
  <div class="side">
    <div class="side__box">
      <div class="d-flex aic">
        <button class="btn flex-1" @click="onCreateChat">新建聊天</button>
        <div class="menu-icon">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
        </div>
      </div>

      <ul class="list">
        <li v-for="(item, index) in chatList" :key="index" class="item" :class="[selectIndex === index && 'on']" @click="onChange(index)">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <div class="flex-1 name">{{ item.name || item.items[0]?.content || '新聊天' }}</div>
          <!-- <button @click.stop="onEdit(index)"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button> -->
          <button class="del" @click.stop="onDel(index)"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
@asideW: 260px;
.side {
  width: @asideW;
  overflow: hidden;
  transition: width .3s;
}
.side__box {
  width: @asideW;
  padding: 1rem 0.5rem;
}
.btn {
  display: block;
  width: 100%;
  text-align: center;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.list {
  padding: 0;
}

.list .item {
  padding: 0.75rem;
  background: rgb(42, 43, 50);
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1em;
  display: flex;
  align-items: center;

  &.on {
    background: rgb(52, 53, 65);
  }

  .name {
    margin: 0 0.5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .del {
    margin-left: 0.5em;
  }
}

.menu-icon {
  height: 54px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-left: 0.5rem;
  border-radius: 6px;
}

@media screen and (max-width: 960px) {
  .side {
    width: 0;
  }
}
</style>
