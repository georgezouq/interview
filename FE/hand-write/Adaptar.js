class ActionBase {
  getUserInfo() {}
}

class ActionAdapter extends ActionBase {
  constructor () {
    super()

    this.apiWX = new WXApi()
    this.apiApp = new AppApi()
  }

  getUserInfo(userId, phone, from) {
    if (from === 'wx')
      return this.apiWX.getUserInfo(userId, phone)

    this.apiApp.getUserInfo(userId)
  }
}

class WXApi extends ActionBase {
  getUserInfo(userId, phone) {
    console.log('Get user info from wx')
  }
}

class AppApi extends ActionBase {
  getUserInfo(userId) {
    console.log('Get user info from APP')
  }
}

const adapter = new ActionAdapter()
adapter.getUserInfo('1', '18668888888', 'wx')
