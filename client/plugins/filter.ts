import Vue from 'vue'
import { format } from 'date-fns'

/**
 * "12:02:00" → "12時間2分"に変換する
 */
Vue.filter('toJPHm', function(value: string) {
  if (!value) return '0時間0分'
  const parts = value.split(':')
  const hours = Number(parts[0])
  const minutes = Number(parts[1])
  return `${hours}時間${minutes}分`
})

/**
 * "2020-02" → "2020年2月"に変換する
 */
Vue.filter('toJPYM', function(value: string) {
  if (!value) return ''
  const parts = value.split('-')
  const year = Number(parts[0])
  const month = Number(parts[1])
  return `${year}年${month}月`
})

/**
 * '2020-07-23T03:35:57.953Z' → '3:35' に変換する
 */
Vue.filter('createdAtToHHmm', function(value: string) {
  return format(new Date(value), 'HH:mm')
})
