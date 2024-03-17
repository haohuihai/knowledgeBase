exports.navbar =  [
  // 头部导航
  
  { 
    text: "运维", 
    items: [
      {
        text: "MySQL",
        collapsable: true,
        link: "../../pages/MySQL/note",
      },
      {
        text: "Docker",
        collapsable: true,
        link: "../../pages/Docker/note",
      },
      {
        text: "GitLab",
        collapsable: true,
        items: [
          {
            text: 'Gitlab基础',
            link: '../../pages/Gitlab/CICD/note'
          },
          {
            text: 'GitlabRunner',
            link: '../../pages/Gitlab/Runner/note'
          },
          {
            text: 'Gitlab管道',
            link: '../../pages/Gitlab/Pipeline/note'
          },
        ],
      },
      {
        text: "Linux",
        collapsable: true,
        items: [
          {
            text: "Linux常用命令",
            link: "../../pages/Linux/note",
          },
          {
            text: "Linux错误记录",
            link: "../../pages/Linux/error",
          },
          {
            text: "Shell脚本",
            link: "../../pages/Linux/shell",
          },
        ],
      },
      {
        text: "Circleci",
        link: '../../pages/Circleci/note',
      },
      {
        text: 'Pm2',
        collapsable: true,
        items: [
          {
            text: "安装",
            link: "../../pages/Pm2/install"
          },
          {
            text: "基础命令",
            link: "../../pages/Pm2/note"
          },
          {
            text: "项目进阶",
            link: "../../pages/Pm2/senior"
          }
        ]
      },
      { 
        text: "Nginx", 
        collapsable: true,
        items: [
          {
            text: "命令",
            link: "../../pages/Nginx/common",
          },
          {
            text: '基本操作',
            link: '../../pages/Nginx/note'
          },
        ],
      },
    ]
  },
  { 
    text: "后端", 
    items: [
      {
        text: "MySQL",
        collapsable: true,
        link: "../../pages/MySQL/note",
      },
      {
        text: "Docker",
        collapsable: true,
        link: "../../pages/Docker/note",
      },
    ]
  },
  { text: "webpack", link: "https://www.webpackjs.com/" },
  { text: "React", link: "https://react.dev/" },
  { text: "Vue", link: "https://vue3js.cn/" },
]