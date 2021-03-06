/*
 * Copyright 2017 lihaiJett. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//index.js
//获取应用实例
const app = getApp()
var tipsArr = [[
  "长按列表条目可弹出菜单",
  "每天一苹果，医生远离我",
  "点我，我就切给你看",
  "笔记缓存于本地，不会上传到网络",
  "随手点击保存，避免数据丢失"
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
  toSetting: function (){
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  changeTips: function () {
    var param = { "tips": getNextTips() };
    this.setData(param);
  }
})


