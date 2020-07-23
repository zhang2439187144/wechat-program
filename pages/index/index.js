//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    banner: Array(),

    loadingHidden: false, // loading
    user_flag : '1',
    swiperCurrent: 0,
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,

    scrollTop: 0,
    loadingMoreHidden: true,

    coupons: [],

    curPage: 1,
    pageSize: 20,
    cateScrollTop: 0
  },

  tabClick: function(e) {
    let offset = e.currentTarget.offsetLeft;
    if (offset > 150) {
      offset = offset - 150
    } else {
      offset = 0;
    }
    this.setData({
      activeCategoryId: e.currentTarget.id,
      curPage: 1,
      cateScrollTop: offset
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  //事件处理函数
  swiperchange: function(e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  bindTypeTap: function(e) {
    this.setData({
      selectCurrent: e.index
    })
  },



  onLoad: function(e) {
    this.getNotice(),
    this.update_article_data(),
    this.setData({ user_flag: app.data.user_flag });

    console.log("user_flag:" + this.data.user_flag);

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
  },

  onShareAppMessage: function() {
    return {
      title: "智能诊断助手",
      path: '/pages/index/index'
    }
  },
  getNotice: function() {
    var that = this;

    let sql_data = {
      table_name: 'noticeList',
      database: 'AI_doctor',
      sql: "SELECT * FROM noticeList"
    }

    app.select_sql(sql_data).then((res) => {
      that.setData({
        noticeList: app.data.temp_data
      });
      console.log(this.data.noticeList);
    })

  },


  goDoctor: function() {
    wx.navigateTo({
      url: "/pages/doctor/doctor_1"
    })
  },

  goDiagnose: function () {
    wx.navigateTo({
      url: "/pages/diagnose/diagnose_1"
    })
  },


  goMedicine: function() {
    // app.send_short_messages("17155017700", "1");
    
    wx.navigateTo({
      url: "/pages/medicine_first/medicine_first"
    })
  },
  goIlliness: function() {
    wx.navigateTo({
      url: "/pages/judge/judge"
    })
  },
  goBook: function() {
    wx.navigateTo({ url: '/pages/books/index?id1=&id2=' });
  },
  ppt_Go_Book: function(event) {
    console.log(event.currentTarget.id);
    wx.navigateTo({
      url: "/pages/article_1/index?id=" + event.currentTarget.id
    })
  },

  update_article_data: function() {
    var that = this;
    let sql_data = {
      table_name: 'article_detail',
      flag: 'select',
      database: 'AI_doctor',
      sql: "SELECT * FROM article_detail order by time desc LIMIT 0 , 5"
    }
    app.select_sql(sql_data).then((res) => {
      that.setData({
        banner: app.data.temp_data
      });
      console.log(that.data.banner);

    })
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
   },
  
  

})