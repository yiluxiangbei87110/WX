// pages/posts/posts-detail/post-detail.js
var postData=require("../../db/db.js")
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
    //获取跳转带来的id
    var id=options.id;
    this.setData({
      postId: id
    })
    //根据db json数据格式来去数据0 1 2 3 4
    var DetailData = postData.postList[id];
    //是否收藏了
    // var postMap={
    //   1:false,
    //   2:true
    // }
    var postMap = wx.getStorageSync("post_collected");
    if (postMap){
      var postCollected = postMap[id];
      this.setData({
        collected: postCollected
      })
    }else{
      postMap={};
      postMap[id]=false;
      wx.setStorageSync('post_collected', postMap)
    }
    this.setData({
      DetailData: DetailData
    })

  },
  collectedHand:function(event){
    var postMap=wx.getStorageSync('post_collected');
    //怎么从onload中拿到id ,可以data中设置
        var postCollected = !postMap[this.data.postId];
        //需要更新缓存
        postMap[this.data.postId] = postCollected;
        wx.setStorageSync(
          'post_collected',postMap
        );
        //需要更新data
        this.setData({
          collected:postCollected
        });
        wx.showToast({
          title: postCollected ? '收藏成功':"取消收藏成功",
          duration:1000,
          icon:"success"
        })
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

  }
})