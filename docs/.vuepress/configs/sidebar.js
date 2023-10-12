exports.sidebar =  [
  // 左侧导航
  {
    title: "CSS",
    collapsable: true,
    children: [
      {
        title: "CSS基础知识",
        path: "../pages/Front/CSS/CSS1",
      }
    ],
  },
  {
    title: "JavaScript",
    collapsable: true,
    children: [
      {
        title: "模块化",
        path: "../pages/Front/JS/modules",
      },
      {
        title: "BOM",
        path: "../pages/Front/JS/BOM",
      },
      {
        title: "JS的继承方式",
        path: "../pages/Front/JS/extend",
      },
      {
        title: "JS核心原理相等",
        path: "../pages/Front/JS/JavaScript核心原理相等操作",
      },
      {
        title: "JS核心原理原型",
        path: "../pages/Front/JS/JavaScript核心原理之原型",
      },
      {
        title: "JS原生函数",
        path: "../pages/Front/JS/JavaScript原生函数",
      },
      {
        title: "JS作用域",
        path: "../pages/Front/JS/JavaScript原理作用域",
      },
      {
        title: "JS基础",
        path: "../pages/Front/JS/JavaScript基础",
      },
      {
        title: "This",
        path: "../pages/Front/JS/This",
      },
      {
        title: "JSON",
        path: "../pages/Front/JS/JSON",
      },
      {
        title: "动画",
        path: "../pages/Front/JS/动画",
      },
    ],
  },
  {
    title: "TypeScript",
    collapsable: true,
    path: "../pages/Front/TS/ts",
  },
  {
    title: "Git",
    collapsable: true,
    path: "../pages/Git/git",
  },
  {
    title: "Webpack",
    collapsable: true,
    children: [
      {
        title: "基本使用",
        path: "../pages/Webpack/webpack",
      },
      {
        title: '源码分析',
        path: '../pages/Webpack/note'
      },
      {
        title: '自定义插件(plugin)',
        path: '../pages/Webpack/plugin'
      },
      {
        title: '自定义插件(loader)',
        path: '../pages/Webpack/loader'
      },
      {
        title: 'work',
        path: '../pages/Webpack/work'
      },
    ],
  },
  {
    title: "Axios",
    collapsable: true,
    path: "../pages/Axios/note",
  },
  {
    title: "Promise",
    collapsable: true,
    path: "../pages/Promise/note",
  },
  {
    title: "网络",
    collapsable: true,
    path: "../pages/Http/note",
  },
  { 
    title: "Node", 
    collapsable: true,
    children: [
      {
        title: "Node由浅入深",
        path: "../pages/Node/node",
      },
      {
        title: 'Express搭建后端服务',
        path: '../pages/Node/server'
      },
    ],
  },
  
  { title: "Python", path: "../pages/Python/pythonBase" },
  { title: "Npm", path: "../pages/Npm/note" },
  { title: "Umi", path: "../pages/umi/note" },
 
  {
    title: "Vue",
    collapsable: true,
    children: [
      {
        title: "Vue2",
        path: "../pages/Vue/vue2",
      },
      {
        title: "Vue3",
        path: "../pages/Vue/vue3",
      },
      {
        title: "vue-router",
        path: "../pages/Vue/vueRouter",
      },
      {
        title: "vuex",
        path: "../pages/Vue/vuex",
      },
    ],
  },

  {
    title: "React",
    collapsable: true,
    children: [
      {
        title: "React 学习之初",
        path: "../pages/React/before",
      },
      {
        title: "React Hooks",
        path: "../pages/React/hooks",
      },
      {
        title: "React 类",
        path: "../pages/React/class",
      },
      {
        title: "React Redux",
        path: "../pages/React/redux",
      },
      {
        title: "React 事件",
        path: "../pages/React/event",
      },
      {
        title: "React 学习之后",
        path: "../pages/React/after",
      }
    ],
  },
  {
    title: "Swagger",
    collapsable: true,
    path: '../pages/Swagger/note',
  },
  {
    title: "小程序",
    collapsable: true,
    path: '../pages/SmallApp/note',
  },
  
  {
    title: "Chrome",
    collapsable: true,
    children: [
      {
        title: "浏览器原理",
        path: "../pages/Chrome/note",
      },
      {
        title: "浏览器原理基本知识",
        path: "../pages/Chrome/note2",
      },
    ],
  },
  
  {
    title: "其他",
    children: [
      {
        title: "other",
        path: "../pages/Others/note",
      }
    ]
  },
  {
    title: "计算机基础",
    children: [
      {
        title: "other",
        path: "../pages/computer/note",
      }
    ]
  }
]