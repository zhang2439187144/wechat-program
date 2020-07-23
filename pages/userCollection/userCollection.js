// pages/userCollection/userCollection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    no_Collection: -999,
    user_id: app.data.user_id,
    collection_data: Array(),
    state: 'left',
    tips: '',
    animation_css: 'ease',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //that.left();
    that.setData({
      user_id: app.data.user_id
    });
    that.update_collection_data();
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


  update_collection_data: function() {
    var that = this;

    let sql_data = {
      table_name: 'article_Collection',
      database: 'AI_doctor',
      sql: "SELECT * FROM article_Collection where username = '" + this.data.user_id + "' order by time desc"
    }

    app.select_sql(sql_data).then((res) => {
      that.setData({
        collection_data: app.data.temp_data
      });
      if (app.data.temp_data.length == 0)
        that.setData({
          no_Collection: 1
        });
      else
        that.setData({
          no_Collection: 0
        });
    })
  },

  delete_collection: function(e) {
    var that = this;
    console.log(e.currentTarget.id);
    wx.showModal({
      title: '删除收藏记录',
      content: '确定要删除该条记录？',
      showCancel: true,
      success: function(res) {
        if (res.cancel) {

        } else {
          let sql_data = {
            table_name: 'article_Collection',
            flag: 'delete',
            database: 'AI_doctor',
            sql: "DELETE FROM article_Collection WHERE time = '" + e.currentTarget.id + "' and username = '" + that.data.user_id + "'"
          }
          console.log("delete one!" + sql_data.sql);
          
          app.other_get_sql(sql_data).then((res) => {
            that.onLoad(that.data.user_id);
          })

        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  delete_all_collection: function() {
    var that = this;
    wx.showModal({
      title: '删除收藏记录',
      content: '确定要删除全部记录？',
      showCancel: true,
      success: function(res) {
        if (res.cancel) {

        } else {
          let sql_data = {
            table_name: 'article_Collection',
            flag: 'delete',
            database: 'AI_doctor',
            sql: "DELETE FROM article_Collection WHERE username = '" + that.data.user_id + "'"
          }
          console.log("delete all!" + sql_data.sql);

          app.other_get_sql(sql_data).then((res) => {
            that.onLoad(that.data.user_id);
          })
          
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  start: function() {
    let that = this;
      that.left();
    
    // else if (that.data.state == 'left') {
    //   that.right();
    // }
  },
  left: function() {
    let that = this;
    var animation = wx.createAnimation({
      duration: 1200,
      timingFunction: that.data.animation_css,
      delay: 50
    });
    animation.translate(-200, 0).step()
    this.setData({
      state: 'left',
      animation_css: 'ease',
      ani: animation.export()
    })

  },
  right: function() {
    let that = this;
    var animation = wx.createAnimation({
      duration: 1200,
      timingFunction: 'ease',
      delay: 100
    });
    animation.translate(13, 0).step()
    this.setData({
      state: 'right',
      ani: animation.export()
    })
  }

})