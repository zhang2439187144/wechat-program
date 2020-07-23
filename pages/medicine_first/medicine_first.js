// pages/doctor/doctor.js

var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    medicine_list: ['抗菌消炎类', '肝胆胰用药', '呼吸系统类', '解热镇痛类', '抗过敏用药', '抗寄生虫类', '抗结核及麻风类', '抗肿瘤药', '泌尿系统类', '免疫功能调节', '内分泌及代谢类', '皮肤用药', '清热解毒', '神经系统类', '维生素及营养类', '胃肠疾病类', '心脑血管类', '血液疾病类', '眼科用药', '其它类', '水电解质及酸碱平衡'],
    inputShowed: false, // 是否显示搜索框
    find_city: '全部',
    find_neirong: '科室',
    check_city: '*',
    check_neirong: '*',
    inputVal: '',
    doctor_data: Array()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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



  go_medine: function() {
    wx.navigateTo({
      url: "/pages/medicine/medicine?str="
    })
  },


  toSearch: function() {
    wx.navigateTo({
      url: "/pages/medicine/medicine?str=" + this.data.inputVal
    })
  },

  toMedicine: function(event) {
    wx.navigateTo({
      url: "/pages/medicine/medicine?str=" + event.currentTarget.id
    })
  },


})