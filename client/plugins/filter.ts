import Vue from 'vue'

/**
 * "12:02:00" → "12時間2分"に変換する
 */
Vue.filter('toJPHm', function(value: string) {
  if (!value) return ''
  const parts = value.split(':')
  const hours = Number(parts[0])
  const minutes = Number(parts[1])
  return `${hours}時間${minutes}分`
})
