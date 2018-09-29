export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['administrator', 'guest'],
    routes: [
      // 默认页
      { path: '/', redirect: '/chart/user' },
      // 数据列表
      {
        name: 'book',
        icon: 'book',
        path: '/book',
        routes: [
          {
            name: 'user-list',
            icon: 'user',
            path: '/book/user-list',
            component: './Book/BookUser/TableList',
          },
          { path: '/book/user-list-detail', component: './Book/BookUser/Detail' },
          {
            name: 'user-preference-list',
            icon: 'heart',
            path: '/book/user-preference-list',
            component: './Book/BookUserPreference/TableList',
          },
          {
            name: 'user-order-list',
            icon: 'check-circle',
            path: '/book/user-order-list',
            component: './Book/BookUser/OrderList',
          },
          {
            name: 'user-recharge-list',
            icon: 'gift',
            path: '/book/user-recharge-list',
            component: './Book/BookUserRecharge/TableList',
          },
          {
            name: 'user-consume-list',
            icon: 'pay-circle',
            path: '/book/user-consume-list',
            component: './Book/BookUserConsume/TableList',
          },
          {
            name: 'book-readrecord-list',
            icon: 'read',
            path: '/book/book-readrecord-list',
            component: './Book/BookReadRecord/TableList',
          },
          {
            name: 'book-chapterreadrecord-list',
            icon: 'read',
            path: '/book/book-chapterreadrecord-list',
            component: './Book/BookChapterReadRecord/TableList',
          },
          {
            name: 'book-collections-list',
            icon: 'save',
            path: '/book/book-collections-list',
            component: './Book/BookReadRecord/Collections',
          },
          {
            name: 'sys-interface-record',
            icon: 'api',
            path: '/book/sys-interface-record',
            component: './Book/SysInterfaceRecord/TableList',
          },
        ],
      },
      // 数据统计
      {
        name: 'chart',
        icon: 'area-chart',
        path: '/chart',
        routes: [
          {
            name: 'user',
            icon: 'pie-chart',
            path: '/chart/user',
            component: './Charts/User',
          },
          {
            name: 'book-read',
            icon: 'bar-chart',
            path: '/chart/BookRead',
            component: './Charts/BookRead',
          },
          {
            name: 'interface',
            icon: 'pie-chart',
            path: '/chart/interface',
            component: './Charts/Interface',
            hideInMenu: true,
          },
          {
            name: 'ranking',
            icon: 'bars',
            path: '/chart/Ranking',
            component: './Charts/Ranking',
          },
        ],
      },
      // 系统管理
      {
        name: 'sys',
        icon: 'setting',
        path: '/sys',
        routes: [
          {
            name: 'account',
            icon: 'user',
            path: '/sys/account-list',
            component: './Sys/Account',
          },
          {
            name: 'whitelist',
            icon: 'check-circle',
            path: '/sys/whitelist',
            component: './Sys/WhiteList',
          },
          {
            name: 'book-user-message',
            icon: 'message',
            path: '/sys/book-user-message',
            component: './Book/BookUserMessage/TableList',
          },
        ],
      },
      // {
      //   component: '404',
      // },
    ],
  },
];
