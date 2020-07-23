//index.js
//获取应用实例
const app = getApp()
var wxCharts = require('../../utils/wxcharts.js');
var pieChart = null;

Page({
  data: {
    history_data: Array(),
    history_count: 0,
    healthy: -999,
    showtab: 0, //顶部选项卡索引
    tabnav: {
      tabnum: 4,
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

    tabnav_2: {
      tabnum: 6,
      tabitem: [{
        "id": 0,
        "text": "糖尿病"
      },
      {
        "id": 1,
        "text": "心律失常"
      },
      {
        "id": 2,
        "text": "高血压"
      },
      {
        "id": 3,
        "text": "胃炎"
      },
      {
        "id": 4,
        "text": "哮喘"
      },
      {
        "id": 5,
        "text": "慢阻病"
      }
      ]
    },

    desease_kind: '',
    desease_data: Array(),
    isFolded1: true,
    isFolded2: true,
    swiper_height: '',
    toView: '',
    state: 0,

  },
  //事件处理函数
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var cont = JSON.parse(e.result);
    let health = e.res;
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(cont);
    console.log(cont[0].name);
    if (health > 1) {
      console.log('??其他病症');
      this.setData({
        healthy: 1
      });
    } else {
      console.log('??六种病症');
      this.setData({
        healthy: 0
      });
      var windowWidth = 320;
      try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      pieChart = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas',
        type: 'pie',
        series: cont,
        width: windowWidth - 50,
        height: 270,
        dataLabel: true,
      });
      console.log("？？一脸懵逼");
      console.log(this.data.healthy);
    }
    let str = cont[0].name.replace(/[\r\n]/g, "");
    this.setData({
      desease_kind: str
    });
    this.update_desease_data();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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

  rejudge: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  returnindex: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  setTab: function(e) {
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: edata.tabindex,
      toView: 'here'
    })
    this.update_swiper_height();
    
  },
  swiperChange: function(e) {
    const edata = e.detail.current;
    this.setData({
      showtab: edata,
    })
    this.update_swiper_height();
  },

  update_desease_data: function() {
    var that = this;
    let sql_data = {
      table_name: 'desease_detail',
      flag: 'select',
      database: 'AI_doctor',
      sql: "SELECT * FROM desease_detail where desease_name = '" + that.data.desease_kind + "'",
    }
    if (that.data.healthy == 1) {
      sql_data.sql="SELECT * FROM desease_detail";
    }

    console.log(sql_data.sql);
    app.select_desease_sql(sql_data).then((res) => {
      that.setData({
        desease_data: app.data.temp_data,
        state: 1
      });
      console.log(that.data.desease_data);
      this.update_swiper_height();
    })
  },
  change1: function(e) {
    this.setData({
      isFolded1: !this.data.isFolded1,
    })
    this.update_swiper_height();
  },
  change2: function(e) {
    this.setData({
      isFolded2: !this.data.isFolded2,
    })
    this.update_swiper_height();
  },

  update_swiper_height: function() {
    let temp = 'h1';
    if (this.data.healthy == 0)
    {
      temp = '#page' + this.data.showtab; 
    }
    if (this.data.healthy == 1) {
      temp = '#page1' + this.data.showtab;
    }
    console.log(temp);
    let query = wx.createSelectorQuery();
    query.select(temp).boundingClientRect(rect => {
      let height = rect.height;
      console.log(height);
      this.setData({
        swiper_height: height + 'px'
      })
    }).exec();
  },

})