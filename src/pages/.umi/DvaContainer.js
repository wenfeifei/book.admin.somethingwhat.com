import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'bookChapterReadRecord', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/book/bookChapterReadRecord.js').default) });
app.model({ namespace: 'bookReadRecord', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/book/bookReadRecord.js').default) });
app.model({ namespace: 'bookUser', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/book/bookUser.js').default) });
app.model({ namespace: 'bookUserConsume', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/book/bookUserConsume.js').default) });
app.model({ namespace: 'bookUserMessage', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/book/bookUserMessage.js').default) });
app.model({ namespace: 'bookUserPreference', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/book/bookUserPreference.js').default) });
app.model({ namespace: 'bookUserRecharge', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/book/bookUserRecharge.js').default) });
app.model({ namespace: 'sysInterfaceRecord', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/book/sysInterfaceRecord.js').default) });
app.model({ namespace: 'global', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/login.js').default) });
app.model({ namespace: 'setting', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/setting.js').default) });
app.model({ namespace: 'api', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/statistics/api.js').default) });
app.model({ namespace: 'account', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/sys/account.js').default) });
app.model({ namespace: 'auth', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/sys/auth.js').default) });
app.model({ namespace: 'whitelist', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/sys/whitelist.js').default) });
app.model({ namespace: 'user', ...(require('D:/05.wechat/01.小程序/01.喵喵看书-v2.0.1/03.中后台/book.admin.somethingwhat.com/src/models/user.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
