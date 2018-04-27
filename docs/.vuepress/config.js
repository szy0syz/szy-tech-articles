module.exports = {
  title: 'szy - tech - articles',
  dest: './dist',
  themeConfig: {
    repo: 'szy0syz/szy-tech-articles',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '笔记',
        link: '/notes/',
        items: [
          {
            text: '读书笔记',
            link: '/reading/'
          },
          {
            text: '学习笔记',
            link: '/reading/'
          }
        ]
      },
      { text: '知识', link: '/knowledge/' }
    ],
    // 为以下路由添加侧边栏
    sidebar: {
      '/knowledge/': ['111', '222'],
      '/note/': ['note1', 'note2']
    }
  }
}
