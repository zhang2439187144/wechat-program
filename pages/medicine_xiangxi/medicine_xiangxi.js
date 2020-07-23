// pages/medicine_xiangxi/medicine_xiangxi.js


var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    check_name: '',
    pingjia_number: 0,
    medicine_data: Array(),
    data_number: Array(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({  check_name: options.str  });
    // this.setData({ check_name: '一捻金胶囊' });

    let sql_data = {
      table_name: 'drug_information',
      database: 'AI_doctor',
      sql: "SELECT * FROM drug_information WHERE product_name = '" + that.data.check_name + "'"
    }

    app.select_sql(sql_data).then((res) => {
      that.setData({
        medicine_data: app.data.temp_data
      });
    })

    sql_data.table_name = "Drug_evaluation";
    sql_data.sql = "SELECT * FROM Drug_evaluation WHERE drug_name = '" + this.data.check_name + "'";

    app.select_sql(sql_data).then((res) => {
      that.setData({
        data_number: app.data.temp_data
      });
      that.setData({
        pingjia_number: this.data.data_number.length
      });
    })


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

  go_medicine_evaluate: function(event) {
    var that = this;

    wx.navigateTo({
      url: "/pages/medicine_evaluate/medicine_evaluate?str=" + that.data.check_name
    })
  }




})