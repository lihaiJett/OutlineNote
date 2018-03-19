// pages/manager/myview.js

var EssayItem = function (n, c) {
  var E = {};
  E.key = n;
  E.num = n;
  if(c instanceof Array){
    E.children = c;
  }else{
    E.content = c;
  }
  return E;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    EssayList: {}
  },
  add1: function (e) {
    var firstI = parseInt(e.currentTarget.id);
    console.log(firstI);
    var item = EssayItem(1,1);
    item.num = this.data.EssayList[firstI].children.length +1;
    item.key = item.num-1;
    this.data.EssayList[firstI].children.push(item);
    this.setData({
      EssayList: this.data.EssayList
    } );  
  },
  add2: function (e) {
    var item = EssayItem(1, []);
    item.num = this.data.EssayList.length + 1;
    item.key = item.num-1;
    this.data.EssayList.push(item);
    // var param = {};
    // var string1 = "EssayList[" + index + "].content[1]";
    // param[string1] = 'changed data';
    // this.setData(param);  
    this.setData({
      EssayList: this.data.EssayList
    });
  },
  bindInput:function(e){
    // inputContent[e.currentTarget.id] = e.detail.value
    var index = e.currentTarget.id.split('.');
    var firstI = parseInt(index[0]);
    var secondI = parseInt(index[1]);     
    this.data.EssayList[firstI].children[secondI].content = ""+e.detail.value;
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mEssayList = [
      {
        key:"0",
        num:1,
        children:[
          {
            key: "0.0",
            num: 1,
            content: "xxx"
          }
        ],
      },
      {
        key: "1",
        num: 2,
        children: []
      }
    ];
    this.setData(
      {
        EssayList: mEssayList
      }
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindButtonTap: function () {
    var that = this
    wx.getSavedFileList({
      success: function (res) {
        

        // wx.showModal({
        //   title: '提示',
        //   content: "11"+res.fileList,
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('用户点击确定')
        //     } else if (res.cancel) {
        //       console.log('用户点击取消')
        //     }
        //   }
        // })
      }
    })
    // wx.chooseVideo({
    //   sourceType: ['album', 'camera'],
    //   maxDuration: 60,
    //   camera: 'back',
    //   success: function (res) {
    //     that.setData({
    //       src: res.tempFilePath
    //     })
    //   }
    // })
  }
})

