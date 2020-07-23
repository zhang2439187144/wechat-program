var app = getApp();
var hotapp = require('../../utils/hotapp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  insert_information: function(id, name, sex, img) {
    var that = this;
    let number = '';
    let sql_data = {
      table_name: 'user_information',
      database: 'AI_doctor',
      sql: "insert into user_information(weixin_id, name, sex,number,user_image) values('" + id + "', '" + name + "', '" + sex + "', '" + number + "', '" + img + "')"
    }
    console.log(sql_data.sql);
    app.other_sql(sql_data);
  },
  bindGetUserInfo: function(e) {
    var that = this;
    var userInfo = e.detail.userInfo;
    app.data.user_img = e.detail.userInfo.avatarUrl;
    app.data.user_name = e.detail.userInfo.nickName;
    app.data.user_sex = e.detail.userInfo.gender ? '男' : '女';
    console.log(userInfo);

    // 可以通过回调函数来使用openid

    hotapp.wxlogin(function(openID) {
      app.data.user_id = openID;
      console.log("openID:" + openID);
      app.data.user_id = openID;
      that.insert_information(app.data.user_id, app.data.user_name, app.data.user_sex, app.data.user_img);

      let sql_data = {
        table_name: 'user_information',
        flag: 'select',
        database: 'AI_doctor',
        sql: "SELECT * FROM user_information where weixin_id = '" + app.data.user_id + "'"
      }

      app.select_sql(sql_data).then((res) => {
        app.data.user_img = app.data.temp_data[0].user_image;
        app.data.user_name = app.data.temp_data[0].name,
          console.log(app.data.user_name);
        app.data.user_sex = app.data.temp_data[0].sex,
          app.data.user_number = app.data.temp_data[0].number
      })
      that.goIndex();
    });
  },


  goIndex: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },


})