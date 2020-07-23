// pages/doctor/doctor.js
var util = require('../../utils/util.js');
var TIME = util.formatTime(new Date());

var app = getApp()


Page({

      /**
       * 页面的初始数据
       */
      data: {
        user_id: app.data.user_id,
        // user_id: 'oX-Ns5Z42Uh3hfs_h6gOIIjW6kkM',
        article_id: '',
        article_data: Array()
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        this.setData({
          user_id: app.data.user_id
        });
        this.setData({
          article_id: options.id
        });
        this.update_article_data();
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

      shoucang: function () {

        let data = {
          number: this.data.article_id,
          time: String(TIME),
          username: String(this.data.user_id),
          text_title: this.data.article_data[0].title,
          text_image_url: this.data.article_data[0].imagepath
        }

        // console.log(this.data.user_id);

        let sql_data = {
          table_name: 'article_Collection',
          database: 'AI_doctor',
          sql: "INSERT INTO`AI_doctor`.`article_Collection`(`number`, `time`, `username`, `text_title`, `text_image_url`) VALUES('" + data.number + "', '" + data.time + "', '" + data.username + "', '" + data.text_title + "', '" + data.text_image_url + "');"
        }

        wx.request({
          url: 'http://121.36.104.137/mysql.php',
          data: {
            table_name: sql_data.table_name,
            flag: 'insert',
            database: sql_data.database,
            sql: sql_data.sql
          },
          success: function (res) {
            wx.showModal({
              title: '提示',
              content: '收藏成功,可在我的收藏里查看。',
              showCancel: false,
            })
          },

          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '收藏失败！',
              showCancel: false,
            })
          }
        })

      },


      ydyw: function () {
        wx.showModal({
          title: '提示',
          content: '文章端口正在协商链接，谢谢理解',
          showCancel: false,
        })
  },



  update_article_data: function () {
    var that = this;
    let sql_data = {
      table_name: 'article_detail',
      flag: 'select',
      database: 'AI_doctor',
      sql: "SELECT * FROM article_detail WHERE number = '" + this.data.article_id + "'",
      article_data: Array()
    }

    app.running_sql(sql_data).then((res) => {
      that.setData({
        article_data: app.data.temp_data
      });
      console.log(that.data.article_data);

    })
  }


})