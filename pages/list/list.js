var util = require('../../utils/util');
var StorageTool = require('../../utils/storage');
// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    initData(this); 
  },



  /**
   * 添加事件
   */
  add() {
    wx.navigateTo({
      url: '../editor/myview',
    })
  },

  
  /**
   * 点击编辑
   */
  bindTap: function (e) {
    if (this.endTime - this.startTime < 350) {
      var id = e.currentTarget.dataset.id;
      // 跳转 navigateTo
      wx.navigateTo({
        url: '../editor/myview?id=' + id
      })
    }
  },
  /**
   *  长按出菜单
   */
  bingLongTap: function (e) {
    //console.log("长按");
    var mypage = this;
    wx.showModal({
      title: '是否删除',

      content: 'index: ' + e.currentTarget.dataset.index,
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
          deleteOne(mypage, e.currentTarget.dataset.index);
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  }, 
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },
})

/**
 * 处理初始化页面列表数据
 */
function initData (page) {
  var arr = StorageTool.getEassyList();
  console.log(arr);
  if (arr.length) { 
    arr.forEach((item, i) => {
      var t = new Date(Number(item.time));
      item.time = util.formatTime(t);
    })
    page.setData({
      lists: arr
    })
  }
}
function deleteOne(page,index){
  var arr = StorageTool.getEassyList();
  console.log(arr);
  arr.splice(index, 1);
  StorageTool.saveEassyList( arr);
  page.setData({
    lists: arr
  })
}