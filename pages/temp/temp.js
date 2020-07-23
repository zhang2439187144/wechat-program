// pages/temp/temp.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_height: '400px',
    showtab: 0, //顶部选项卡索引
    tabnav: {
      tabnum: 5,
      tabitem: [{
          "id": 0,
          "text": "概要"
        },
        {
          "id": 1,
          "text": "诊断"
        },
        {
          "id": 2,
          "text": "治疗"
        },
        {
          "id": 3,
          "text": "护理"
        }
      ]
    },
    desease_kind: '糖尿病',
    desease_data:Array(),
    isFolded1: true,
    isFolded2: true,
    state: 0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.update_swiper_height();
     that.update_desease_data();
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

  setTab: function(e) {
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: edata.tabindex,
    })
  },

  update_desease_data: function() {
    var that = this;
    let sql_data = {
      table_name: 'desease_detail',
      flag: 'select',
      database: 'AI_doctor',
      sql: "SELECT * FROM desease_detail where desease_name = '" + that.data.desease_kind + "'",
    }
    console.log(sql_data.sql);
    app.select_sql(sql_data).then((res) => {
      that.setData({
        desease_data: app.data.temp_data,
        state: 1
      });
      console.log(that.data.desease_data);
    })
  },
  change1: function (e) {
    this.setData({
      isFolded1: !this.data.isFolded1,
    })
    this.update_swiper_height();
  }, 
  change2: function (e) {
    this.setData({
      isFolded2: !this.data.isFolded2,
    })
    this.update_swiper_height();
  },
  update_swiper_height: function () {
    let query = wx.createSelectorQuery();
    query.select('.items').boundingClientRect(rect => {
      let height = rect.height;
      console.log(height);
      this.setData({
        swiper_height: height+'px'
      })
    }).exec();
  },

})