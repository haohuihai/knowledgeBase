// 注意: base的值为github仓库的名称(/不能少)

// import navbar from './configs/navbar'
// import sidebar from './configs/sidebar'

const { navbar } = require('./configs/navbar')
const { sidebar } = require('./configs/sidebar')
module.exports = {
  base: "/" /* 基础虚拟路径 */,
  dest: "dist" /* 打包文件基础路径, 在命令所在目录下 */,
  title: "DATA", // 标题
  description: "记录一些我遇到的技术", // 标题下的描述
  // 指定网页head图标
  // level: [1, 2, 3, 4],
  head: [
    [
      "link",
      { rel: "icon", href: `/icons/favicon.ico` },
    ],
  ],
  themeConfig: {
    // 主题配置
    logo: "/images/logo.jpeg",
    sidebarDepth: 4,
    searchMaxSuggestions: 10,
    nav: navbar ,
    sidebar,
    lastUpdated: '最后更新时间',
  },
  plugins: [
    '@vuepress/plugin-nprogress',
    [
      '@vuepress/blog',
      {
        directories: [
          {
            // 当前分类的唯一 ID
            id: 'post',
            // 目标文件夹
            dirname: '_posts',
            // `entry page` (或者 `list page`) 的路径
            path: '/post',
          },
        ],
      },
    ],
  ],
}
// const docConfig = {
//   base: "/" /* 基础虚拟路径 */,
//   dest: "dist" /* 打包文件基础路径, 在命令所在目录下 */,
//   title: "DATA", // 标题
//   description: "记录一些我遇到的技术", // 标题下的描述
//   // 指定网页head图标
//   // level: [1, 2, 3, 4],
//   head: [
//     [
//       "link",
//       { rel: "icon", href: `/icons/favicon.ico` },
//     ],
//   ],
//   themeConfig: {
//     // 主题配置
//     logo: "/images/logo.jpeg",
//     sidebarDepth: 4,
//     searchMaxSuggestions: 10,
//     nav: navbar ,
//     sidebar,
//     lastUpdated: '最后更新时间',
//   },
//   plugins: [
//     '@vuepress/plugin-nprogress',
//     [
//       '@vuepress/blog',
//       {
//         directories: [
//           {
//             // 当前分类的唯一 ID
//             id: 'post',
//             // 目标文件夹
//             dirname: '_posts',
//             // `entry page` (或者 `list page`) 的路径
//             path: '/post',
//           },
//         ],
//       },
//     ],
//   ],
// };
// module.exports = docConfig;