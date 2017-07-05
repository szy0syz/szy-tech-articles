function getTimestamp() {
  return parseInt(new Date() / 1000, 10);
}

window.$docsify = {
    name: 'szy-tech-articles',
    repo: 'https://github.com/szy0syz/szy-tech-articles',
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