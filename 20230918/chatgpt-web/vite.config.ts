import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import prismjs from "vite-plugin-prismjs"

const prismjsLangs = [
  // 'markup',
  // 'c',
  // 'csharp',
  // 'cpp',
  'coffeescript',
  'git',
  // 'php',
  'nginx',
  // 'mongodb',
  // 'json',
  // 'json5',
  // 'go',
  // 'python',
  'r',
  // 'jsx',
  // 'tsx',
  'regex',
  // 'rust',
  // 'sass',
  // 'typescript',
  'vim',
  // 'javaScript',
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // prismjs({
    //   // languages: prismjsLangs,
    //   languages: 'all',
    //   // plugins: ["line-numbers"], //配置显示行号插件
    //   // theme: "solarizedlight", //主题名称
    //   // css: true,
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
