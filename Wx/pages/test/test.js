// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var readData={};
      readData[1]="1";
      readData[2] = "1";
      readData[3] = "1";
      console.log(readData);
      this.setData(readData)
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
  OnTest:function(e){
    var maps=wx.getStorageSync("maps");
    var id=e.target.dataset.id;
    if(id=="1"){
      maps[id]=id;
    } else if (id == "2"){
      maps[id] = id;
    } else if (id == "3"){
      maps[id] = id;
    }else{
      maps[id] = id;
    }
    wx.setStorageSync('maps', maps)
    // idObj={
    //   1:true,
    //   2:false
    // }
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
  
  }
})