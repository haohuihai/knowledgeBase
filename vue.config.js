// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production' ? '/vuepress': '/'
// }
import { defaultTheme } from '@vuepress/theme-default'

export default {
  theme: defaultTheme({
    // 在这里进行配置
    colorModeSwitch: true
  }),
}