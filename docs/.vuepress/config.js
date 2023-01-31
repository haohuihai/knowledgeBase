// 注意: base的值为github仓库的名称(/不能少)
module.exports = {
  base: "/knowledgebase/" /* 基础虚拟路径 */,
  dest: "docs/dist" /* 打包文件基础路径, 在命令所在目录下 */,
  title: "技术小记", // 标题
  description: "记录一些我遇到的技术", // 标题下的描述

  themeConfig: {
    // 主题配置
    logo: "/images/logo.jpeg",
    sidebarDepth: 0,
    nav: [
      // 头部导航
      { text: "官网", link: "http://www.haohuihai.top" },
      { text: "谷粒学院", link: "http://www.gulixueyuan.com/" },
      {
        text: "学习路线",
        items: [
          { text: "前端", link: "http://www.atguigu.com/web/" },
          { text: "Java", link: "http://www.atguigu.com/kecheng.shtml" },
          { text: "大数据", link: "http://www.atguigu.com/bigdata/" },
        ],
      },
    ],
    sidebar: [
      // 左侧导航
      {
        title: "CSS",
        collapsable: true,
        children: [
          {
            title: "CSS1",
            path: "../pages/Front/CSS/CSS1",
          },
          {
            title: "CSS2",
            path: "../pages/Front/CSS/CSS2",
          },
        ],
      },
      {
        title: "JavaScript",
        collapsable: true,
        children: [
          {
            title: "阶段一",
            path: "../pages/Front/JS/First",
          },
          {
            title: "阶段二",
            path: "../pages/Front/JS/Second",
          },
          {
            title: "阶段三",
            path: "../pages/Front/JS/Third",
          },
          {
            title: "阶段四",
            path: "../pages/Front/JS/Fourth",
          },
        ],
      },
      {
        title: "TypeScript",
        collapsable: true,
        path: "../pages/Front/TS/ts",
      },
      { title: "Node", path: "../pages/Node/aaa" },
      { title: "Python", path: "../pages/Python/pythonBase" },
      {
        title: "构建",
        collapsable: true,
        children: [
          {
            title: "umi",
            path: "../pages/umi/note",
          },
          {
            title: 'docker',
            path: '../pages/Docker/note'
          },
          {
            title: 'gitlab',
            path: '../pages/Gitlab/note'
          },
        ],
      },
      {
        title: "Vue",
        collapsable: true,
        children: [
          {
            title: "Vue2",
            path: "../pages/Vue/vueComponent",
          },
          {
            title: "Vue3",
            path: "../pages/Vue/vue3Base",
          },
        ],
      },
      {
        title: "React",
        collapsable: true,
        path: '../pages/React/base',
      },
      {
        title: "其他",
        children: [
          {
            title: "other",
            path: "../pages/Others/note",
          }
        ]
      }
    ],
    head: [
      // 指定网页head图标
      [
        "link",
        { rel: "shortcut icon", type: "image/x-icon", href: `` },
      ],
    ],
  },
};
