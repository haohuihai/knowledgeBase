// 注意: base的值为github仓库的名称(/不能少)
module.exports = {
  base: "/vuepress/" /* 基础虚拟路径 */,
  dest: "docs/dist" /* 打包文件基础路径, 在命令所在目录下 */,
  title: "技术小记", // 标题
  description: "记录一些技术和生活", // 标题下的描述

  themeConfig: {
    // 主题配置
    logo: "/images/logo.jpeg",
    sidebarDepth: 0,
    nav: [
      // 头部导航
      { text: "官网", link: "http://101.132.124.188" },
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
        title: "技术方面", // 标题
        collapsable: true, // 下级列表不可折叠
        children: [
          // 下级列表
          {
            title: "前端杂记",
            collapsable: true,
            children: [
              {
                title: "CSS",
                collapsable: true,
                children: [
                  {
                    title: "CSS1",
                    path: "../pages/前端/CSS/CSS1",
                  },
                  {
                    title: "CSS2",
                    path: "../pages/前端/CSS/CSS2",
                  },
                ],
              },
              {
                title: "JavaScript",
                collapsable: true,
                children: [
                  {
                    title: "阶段一",
                    path: "../pages/前端/JS/阶段一",
                  },
                  {
                    title: "阶段二",
                    path: "../pages/前端/JS/阶段二",
                  },
                  {
                    title: "阶段三",
                    path: "../pages/前端/JS/阶段三",
                  },
                  {
                    title: "阶段四",
                    path: "../pages/前端/JS/阶段四",
                  },
                ],
              },
              {
                title: "TypeScript",
                collapsable: true,
                path: "../pages/前端/TS/ts",
              },
            ],
          },
          { title: "Node相关", path: "../pages/Node/aaa" },
          { title: "Python", path: "../pages/Python/python基础" },
        ],
      },
      {
        title: "构建工具",
        collapsable: true,
        children: [
          {
            title: "umi",
            path: "../pages/构建工具/umi/优化",
          },
        ],
      },
      {
        title: "框架",
        collapsable: true,
        children: [
          {
            title: "react",
            path: "../pages/框架/react/一些问题",
          },
          {
            title: "vue",
            path: "../pages/框架/vue/一些问题",
          },
        ],
      },
      {
        title: "部署", // 标题
        collapsable: true, // 下级列表不可折叠
        children: [
          // 下级列表
          {
            title: "前端杂记",
            collapsable: true,
            children: [
              {
                title: "CSS",
                collapsable: true,
                children: [
                  {
                    title: "CSS1",
                    path: "../pages/前端/CSS/CSS1",
                  },
                  {
                    title: "CSS2",
                    path: "../pages/前端/CSS/CSS2",
                  },
                ],
              },
              {
                title: "JavaScript",
                collapsable: true,
                children: [
                  {
                    title: "阶段一",
                    path: "../pages/前端/JS/阶段一",
                  },
                  {
                    title: "阶段二",
                    path: "../pages/前端/JS/阶段二",
                  },
                  {
                    title: "阶段三",
                    path: "../pages/前端/JS/阶段三",
                  },
                  {
                    title: "阶段四",
                    path: "../pages/前端/JS/阶段四",
                  },
                ],
              },
            ],
          },
          { title: "Node相关", path: "../pages/Node/aaa" },
          { title: "Python", path: "../pages/Python/python基础" },
        ],
      },
    ],
    head: [
      // 指定网页head图标
      [
        "link",
        { rel: "shortcut icon", type: "image/x-icon", href: `/favicon.ico` },
      ],
    ],
  },
};
