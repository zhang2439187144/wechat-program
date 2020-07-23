// pages/notice/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice_data: Array(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let that = this;
    // that.select_data();

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

  select_data: function() {
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
    })
  }




})