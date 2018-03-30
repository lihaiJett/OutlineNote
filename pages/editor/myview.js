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
    move_temp:{
      move_temp_firstI:-1,
      move_temp_secondI:-1,
    },
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
moveto_second:function(e){
  var index = e.currentTarget.dataset.id.split('.');
  var to_firstI = parseInt(index[0]);
  var to_secondI = parseInt(index[1]);
  var from_firstI = this.data.move_temp.move_temp_firstI;
  var from_secondI = this.data.move_temp.move_temp_secondI;

  var temp = this.data.EssayList[from_firstI].children[from_secondI];
  this.data.EssayList[from_firstI].children.splice(from_secondI, 1);
  this.data.EssayList[to_firstI].children.splice(to_secondI, 0, temp);

  this.setData({
    move_temp: {
      move_temp_firstI: -1,
      move_temp_secondI: -1
    },
    EssayList: this.data.EssayList
  });
}, 
first_move: function (e) {
  var to_firstI = e.currentTarget.dataset.id;
  var from_firstI = this.data.move_temp.move_temp_firstI;

  var temp = this.data.EssayList[from_firstI];
  this.data.EssayList.splice(from_firstI, 1);
  this.data.EssayList.splice(to_firstI, 0, temp);

  this.setData({
    move_temp: {
      move_temp_firstI: -1,
      move_temp_secondI: -1
    },
    EssayList: this.data.EssayList
  });
}
,
bindTouchStart: function (e) {
  this.startTime = e.timeStamp;
},
bindTouchEnd: function (e) {
  this.endTime = e.timeStamp;
},
//子项点击和长按事件
second_longtap: function (e) {
  var page = this;
  var index = e.currentTarget.dataset.id.split('.');
  var firstI = parseInt(index[0]);
  var secondI = parseInt(index[1]);
  wx.showActionSheet({
    itemList: ['删除' + (firstI+1)+".("+(secondI+1)+")", '移动', 'C'],
    success: function (res) {
      switch(res.tapIndex){
        case 0://删除
          page.data.EssayList[firstI].children.splice(secondI,1);
          if (page.data.EssayList[firstI].children.length == 0){
            page.data.EssayList.splice(firstI,1);
          }
          page.setData({
            EssayList: page.data.EssayList
          })
        break;          
        case 1:
          page.data.move_temp.move_temp_firstI = firstI;
          page.data.move_temp.move_temp_secondI = secondI;
          page.setData({
            move_temp:{
              move_temp_firstI:firstI,
              move_temp_secondI:secondI
            }
          });
        break;
        case 2:
        break;
      }
      console.log(res.tapIndex)
    },
    fail: function (res) {
      console.log(res.errMsg)
    }
  })
},
//标题的长按修改
  first_longtap: function(e){
    var firstI = e.currentTarget.dataset.id;
    var page = this;
    wx.showActionSheet({
      itemList: ['删除' + (firstI + 1), '修改', '移动',],
      success: function (res) {
        switch (res.tapIndex) {
          case 0://删除
            page.data.EssayList.splice(firstI, 1);
            page.setData({
              EssayList: page.data.EssayList
            })
            break;
          case 1:
            page.setData({
              modalinput: {
                hidden: false,
                data_id: firstI.toString(),
                text: page.data.EssayList[firstI].content
              }
            })
            break;
          case 2:
            page.data.move_temp.move_temp_firstI = firstI;
            page.setData({
              move_temp: {
                move_temp_firstI: firstI,
                move_temp_secondI: -1
              }
            });
            break;
        }
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
//点击按钮弹出指定的hiddenmodalput弹出框  
modalinput: function (e) {
  if (this.endTime - this.startTime < 350) {
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
  }
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
  console.log(e);
  var index = e.currentTarget.dataset.id.split('.');
  if (index.length == 1) {
    var firstI = parseInt(index[0]);
    this.data.EssayList[firstI].content = "" + e.detail.value;
  } else {
    var firstI = parseInt(index[0]);
    var secondI = parseInt(index[1]);
    this.data.EssayList[firstI].children[secondI].content = "" + e.detail.value;
  }

},
//确认  
confirm: function (e) {

  var page = this;
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
          s += "\t("+second_index +") "+ item.content+ "\r\n";
          second_index++;
        }
        );
      }
      first_index ++;
    })
  }
  return s;
}