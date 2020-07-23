// pages/userInfor/userInfor.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    number: '',
    sex: '',
    id: '',
    selectorItems: ['男', '女'],
    selector: '男/女'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    });
    this.select_user_data();
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


  select_user_data: function() {
    var that = this;
    let sql_data = {
      table_name: 'user_information',
      flag: 'select',
      database: 'AI_doctor',
      sql: "SELECT * FROM user_information where weixin_id = '" + that.data.id + "'"
    }
    app.select_sql(sql_data).then((res) => {
      console.log(app.data.temp_data);
      that.setData({
        name: app.data.temp_data[0].name
      });
      that.setData({
        sex: app.data.temp_data[0].sex
      });
      that.setData({
        selector: app.data.temp_data[0].sex
      });
      that.setData({
        number: app.data.temp_data[0].number
      });
    })
  },
  selectorChange: function(e) {
    let i = e.detail.value; //获得选项的数组下标
    let value = this.data.selectorItems[i]; //获得选项的值
    this.setData({
      selector: value
    }); //将选项名称更新到WXML页面上
  },
  formSubmit: function(e) {
    var that = this;
    let name = e.detail.value.userName;
    let number = e.detail.value.userNumber;
    app.data.user_name = name;

    let sql_data = {
      table_name: 'user_information',
      flag: 'update',
      database: 'AI_doctor',
      sql: "UPDATE user_information SET name = '" + name + "' ,sex = '" + that.data.selector + "', number = '" + number + "' where weixin_id = '" + that.data.id + "'"
    }

    app.other_get_sql(sql_data).then((res) => {
      app.data.user_name = name;
      wx.showModal({
        title: '提示',
        content: '修改成功！',
        showCancel: false,
      })
      
    })
  },

  isPoneAvailable:function($poneInput) {  
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
    if (!myreg.test($poneInput.val())) {  
       return false;  
    } else {  
       return true;  
    }  
} ,


  return: function() {
    wx.showModal({
      title: '提示',
      content: '确定退出当前帐号？',
      showCancel: true, //是否显示取消按钮 false去掉取消按钮
      success: function(res) {
        if (res.confirm) {
          app.data.user_id = '777';
          app.data.user_img = 'http://121.36.104.137/get_illness/image/user_img.jpg';
          app.data.user_name = '未登录';
          app.data.user_number = '';
          wx.redirectTo({
            url: "/pages/start/start"
          })
        }
        //console.log(res) 
      }
    })
  }

})