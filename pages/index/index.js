//index.js
//获取应用实例
const app = getApp()
var tipsArr = [[
  "长按列表条目可弹出菜单",
  "每天一苹果，医生远离我",
  "点我，我就切给你看"
],[]];
var curArrNum = 0;
function getNextTips() {
  var curArr = tipsArr[curArrNum];
  var value ;
  if(1 == curArr.length){
    value = curArr[0];
    curArrNum = (curArrNum+1)%2;
    curArr = tipsArr[curArrNum];
  }else{
    var random = Math.floor(Math.random() * curArr.length);
    value = curArr[random];
    tipsArr[curArrNum].splice(random, 1);
    tipsArr[(curArrNum + 1) % 2].push(value);
  }
  return value;
}

Page({
  data: {
    motto: '列出来',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tips: getNextTips()
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow:function(e){
    var param = { "tips": getNextTips() };
    this.setData(param);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toListPage: function () {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  changeTips: function () {
    var param = { "tips": getNextTips() };
    this.setData(param);
  }
})


