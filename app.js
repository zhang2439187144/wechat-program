App({
  data: {
    user_id: '777',
    user_img: 'http://121.36.104.137/get_illness/image/user_img.jpg',
    user_name: '未登录',
    user_sex: '',
    user_number: '',
    user_flag : '1',
    temp_data: Array()
  },
  navigateToLogin: false,
  onLaunch: function () {
  },

  goLoginPageTimeOut: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 600)
  },

  goStartIndexPage: function () {
    setTimeout(function () {
      wx.redirectTo({
        url: "/pages/start/start"
      })
    }, 1000)
  },
  onShow(e) {
  },
  globalData: {
    isConnected: true,
    launchOption: undefined,
    vipLevel: 0
  },

  select_sql: function (canshu) {
    var that = this;
    return new Promise(function (resolve, reject) {

      wx.showLoading({
        title: '加载中...',
      })

      wx.request({
        url: 'http://121.36.104.137/mysql.php',
        data: {
          table_name: canshu.table_name,
          flag: 'select',
          database: canshu.database,
          sql: canshu.sql
        },
        header: {
          'content-type': 'application/json; charset=utf-8' // 默认值
        },
        success: function (res) {

          console.log(res.data);

          let flag = String(res.data);
          if (flag == "Error creating database: " || flag.slice(0, 5) == "Error") {
            that.data.temp_data = Array();
          } else {
            that.data.temp_data = res.data;
          }

          resolve();
        },
        complete: function () {
          wx.hideLoading()
        }
      });
    });
  },

  //病症详细信息
  select_desease_sql: function (canshu) {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://121.36.104.137/mysql.php',
        data: {
          table_name: canshu.table_name,
          flag: 'select',
          database: canshu.database,
          sql: canshu.sql
        },
        header: {
          'content-type': 'application/json; charset=utf-8' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          let flag = String(res.data);
          if (flag == "Error creating database: " || flag.slice(0, 5) == "Error") {
            that.data.temp_data = Array();
          } else {
            that.data.temp_data = res.data;
          }
          resolve();
        },
        complete: function () {
        }
      });
    });
  },


  select_chat_sql: function (canshu) {
    var that = this;
    return new Promise(function (resolve, reject) {

      wx.request({
        url: 'http://121.36.104.137/mysql.php',
        data: {
          table_name: canshu.table_name,
          flag: 'select',
          database: canshu.database,
          sql: canshu.sql
        },
        header: {
          'content-type': 'application/json; charset=utf-8' // 默认值
        },
        success: function (res) {
          let flag = String(res.data);
          if (flag == "Error creating database: " || flag.slice(0, 5) == "Error") {
            that.data.temp_data = Array();
          } else {
            that.data.temp_data = res.data;
          }

          resolve();
        },
      });
    });
  },

  count_sql: function (canshu) {
    var that = this;
    return new Promise(function (resolve, reject) {

      wx.showLoading({
        title: '加载中...',
      })

      wx.request({
        url: 'http://121.36.104.137/mysql.php',
        data: {
          table_name: canshu.table_name,
          flag: 'count',
          database: canshu.database,
          sql: canshu.sql
        },
        header: {
          'content-type': 'application/json; charset=utf-8' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          that.data.temp_data = res.data;
          resolve();
        },
        complete: function () {
          wx.hideLoading()
        }
      });
    });
  },


  other_sql: function (canshu) {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://121.36.104.137/mysql.php',
        data: {
          table_name: canshu.table_name,
          flag: 'insert',
          database: canshu.database,
          sql: canshu.sql
        },
        success: function (res) {
          that.data.temp_data = res.data;
          console.log(res.data);
        },
      })
    });
  },

  running_sql: function (canshu) {
    var that = this;
    return new Promise(function (resolve, reject) {

      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'http://121.36.104.137/mysql.php',
        data: {
          table_name: canshu.table_name,
          flag: canshu.flag,
          database: canshu.database,
          sql: canshu.sql
        },
        header: {
          'content-type': 'application/json; charset=utf-8' // 默认值
        },
        success: function (res) {
          that.data.temp_data = res.data;
          resolve();
        },
        complete: function () {
          wx.hideLoading()
        }
      });
    });
  },

  send_short_messages: function (phone_number, messages_id) {
    var that = this;
    let tpl_id;
    if (messages_id == '1') tpl_id = '169287';
    else tpl_id = '169288';

    wx.request({
      url: 'https://http://121.36.104.137/proxy/?appkey=hotapp671239295&url=http://v.juhe.cn/sms/send',
      data: {
        mobile: phone_number,
        tpl_id: tpl_id,
        key: '9002c9012a723973673b540aabedbe9d'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("send_message:");
        console.log(res.data);
      }
    })
  },

  other_get_sql: function (canshu) {
    var that = this;
    return new Promise(function (resolve, reject) {

      wx.showLoading({
        title: '加载中...',
      })

      wx.request({
        url: 'http://121.36.104.137/mysql.php',
        data: {
          table_name: canshu.table_name,
          flag: 'insert',
          database: canshu.database,
          sql: canshu.sql
        },
        header: {
          'content-type': 'application/json; charset=utf-8' // 默认值
        },
        success: function (res) {

          console.log(res.data);

          resolve();
        },
        complete: function () {
          wx.hideLoading()
        }
      });
    });
  },









})