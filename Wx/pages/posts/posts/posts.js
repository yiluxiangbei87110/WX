var posData=require('../../../db/db.js');
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
    this.setData({ imgDesc: posData.postList});
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
  gotoDetail:function(event){
   var id=event.currentTarget.dataset.postid;
   wx.navigateTo({
     url: '../posts-detail/posts-detail?id='+id
   })
  },
  swiperTap:function(event){
    //写在父元素上面，利用冒泡事件，来触发函数,注意此时不在currentTarget对象上面了，在target对象上面
    //注意断点的使用
    //如果在images 上面加一个bindTap="函数"，依然会跳转，他不会组织冒泡，但是如果使用了catchtap就会组织，不会跳转
    var id = event.target.dataset.postid;
    wx.navigateTo({
      url: '../posts-detail/posts-detail?id=' + id
    })
  }
})