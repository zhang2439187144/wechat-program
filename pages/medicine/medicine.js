// pages/doctor/doctor.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    neirong_list: ['抗菌消炎类', '肝胆胰用药', '呼吸系统类', '解热镇痛类', '抗过敏用药', '抗寄生虫类', '抗结核及麻风类', '抗肿瘤药', '泌尿系统类', '免疫功能调节', '内分泌及代谢类', '皮肤用药', '清热解毒', '神经系统类', '维生素及营养类', '胃肠疾病类', '心脑血管类', '血液疾病类', '眼科用药', '其它类', '水电解质及酸碱平衡'],
    inputShowed: false, // 是否显示搜索框
    find_city: '全部',
    find_neirong: '全部药品',
    check_city: '*',
    inputVal: '',
    check_neirong: '*',
    doctor_data: Array(),
    total_number : 0,
    now_number : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {

    let str = String(options.str);
    let number = str.lastIndexOf("*");
    let top_check_neirong = '*';
    let top_inputVal = '搜索';

    if (number == -1) {
      if (str == ' ') top_inputVal = "搜索";
      else if (str == '12' || str == '0' || str == '2' || str == '18' || str == '11' || str == '5' || str == '9' || str == '4') {
        top_check_neirong = this.data.neirong_list[options.str];
      } else top_inputVal = str;
    } else {
      top_inputVal = str.slice(0, number);
      let temp_str = str.slice(number + 1, str.length);
      top_check_neirong = temp_str;
    }

    this.setData({
      inputVal: top_inputVal
    });
    this.setData({
      check_neirong: top_check_neirong
    });

    if (top_check_neirong != '*') this.setData({
      find_neirong: top_check_neirong
    });
    else this.setData({
      find_neirong: "全部药品"
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
    
    if (this.data.now_number != this.data.total_number){
      this.update_doctor_data();
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


  get_total_number : function(){

    let Search_str = this.data.inputVal;
    var that = this;
    let neirong = this.data.check_neirong;
    let city = this.data.check_city;
    let sql_str;

    if (Search_str == '搜索') {
      if (neirong == '*')
        sql_str = "SELECT COUNT(*) as total FROM drug_information";
      else
        sql_str = "SELECT COUNT(*) as total FROM drug_information WHERE drug_classification = '" + neirong + "'";
    } else {
      if (neirong == '*')
        sql_str = "SELECT COUNT(*) as total FROM drug_information WHERE product_name LIKE '%" + Search_str + "%' ORDER BY REPLACE(product_name,'" + Search_str + "','')";

      else
        sql_str = "SELECT COUNT(*) as total FROM drug_information WHERE drug_classification = '" + neirong + "' and product_name LIKE '%" + Search_str + "%' ORDER BY REPLACE(product_name,'" + Search_str + "','')";
    }

    let sql_data = {
      table_name: 'drug_information',
      database: 'AI_doctor',
      sql: sql_str
    }

    app.count_sql(sql_data).then((res) => {
      that.setData({
        total_number: app.data.temp_data
      });
      this.update_doctor_data();
    })


  },


  change_neirong: function(e) {
    let i = e.detail.value; //获得选项的数组下标
    let value = this.data.neirong_list[i]; //获得选项的值

    if (value == "全部药品") this.data.check_neirong = "*";
    else this.data.check_neirong = value;

    console.log("check_neirong:" + this.data.check_neirong);

    this.setData({
      find_neirong: value
    }); //将选项名称更新到WXML页面上

    console.log("change_neirong");

    this.setData({
      doctor_data: Array(),
      now_number: 0
    });
    this.get_total_number();
  
    this.update_doctor_data();
  },

  update_doctor_data: function() {
    let Search_str = this.data.inputVal;
    var that = this;
    let neirong = this.data.check_neirong;
    let city = this.data.check_city;
    let sql_str;
    

    let temp_number = 10;
    let total_number = this.data.total_number;
    let now_number = this.data.now_number;

    if (temp_number + now_number > total_number) temp_number = total_number - now_number;

    let limit_str = "limit " + now_number + " , " + temp_number;

    if (Search_str == '搜索') {
      if (neirong == '*')
        sql_str = "SELECT * FROM drug_information " + limit_str;
      else
        sql_str = "SELECT * FROM drug_information WHERE drug_classification = '" + neirong + "'" + limit_str;
    } else {
      if (neirong == '*')
        sql_str = "SELECT * FROM drug_information WHERE product_name LIKE '%" + Search_str + "%' ORDER BY REPLACE(product_name,'" + Search_str + "','')" + limit_str;

      else
        sql_str = "SELECT * FROM drug_information WHERE drug_classification = '" + neirong + "' and product_name LIKE '%" + Search_str + "%' ORDER BY REPLACE(product_name,'" + Search_str + "','')" ;
    }

    let sql_data = {
      table_name: 'drug_information',
      database: 'AI_doctor',
      sql: sql_str
    }

    app.select_sql(sql_data).then((res) => {
      that.setData({
        doctor_data: that.data.doctor_data.concat(app.data.temp_data),
        now_number: now_number + temp_number
      });

      console.log("now_number:" + that.data.now_number);

    })

  },

  go_medine_xiangxi: function(event) {

    console.log(event.currentTarget.id);

    wx.navigateTo({
      url: "/pages/medicine_xiangxi/medicine_xiangxi?str=" + event.currentTarget.id
    })
  },

  toSearch: function() {

    let url_Str;
    let check_neirong = this.data.check_neirong;
    if (check_neirong == "*")
      url_Str = "/pages/medicine/medicine?str=" + this.data.inputVal;
    else
      url_Str = "/pages/medicine/medicine?str=" + this.data.inputVal + "*" + check_neirong;
    wx.navigateTo({
      url: url_Str
    })
  },


})