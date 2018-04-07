function savePreference(key,value) {
  var preference = wx.getStorageSync("preference");
  if (!preference){
    preference = {};
  }
  preference[key] = value;
  wx.setStorageSync('preference', preference);
}
function getPreference() {
  return wx.getStorageSync('preference');
}
module.exports = {
  savePreference: savePreference, 
  getPreference: getPreference
}