//index.js
//获取应用实例
const app = getApp()
var hotapp = require('../../utils/hotapp.js');
Page({
  data: {
    img: app.data.user_img,
    name: app.data.user_name,
    sex: app.data.user_sex,
    number: app.data.user_number,
    id: app.data.user_id,
    session_key: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    this.setData({
      name: app.data.user_name
    });
    this.setData({
      sex: app.data.user_sex
    });
    this.setData({
      number: app.data.user_number
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    let userId = app.data.user_id;
    console.log("userId:" + userId);
    if (userId == '777') {
      app.goLoginPageTimeOut()
    }
    that.setData({
      id: userId,
    })
    that.setData({
      img: app.data.user_img
    })
    that.setData({
      name: app.data.user_name
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //事件处理函数
  getuser: function() {
    wx.navigateTo({
      url: "/pages/authorize/index"
    })
  },

  select_user_data: function() {
    var that = this;
    let sql_data = {
      table_name: 'user_information',
      flag: 'select',
      database: 'AI_doctor',
      sql: "SELECT * FROM user_information where weixin_id = '" + that.data.id + "'"
    }
    app.select_sql(sql_data).then((res) => {
      console.log(app.data.temp_data);
      that.setData({
        name: app.data.temp_data[0].name,
        sex: app.data.temp_data[0].sex,
        number: app.data.temp_data[0].number
      });
    })
  },
  userInfor: function() {
    if (this.data.id != '777') {
      wx.navigateTo({
        url: '../userInfor/userInfor?id=' + this.data.id,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false, //是否显示取消按钮 false去掉取消按钮
        success: function(res) {
          //console.log(res) 
        }
      })
    }
  },
  userCollection: function() {
    if (this.data.id != '777') {
      wx.navigateTo({
        url: '../userCollection/userCollection?id=' + this.data.id,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false, //是否显示取消按钮 false去掉取消按钮
        success: function(res) {
          //console.log(res) 
        }
      })
    }
  },
  userFeedback: function() {
    if (this.data.id != '777') {
      wx.navigateTo({
        url: '../userFeedback/userFeedback?id=' + this.data.id,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false, //是否显示取消按钮 false去掉取消按钮
        success: function(res) {
          //console.log(res) 
        }
      })
    }
  },
  judgeHistory: function() {
    if (this.data.id != '777') {
      wx.navigateTo({
        url: '../judgeHistory/judgeHistory?id=' + this.data.id,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false, //是否显示取消按钮 false去掉取消按钮
        success: function(res) {
          //console.log(res) 
        }
      })
    }
  },
})