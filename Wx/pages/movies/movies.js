// pages/movies/movies.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +"/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +"/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //统一request方法
  getMovieListData:function(url){
    var that=this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data);
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  //处理request返回数据
  processDoubanData: function (moviesDouban){
    var movies=[];
    for (var i in moviesDouban.subjects){
      var subject = moviesDouban.subjects[i];
      var title=subject.title.length >6 ? subject.title.substring(0,6) : subject.title;
      var temp={
        title:title
      }
      movies.push(temp);
      this.setData({
        movies:movies
      });
      console.log(movies);
    }
  },
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