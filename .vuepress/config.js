module.exports = {
  title: 'Jerry articles',
  description: 'writing some notes',
  ga: 'UA-121630045-1',
  serviceWorker: true,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }]
  ],
  serviceWorker: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '读书笔记',
        link: '/reading/'
      },
      {
        text: '学习笔记',
        items: [
          { text: '前端', link: '/learning/fe/' },
          { text: 'Node', link: '/learning/node/' },
          { text: 'Python', link: '/learning/python/' },
          { text: 'other', link: '/learning/other/' }
        ]
      },
      { text: '个人博客', link: 'https://jerryshi.com' }
    ],
    lastUpdated: 'Last Updated',
    sidebar: 'auto'
  }
}
