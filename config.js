window.$docsify = {
    name: 'szy-tech-articles',
    repo: 'https://github.com/szy0syz/szy-tech-articles.git',
    coverpage: true,
    loadSidebar: true,
    subMaxLevel: 2,
    formatUpdated: '{YYYY}-{MM}-{DD} {HH}:{mm}',
    executeScript: true,
    auto2top: true,
    search: 'auto', // 默认值
    search: {
      maxAge: 86400000, // 过期时间，单位毫秒，默认一天
      paths: [], // or 'auto'
      placeholder: 'Type to search',
      noData: '未找到结果'
    },
    alias: {
      '/App/_sidebar.md': '/_sidebar.md',
      '/Knowledge/_sidebar.md': '/_sidebar.md',
      '/notes/_sidebar.md': '/_sidebar.md',
      '/OS/_sidebar.md': '/_sidebar.md',
      '/notes/dom/_sidebar.md': '/_sidebar.md',
      '/notes/learning/_sidebar.md': '/_sidebar.md',
      '/notes/ted/_sidebar.md': '/_sidebar.md',
      '/notes/learning/css/_sidebar.md': '/_sidebar.md',
      '/notes/learning/js/_sidebar.md': '/_sidebar.md',
      '/notes/learning/html/_sidebar.md': '/_sidebar.md',
      '/notes/learning/wxapp/_sidebar.md': '/_sidebar.md',
        '/notes/learning/excel/_sidebar.md': '/_sidebar.md',
      '/notes/reading/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787111376613/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787115335500/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787115352460/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787115380333/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787121276576/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787512329232/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787302311034/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787121177408/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787115216878/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9781593275846/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787115385734/_sidebar.md': '/_sidebar.md',
      '/notes/reading/9787115390592/_sidebar.md': '/_sidebar.md',
      '/Knowledge/FullStack/_sidebar.md': '/_sidebar.md'
    },
    plugins: [
      function (hook, vm) {
        hook.beforeEach(function (md) {
          //var url = 'https://github.com/willin/leader.js.cool/blob/master' + vm.route.file
          //var editUrl = '[:memo: 编辑本章节](' + url + ')\n'
          return md
            + '\n----\n'
            + '最后更新 {docsify-updated} '
            //+ editUrl
        });
  }]
}

// 离线阅读 (必须https才能上)
// if (typeof navigator.serviceWorker !== 'undefined') {
//     navigator.serviceWorker.register('sw.js')
// }
