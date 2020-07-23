// pages/text/index.js
// pages/doctor/doctor.js

var util = require('../../utils/util.js');
var TIME = util.formatTime(new Date());
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    classjudge: '',
    inputVal: '',
    article_data: Array(),
    open: false,
    total_number: 0,
    now_number: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      classjudge: options.id1,
      inputVal: options.id2,
      article_data: Array(),
      total_number : 0,
      now_number : 0
    });

    let show_str;
    if (this.data.classjudge == '1') show_str = '疾病类科普文章';
    else if (this.data.classjudge == '2') show_str = '生活类科普文章';
    else if (this.data.classjudge == '3') show_str = '养生类科普文章';
    else if (this.data.classjudge == '4') show_str = '饮食类科普文章';
    else show_str = '医学讲堂';

    wx.setNavigationBarTitle({
      title: show_str,
    });

    this.get_total_number();

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
    
    if(this.data.now_number!=this.data.total_number){
      this.update_article_data();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  toSearch: function() {
    wx.navigateTo({
      url: "/pages/books/index?id1=" + this.data.classjudge + "&id2=" + this.data.inputVal
    })
  },


  get_total_number: function() {
    var that = this;
    let inputVal = this.data.inputVal;
    let classjudge = this.data.classjudge;

    if (inputVal != '') {
      that.setData({
        total_number: '0'
      });
      this.update_article_data();
    } 
    
    else {

      let sql_data = {
        table_name: 'article_detail',
        flag: 'count',
        database: 'AI_doctor',
        sql: "SELECT COUNT(*) as total FROM article_detail order by time desc",
      }

      if (inputVal == '' && classjudge == '') {
        sql_data.sql = "SELECT COUNT(*) as total FROM article_detail order by time desc";
      } else if (inputVal != '' && classjudge == '') {
        sql_data.sql = "SELECT COUNT(*) as total FROM article_detail WHERE title LIKE '%" + inputVal + "%' ORDER BY REPLACE(title,'" + inputVal + "','')";
      } else if (inputVal == '' && classjudge != '') {
        sql_data.sql = "SELECT COUNT(*) as total FROM article_detail WHERE classify = '" + classjudge + "' order by time desc";
      } else {
        sql_data.sql = "SELECT COUNT(*) as total FROM article_detail WHERE classify = '" + classjudge + "' and title LIKE '%" + inputVal + "%' ORDER BY REPLACE(title,'" + inputVal + "','')";
      }

      app.count_sql(sql_data).then((res) => {
        that.setData({
          total_number: app.data.temp_data
        });
        this.update_article_data();
      })

    }
  },



  update_article_data: function() {
    var that = this;

    let temp_number = 5;
    let total_number = this.data.total_number;
    let now_number = this.data.now_number;
    let limit_str;

    if (total_number == 0) limit_str = '';
    else {
      if (temp_number + now_number > total_number) temp_number = total_number - now_number;
      limit_str = "limit " + now_number + " , " + temp_number;
    }

    let sql_data = {
      table_name: 'article_detail',
      flag: 'select',
      database: 'AI_doctor',
      sql: '',
    }

    let inputVal = this.data.inputVal;
    let classjudge = this.data.classjudge;
    if (inputVal == '' && classjudge == '') {
      sql_data.sql = "SELECT * FROM article_detail order by time desc " + limit_str;
    } else if (inputVal != '' && classjudge == '') {
      sql_data.sql = "SELECT * FROM article_detail WHERE title LIKE '%" + inputVal + "%' ORDER BY REPLACE(title,'" + inputVal + "','')";
    } else if (inputVal == '' && classjudge != '') {
      sql_data.sql = "SELECT * FROM article_detail WHERE classify = '" + classjudge + "' order by time desc " + limit_str;
    } else {
      sql_data.sql = "SELECT * FROM article_detail WHERE classify = '" + classjudge + "' and title LIKE '%" + inputVal + "%' ORDER BY REPLACE(title,'" + inputVal + "','')";
    }

    app.select_sql(sql_data).then((res) => {
      that.setData({
        article_data: that.data.article_data.concat(app.data.temp_data),
        now_number: now_number + temp_number  
      });
      console.log(that.data.now_number);

    })
  },



  gotext: function(event) {

    console.log(event.currentTarget.id);
    wx.navigateTo({
      url: "/pages/article_1/index?id=" + event.currentTarget.id
    })
  },

  goclass: function(event) {

    console.log("get_id:" + event.currentTarget.id);
    this.setData({
      classjudge: event.currentTarget.id
    });
    let res=Array();
    res.id1 = this.data.classjudge;
    res.id2 = this.data.inputVal;
    console.log(res);
    this.onLoad(res);
    
  },




  tap_ch: function(e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  }
})