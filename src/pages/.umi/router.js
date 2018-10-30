import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user.html",
    "redirect": "/user/login",
    "exact": true
  },
  {
    "path": "/index.html",
    "redirect": "/analysis/dailysummary",
    "exact": true
  },
  {
    "path": "/",
    "redirect": "/analysis/dailysummary",
    "exact": true
  },
  {
    "path": "/user(.html)?",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
    "routes": [
      {
        "path": "/user/login.html",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
    "Routes": [require('../Authorized').default],
    "authority": [
      "administrator",
      "guest"
    ],
    "routes": [
      {
        "name": "book",
        "icon": "book",
        "path": "/book(.html)?",
        "routes": [
          {
            "name": "user-list",
            "icon": "user",
            "path": "/book/user-list.html",
            "component": dynamic({ loader: () => import('../Book/BookUser/TableList'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/book/user-list-detail.html",
            "component": dynamic({ loader: () => import('../Book/BookUser/Detail'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "user-preference-list",
            "icon": "heart",
            "path": "/book/user-preference-list.html",
            "component": dynamic({ loader: () => import('../Book/BookUserPreference/TableList'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "user-order-list",
            "icon": "check-circle",
            "path": "/book/user-order-list.html",
            "component": dynamic({ loader: () => import('../Book/BookUser/OrderList'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "user-recharge-list",
            "icon": "gift",
            "path": "/book/user-recharge-list.html",
            "component": dynamic({ loader: () => import('../Book/BookUserRecharge/TableList'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "user-consume-list",
            "icon": "pay-circle",
            "path": "/book/user-consume-list.html",
            "component": dynamic({ loader: () => import('../Book/BookUserConsume/TableList'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "book-readrecord-list",
            "icon": "read",
            "path": "/book/book-readrecord-list.html",
            "component": dynamic({ loader: () => import('../Book/BookReadRecord/TableList'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "book-chapterreadrecord-list",
            "icon": "read",
            "path": "/book/book-chapterreadrecord-list.html",
            "component": dynamic({ loader: () => import('../Book/BookChapterReadRecord/TableList'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "book-collections-list",
            "icon": "save",
            "path": "/book/book-collections-list.html",
            "component": dynamic({ loader: () => import('../Book/BookReadRecord/Collections'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "sys-interface-record",
            "icon": "api",
            "path": "/book/sys-interface-record.html",
            "component": dynamic({ loader: () => import('../Book/SysInterfaceRecord/TableList'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "analysis",
        "icon": "bar-chart",
        "path": "/analysis(.html)?",
        "routes": [
          {
            "name": "dailysummary",
            "icon": "bar-chart",
            "path": "/analysis/dailysummary.html",
            "component": dynamic({ loader: () => import('../Analysis/DailySummary'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "visittrend",
            "icon": "line-chart",
            "path": "/analysis/visittrend.html",
            "component": dynamic({ loader: () => import('../Analysis/VisitTrend'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "visitretain",
            "icon": "stock",
            "path": "/analysis/visitretain.html",
            "component": dynamic({ loader: () => import('../Analysis/VisitRetain'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "userportrait",
            "icon": "radar-chart",
            "path": "/analysis/userportrait.html",
            "component": dynamic({ loader: () => import('../Analysis/UserPortrait'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "visitdistribution",
            "icon": "radar-chart",
            "path": "/analysis/visitdistribution.html",
            "component": dynamic({ loader: () => import('../Analysis/VisitDistribution'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "visitpage",
            "icon": "radar-chart",
            "path": "/analysis/visitpage.html",
            "component": dynamic({ loader: () => import('../Analysis/VisitPage'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "chart",
        "icon": "area-chart",
        "path": "/chart(.html)?",
        "routes": [
          {
            "name": "user",
            "icon": "pie-chart",
            "path": "/chart/user.html",
            "component": dynamic({ loader: () => import('../Charts/User'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "book-read",
            "icon": "bar-chart",
            "path": "/chart/BookRead.html",
            "component": dynamic({ loader: () => import('../Charts/BookRead'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "interface",
            "icon": "pie-chart",
            "path": "/chart/interface.html",
            "component": dynamic({ loader: () => import('../Charts/Interface'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "ranking",
            "icon": "bars",
            "path": "/chart/Ranking.html",
            "component": dynamic({ loader: () => import('../Charts/Ranking'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "sys",
        "icon": "setting",
        "path": "/sys(.html)?",
        "routes": [
          {
            "name": "account",
            "icon": "user",
            "path": "/sys/account-list.html",
            "component": dynamic({ loader: () => import('../Sys/Account'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "whitelist",
            "icon": "check-circle",
            "path": "/sys/whitelist.html",
            "component": dynamic({ loader: () => import('../Sys/WhiteList'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "name": "book-user-message",
            "icon": "message",
            "path": "/sys/book-user-message.html",
            "component": dynamic({ loader: () => import('../Book/BookUserMessage/TableList'), loading: require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": () => React.createElement(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
