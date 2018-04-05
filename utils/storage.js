

function saveEassyList(data){
  wx.setStorageSync('catalog', data);
}
/**
 * 获取列表
 */
function getEassyList(){
  return wx.getStorageSync('catalog');
}

/**
 * 获取Eassy数据
 */
function getEssayData(id) {
  var eassy_data = wx.getStorageSync("eassy_" + id);
  //console.log(eassy_data);
  return eassy_data;
}
/**
 * 设置填写的信息，分编辑、新增
 */
function saveEssayList(id,essayList,title) {
  //更新到目录中
  var arr = wx.getStorageSync('catalog');
  var timestamp = Date.now();
  var data = [], flag = true;
  if (arr.length) {
    arr.forEach(item => {
      if (item.id == id) {
        item.time = timestamp;
        item.title = title;
        flag = false;
      }
      data.push(item);
    })
  }
  if (flag) {
    var item = {
      id: id,
      time: timestamp,
      title: title,
    };
    
    data.push(item);
  }
  wx.setStorageSync('catalog', data);
  //内容独立保存成缓存文件
  var eassy = wx.getStorageSync("eassy_"+id);
  data = {
    id: id,
    time: timestamp,
    title: title,
    content: essayList
  };
  wx.setStorageSync("eassy_" + id, data);
}


// /**
//  * 设置填写的信息，分编辑、新增
//  */
// function saveValue(page) {
//   var arr = wx.getStorageSync('txt');
//   var data = [], flag = true;
//   if (arr.length) {
//     arr.forEach(item => {
//       if (item.id == page.data.id) {
//         item.time = Date.now();
//         item.content = page.data.EssayList;
//         flag = false;
//       }
//       data.push(item);
//     })
//   }
//   if (flag) {
//     var item = {
//       id: page.data.id,
//       time: Date.now(),
//       content: page.data.EssayList
//     };
//     data.push(item);
//   }
//   wx.setStorageSync('txt', data);
// }
// /**
//  * 根据跳转的url中的id获取编辑信息回填
//  */
// function getData(id, page) {
//   var arr = wx.getStorageSync('txt');
//   console.log(arr);
//   if (arr.length) {
//     arr.forEach((item) => {
//       if (item.id == id) {
//         page.setData({
//           id: item.id,
//           EssayList: item.content
//         })
//       }
//     })
//   }
// }
module.exports = {
  saveEssayList: saveEssayList,
  getEssayData: getEssayData,
  getEassyList: getEassyList,
  saveEassyList: saveEassyList
}