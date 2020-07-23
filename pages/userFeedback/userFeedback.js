// pages/userFeedback/userFeedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: '',
    question1: '1、成功提交反馈的条件是什么？精美礼品怎么送？',
    answer1: '答：意见栏里填写相应意见，QQ为选填项，手机号需输入11为正确手机号，点击右上角对号；如果您提交的反馈意见确实让我们的产品得到了重大提升，我们会通过您留下的联系方式赠送电子礼品（Q币、极客学院精品付费课程及各大网站影视会员等）。',
    question2: '2、为何有的按钮按了之后没反应？',
    answer2: '答：限于我们的服务器原因，有些事件的处理速度不够快，有一定几率出现卡慢的情况，望您谅解。',
    question3: '3、如何删除曾经的历史诊断记录？',
    answer3: '答：在我的主页-查询历史-长按单个历史纪录-弹出对话框-选择确定删除即可。'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user_id: options.id
    });
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
  formSubmit: function(e) {
    //console.log(e.detail.value.userName);
    let content = e.detail.value.content;
    let qq = e.detail.value.userQQ;
    let number = e.detail.value.userNumber;
    if (content.length > 0 && number.length == 11) {

      var that = this;
      let sql_data = {
        table_name: 'feedback_information',
        database: 'AI_doctor',
        sql: "insert into feedback_information(user_id, feedback_content, user_qq,user_number) values('" + that.data.user_id + "', '" + content + "', '" + qq + "', '" + number + "')"
      }

      app.other_get_sql(sql_data).then((res) => {
        wx.showModal({
          title: '提示',
          content: '反馈提交成功！',
          showCancel: false,
          success: function (res) {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
        })
      })

    } else {
      wx.showModal({
        title: '提示',
        content: '请按要求填写反馈信息！',
        showCancel: false, //是否显示取消按钮 false去掉取消按钮
        success: function(res) {
          //console.log(res) 
        }
      })
    }


  }



})