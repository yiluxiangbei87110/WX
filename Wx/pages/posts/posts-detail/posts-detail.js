// pages/posts/posts-detail/post-detail.js
var postData=require("../../../db/db.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取跳转带来的id
    var id=options.id;
    this.setData({
      postId: id
    });
    //根据db json数据格式来去数据0 1 2 3 4
    var DetailData = postData.postList[id];
    //是否收藏了
    // var post_collected={
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
    //加载页面的时候就先设置好值。
    this.setData({
      DetailData: DetailData
    });

      //再次进入页面的时候，需要记录音乐图片的暂停和播放
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === id){
        this.setData({
          isPlayMusic:true
        })
      }else{
        this.setData({
          isPlayMusic: false
        })
      }
      this.musicFilp();

  },
  musicFilp:function(){
    //让浮出的音乐控制面板和图片控制一致
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.postId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },
  collectedHand:function(event){
    var postMap=wx.getStorageSync('post_collected');
    //怎么从onload中拿到id ,可以data中设置
    //点击切换收藏和不收藏的图标
     var postCollected = !postMap[this.data.postId];
     postMap[this.data.postId] = postCollected;

    //  //更新缓存值
    //  wx.setStorageSync('post_collected', postMap);
    //  //更新绑定的图图片切换值
    //  this.setData({
    //    collected: postCollected
    //  })
     this.showToast(postCollected, postMap);
        
  },
  showToast: function (postCollected, postMap) {
    //更新缓存值
     wx.setStorageSync('post_collected', postMap);
     //更新绑定的图图片切换值
     this.setData({
       collected: postCollected
     });
      wx.showToast({
        title: postCollected ? "收藏成功" : "取消收藏成功",
        duration: 1000,
        icon: "success"
      })
  },
  showModel: function (postCollected, postMap) {
    var that=this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '是否收藏该文章' :'取消收藏该文章',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success:function(res){
        if(res.confirm){
          wx.setStorageSync('post_collected', postMap);
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  shareFuc:function(event){
    var items = ['分享给微信好友', '分享到朋友圈', '分享到QQ空间', '分享到微博'];
    wx.showActionSheet({
      itemList:items,
      itemColor:'#405f80',
      success:function(res){
        wx.showModal({
          title: items[res.tapIndex],
          content:'功能还没完善，现在还不能分享哦！'
        })
      }
    })
  },
  musicFuc:function(){
    wx.showLoading({
      title: '音乐加载中',
    })
    var musicId=this.data.postId;
    var musicData = postData.postList[musicId].music;
    var isPlayMusic = this.data.isPlayMusic;
    this.setData({
      musicData: musicData
    });
    if (!isPlayMusic){
      wx.playBackgroundAudio({
        dataUrl: musicData.url,
        title: musicData.title,
        coverImgUrl: musicData.coverImg
      });
    }else{
      wx.stopBackgroundAudio();
    }
    this.setData({
      isPlayMusic: !isPlayMusic
    });
    wx.hideLoading();

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