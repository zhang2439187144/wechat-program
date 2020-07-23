// pages/medicine_evaluate/medicine_evaluate.js
var util = require('../../utils/util.js');
var TIME = util.formatTime(new Date());

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    no_Collection : 0,
    check_name: '',
    user_id: app.data.user_id,
    user_name: app.data.user_name,
    user_image: app.data.user_image,
    message: '',
    evaluate_data: Array()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      check_name: options.str
    });

    this.setData({
      user_id: app.data.user_id
    });
    this.setData({
      user_name: app.data.user_name
    });
    this.setData({
      user_image: app.data.user_img
    });


    // this.setData({ check_name: '功劳去火片' });


    this.update_drug_data();
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


  bindChange(res) {
    this.setData({
      message: res.detail.value
    })
  },

  cleanInput() {
    //button会自动清空，所以不能再次清空而是应该给他设置目前的input值
    this.setData({
      message: this.data.message
    });
  },

  send: function() {

    var that = this;

    console.log(this.data.message);

    let uer_data = {
      drug_name: this.data.check_name,
      user_id: this.data.user_id,
      user_name: this.data.user_name,
      user_image: this.data.user_image,
      evaluation_time: String(TIME),
      evaluation_str: this.data.message
    }

    let sql_data = {
      table_name: 'drug_information',
      database: 'AI_doctor',
      sql: "INSERT INTO `AI_doctor`.`Drug_evaluation` (`drug_name`, `user_id`, `user_name`, `user_image`, `evaluation_time`, `evaluation_str`) VALUES ('" + uer_data.drug_name + "', '" + uer_data.user_id + "', '" + uer_data.user_name + "', '" + uer_data.user_image + "', '" + uer_data.evaluation_time + "', '" + uer_data.evaluation_str + "');"
    }

    app.other_get_sql(sql_data).then((res) => {
      that.update_drug_data();
    })

  },


  update_drug_data: function(Search_str) {

    var that = this;
    let drug_name = this.data.check_name;
    let sql_data = {
      table_name: 'Drug_evaluation',
      database: 'AI_doctor',
      sql: "SELECT * FROM Drug_evaluation WHERE drug_name = '" + drug_name + "'"
    }

    app.select_sql(sql_data).then((res) => {
      that.setData({
        evaluate_data: app.data.temp_data
      });

      if (this.data.evaluate_data.length == 0){
        that.setData({  no_Collection: 1  });
      }
      else{
        that.setData({ no_Collection: 0 });
      }
    })

  },




})