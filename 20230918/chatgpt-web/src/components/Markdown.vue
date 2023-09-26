<template>
  <div class="markdown" v-html="renderedMarkdown"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-coffeescript'
import 'prismjs/components/prism-git'
// import 'prismjs/components/prism-php'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-mongodb'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-json5'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-r'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-regex'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-vim'
import 'prismjs/components/prism-javaScript'
// import MarkdownItHighlightjs from 'markdown-it-highlightjs/core'
// import hljs from 'highlight.js/lib/core'
// import htmlLang from 'highlight.js/lib/languages/xml'
// import javascript from 'highlight.js/lib/languages/javascript'
// import typescriptLang from 'highlight.js/lib/languages/typescript'
// import coffeescriptLang from 'highlight.js/lib/languages/coffeescript'
// import cssLang from 'highlight.js/lib/languages/css'
// import scssLang from 'highlight.js/lib/languages/scss'
// import lessLang from 'highlight.js/lib/languages/less'
// import markdownLang from 'highlight.js/lib/languages/markdown'
// import plaintextLang from 'highlight.js/lib/languages/plaintext'
// import cLang from 'highlight.js/lib/languages/c'
// import csharpLang from 'highlight.js/lib/languages/csharp'
// import cppLang from 'highlight.js/lib/languages/cpp'
// import phpLang from 'highlight.js/lib/languages/php'
// import nginxLang from 'highlight.js/lib/languages/nginx'
// import sqlLang from 'highlight.js/lib/languages/sql'
// import jsonLang from 'highlight.js/lib/languages/json'
// import javaLang from 'highlight.js/lib/languages/java'
// import goLang from 'highlight.js/lib/languages/go'
// import pythonLang from 'highlight.js/lib/languages/python'
// import rLang from 'highlight.js/lib/languages/r'
// import rustLang from 'highlight.js/lib/languages/rust'
// import vimLang from 'highlight.js/lib/languages/vim'
// hljs.registerLanguage('typescript', typescriptLang)
// hljs.registerLanguage('html', htmlLang)
// hljs.registerLanguage('javascript', javascript)
// hljs.registerLanguage('coffeescript', coffeescriptLang)
// hljs.registerLanguage('css', cssLang)
// hljs.registerLanguage('scss', scssLang)
// hljs.registerLanguage('markdown', markdownLang)
// hljs.registerLanguage('plaintext', plaintextLang)
// hljs.registerLanguage('less', lessLang)
// hljs.registerLanguage('c', cLang)
// hljs.registerLanguage('csharp', csharpLang)
// hljs.registerLanguage('cpp', cppLang)
// hljs.registerLanguage('php', phpLang)
// hljs.registerLanguage('nginx', nginxLang)
// hljs.registerLanguage('sql', sqlLang)
// hljs.registerLanguage('json', jsonLang)
// hljs.registerLanguage('java', javaLang)
// hljs.registerLanguage('go', goLang)
// hljs.registerLanguage('python', pythonLang)
// hljs.registerLanguage('r', rLang)
// hljs.registerLanguage('rust', rustLang)
// hljs.registerLanguage('vim', vimLang)

const props = defineProps<{
  html: string
}>()

const md: MarkdownIt = new MarkdownIt({
  // highlight: () => {
  //   return MarkdownItHighlightjs(md, { auto: true,
  // code: true,
  // inline: false,
  // ignoreIllegals: true, hljs })
  // }

  // highlight: (str, lang) => {
  //   if (lang && hljs.getLanguage(lang)) {
  //     try {
  //       return `<pre><code class="hljs language-${lang}">${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
  //     } catch (__) {}
  //   }

  //   return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  // }
  highlight: function (str, lang) {
    if (lang) {
      return `<pre><code class="language-${lang}">${ Prism.highlight(str, Prism.languages[lang], lang) }</code></pre>`
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})
  // .use(MarkdownItHighlightjs, { inline: true, hljs })

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