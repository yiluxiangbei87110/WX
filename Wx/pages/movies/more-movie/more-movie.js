// pages/movies/more-movie/more-movie.js
var util = require("../../../utils/util.js")
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      requestUrl: "",
      totalCount:0,
      totalMovies:{},
      isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dataUrl='';
    var navigateTitle = options.category;
    this.setData({ navigateTitle: navigateTitle});
    switch (navigateTitle) {
      case "最新上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "好评电影":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.setData({
      requestUrl: dataUrl
    });
    util.http(dataUrl,this.processDoubanData)

  },
  processDoubanData: function (moviesDouban){
    var movies = [];
    for (var i in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[i];
      var title = subject.title.length > 6 ? subject.title.substring(0, 6)+"…" : subject.title;

      var temp = {
        stars: util.converTOArr(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    //新旧数据相加
    var totalMovies={};
    if (this.data.isEmpty){
      totalMovies=movies;
    }else{
       totalMovies=this.data.movies.concat(movies);
     // totalMovies = movies.concat(this.data.movies);
    }
    console.log(totalMovies)

    this.setData({
      movies: totalMovies,
      isEmpty: false,
    })
    console.log(totalMovies)
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
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
  // scroll-view 新版本中不能使用onscrollLower加载，
  //而且这里还有一个问题是多次返送了http请求
  //https://zhuanlan.zhihu.com/p/24739728?refer=oldtimes
  // onScrollLower:function(){
  //   var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
  //   util.http(nextUrl, this.processDoubanData);
  //   wx.showNavigationBarLoading();
  // }，
  onReachBottom: function (event) {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  }
  , onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  }
})