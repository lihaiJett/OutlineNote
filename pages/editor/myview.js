// pages/manager/myview.js
var ConvertTool = require('../../utils/ConvertTool');
var EssayItem = function (n, c) {
  var E = {};
  if(c instanceof Array){
    E.children = c;
  }else{
    E.content = "";
  }
  return E;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalinput: {
      hidden:true,
      data_id:"",
      text:""
    } ,
    id:1,
    EssayList: [{
          
      children: [
        {
          content: ""
        }
      ],
    
    }]

  },
  //增加小点
  add_second: function (e) {
    var firstI = parseInt(e.currentTarget.dataset.id);
    console.log(firstI);
    var item = EssayItem(1,1);
    this.data.EssayList[firstI].children.push(item);
    this.setData({
      EssayList: this.data.EssayList
    } );   
  },
  //增加第一大点
  add_first: function (e) {
    var item = EssayItem(1, [
       EssayItem(1,"")
       ]);
    this.data.EssayList.push(item);
    this.setData({
      EssayList: this.data.EssayList
    });
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    if (id) {
      getData(id, this);
    } else {
      this.setData({
        id: Date.now()
      })
    }
    
  },

  

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    saveValue(this);
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
      }
    })
  },
copyTBL: function (e) {
    var self = this;
    wx.setClipboardData({
      // data: ConvertTool.mapToJson(ConvertTool.objToStrMap (self.data.EssayList)),
      data: getDataString1(self),
      success: function (res) {
        // self.setData({copyTip:true}),  
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    });
  } ,

//点击按钮痰喘指定的hiddenmodalput弹出框  
modalinput: function (e) {
  var index = e.currentTarget.dataset.id.split('.');
  var firstI = parseInt(index[0]);
  var secondI = parseInt(index[1]);
  //this.data.EssayList[firstI].children[secondI].content = "" + e.detail.value;
  console.log(this.data.EssayList[firstI].children[secondI]);
  this.setData({
    modalinput: {
      hidden: false,
      data_id: e.currentTarget.dataset.id,
      text: this.data.EssayList[firstI].children[secondI].content
    }
  })
},
//取消按钮  
cancel: function () {
  this.setData({
    modalinput: {
      hidden: true,
      data_id: "",
      text: ""
    }
  })
},
bindInput: function (e) {
  var index = e.currentTarget.dataset.id.split('.');
  var firstI = parseInt(index[0]);
  var secondI = parseInt(index[1]);
  this.data.EssayList[firstI].children[secondI].content = "" + e.detail.value;
},
//确认  
confirm: function (e) {
  var index = e.currentTarget.dataset.id.split('.');
  var firstI = parseInt(index[0]);
  var secondI = parseInt(index[1]);
  // this.data.EssayList[firstI].children[secondI].content = "hjghjg";//+ e.detail.value.inputtext
  var page = this;
  var changeTextView = "EssayList[" + firstI + "].children[" + secondI + "].content";
  this.setData({
    modalinput: {
      hidden: true,
      data_id: "",
      text: ""
    },
    EssayList: page.data.EssayList
  })
}  

})

/**
 * 根据跳转的url中的id获取编辑信息回填
 */
function getData(id, page) {
  var arr = wx.getStorageSync('txt');
  console.log(arr);
  if (arr.length) {
    arr.forEach((item) => {
      if (item.id == id) {
        page.setData({
          id: item.id,
          EssayList: item.content
        })
      }
    })
  }
}

/**
 * 设置填写的信息，分编辑、新增
 */
function saveValue(page) {
  var arr = wx.getStorageSync('txt');
  var data = [], flag = true;
  if (arr.length) {
    arr.forEach(item => {
      if (item.id == page.data.id) {
        item.time = Date.now();
        item.content = page.data.EssayList;
        flag = false;
      }
      data.push(item);
    })
  }
  if (flag) {
    var item = {
      id :page.data.id,
      time: Date.now(),
      content :page.data.EssayList
    };
    data.push(item); 
  }
  wx.setStorageSync('txt', data);
}

/**
 * 将数据变成复制到剪贴板的格式
 */
function getDataString1(page) {
  var arr = page.data.EssayList;
  console.log(arr);
  var s = "";
  if (arr.length) {
    var first_index = 1;
    arr.forEach((item) => {
      s += first_index + ". \r\n";
      if (item.children){
        var second_index = 1;
        item.children.forEach((item) => {
          s += "("+second_index +") "+ item.content+ "\r\n";
          second_index++;
        }
        );
      }
      first_index ++;
    })
  }
  return s;
}