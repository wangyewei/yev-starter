import { defineConfig, presetAttributify, presetUno, presetMini } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno,
    presetAttributify,
    presetRemToPx({
      baseFontSize: 4
    }),
    presetMini
  ],
  shortcuts: [
    [
      'btn',
      'px-6 py-3 rounded-3 border-none inline-block bg-green-400 text-white cursor-pointer !outline-none hover:bg-green-600 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'
    ],
    ['center', 'flex justify-center items-center']
  ]
})
