<template>
  <div class="markdown" v-html="renderedMarkdown"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import MarkdownItHighlightjs from 'markdown-it-highlightjs'

const props = defineProps<{
  html: string
}>()

const md: MarkdownIt = new MarkdownIt({})
  .use(MarkdownItHighlightjs, { inline: true })

const renderedMarkdown = computed(() => {
  return md.render(props.html)
})
</script>

<style>
.markdown {
  line-height: 1.75;
}

.markdown p,
.markdown ol,
.markdown ul
{
  margin-bottom: 1.25em;
  margin-top: 1.25em;
}

.markdown > *:first-child {
  margin-top: 0;
}

.markdown > *:last-child {
  margin-bottom: 0;
}
</style>