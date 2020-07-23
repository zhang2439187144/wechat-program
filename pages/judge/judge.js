//index.js
//获取应用实例
const app = getApp()
var wxCharts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');

var pieChart = null;
Page({
  data: {
    img: 'http://121.36.104.137/get_illness/image/logo.png',
    id: app.data.user_id,
    state: 'left',
    animation_css: 'ease',
    cont: '',

    showtab: 0, //顶部选项卡索引
    tabnav: {
      tabnum: 8,
      tabitem: [{
        "id": 0, "text": "常见"
      },
      {
        "id": 1, "text": "头部"
      },
      {
        "id": 2, "text": "颈部"
      },
      {
        "id": 3, "text": "肩部"
      },
        {
          "id": 4, "text": "胸部"
        },
        {
          "id": 5, "text": "腹部"
        },
        {
          "id": 6, "text": "臀部"
        },
        {
          "id": 7, "text": "骨盆"
        },
      ]
    },
    
    hot: [
        { name: '0', value: '胃痛', checked: false, },
        { name: '1', value: '脾气暴怒', checked: false, },
        { name: '2', value: '食量减少', checked: false, },
        { name: '3', value: '多食', checked: false, },
        { name: '4', value: '四肢冷', checked: false, },
        { name: '5', value: '呼吸困难', checked: false, },
        { name: '6', value: '体重下降', checked: false, },
        { name: '7', value: '四肢无力', checked: false, },
        { name: '8', value: '多饮', checked: false, },],

    head: [
        { name: '0', value: '晨起眼皮肿', checked: false, },
        { name: '1', value: '头发脱落', checked: false, },
        { name: '2', value: '头昏目眩', checked: false, },
        { name: '3', value: '头痛', checked: false, },
        { name: '4', value: '头重脚轻感', checked: false, },
        { name: '5', value: '鼻出血', checked: false, },
        ],

    neck: [
        { name: '0', value: '脖子疼痛', checked: false, },
        { name: '1', value: '淋巴结疼痛', checked: false, },
        { name: '2', value: '淋巴结肿胀或增大', checked: false, },
        { name: '3', value: '毛细血管扩张', checked: false, },
        { name: '4', value: '蜘蛛痣样皮疹', checked: false, },],

shoulder: [
        { name: '0', value: '肩部疼痛（不适）', checked: false, },
        { name: '1', value: '肩部麻痹', checked: false, },
        { name: '2', value: '肩部有红疹', checked: false, },],

    chest: [
        { name: '0', value: '心悸', checked: false, },
        { name: '1', value: '胸闷', checked: false, },
        { name: '2', value: '心慌', checked: false, },
        { name: '3', value: '心动过速', checked: false, },
        { name: '4', value: '呼吸困难', checked: false, },
        { name: '5', value: '咳痰', checked: false, },
      { name: '6', value: '心动过缓', checked: false, },
        { name: '7', value: '气喘', checked: false, },
      { name: '8', value: '心跳无规律', checked: false, },
        { name: '9', value: '心脏压迫感', checked: false, },
        { name: '10', value: '胸口不适', checked: false, },
        { name: '11', value: '胸口沉重感', checked: false, },
        { name: '12', value: '缺氧', checked: false, },
        { name: '13', value: '胸口酸痛', checked: false, },
        { name: '14', value: '胸口疼痛', checked: false, },],

    abdomen: [
        { name: '0', value: '胃痛', checked: false, },
        { name: '1', value: '肠痉挛', checked: false, },
        { name: '2', value: '肚脐周围疼痛', checked: false, },
        { name: '3', value: '胃绞痛', checked: false, },
      { name: '4', value: '食欲不振', checked: false, },
      { name: '5', value: '腹部胀满', checked: false, },
        { name: '6', value: '腹部大小发生改变', checked: false, },
        { name: '7', value: '腹部膨隆', checked: false, },
        { name: '8', value: '腹部有肿块', checked: false, },
        { name: '9', value: '心脏压迫感', checked: false, },
        { name: '10', value: '腹部胀气', checked: false, },
        { name: '11', value: '干呕', checked: false, },
        { name: '12', value: '呕吐', checked: false, },
        { name: '13', value: '呕血', checked: false, },
        { name: '14', value: '胃痉挛', checked: false, },],

    hip: [
        { name: '0', value: '臀部肌肉疼痛', checked: false, },
        { name: '1', value: '臀部及胯部疼痛', checked: false, },
        { name: '2', value: '臀部疼痛', checked: false, },
        { name: '3', value: '臀部出现红疹', checked: false, },],

    hipss: [
        { name: '0', value: '尿床', checked: false, },
        { name: '1', value: '排尿困难', checked: false, },
        { name: '2', value: '多尿', checked: false, },
        { name: '3', value: '夜间尿量增多', checked: false, },
        { name: '4', value: '尿流量小', checked: false, },
        { name: '5', value: '尿频', checked: false, },
        { name: '6', value: '尿急', checked: false, },
        { name: '7', value: '尿不尽', checked: false, },],

    content_final: '',
    content_0: '',
    content_1: '',
    content_2: '',
    content_3: '',
    content_4: '',
    content_5: '',
    content_6: '',
    content_7: '',


    desease_kind: '',

    swiper_height: '',
    toView: '',
    state: 0,

  },

  checkboxChange_0: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let temp = String(e.detail.value);
    console.log('value值为：', temp)
    this.setData({
      content_0: temp + ","
    })
    this.get_content_final();
  },
  checkboxChange_1: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let temp = String(e.detail.value);
    console.log('value值为：', temp)
    this.setData({
      content_1: temp + ","
    })
    this.get_content_final();
  },
  checkboxChange_2: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let temp = String(e.detail.value);
    console.log('value值为：', temp)
    this.setData({
      content_2: temp + ","
    })
    this.get_content_final();
  },
  checkboxChange_3: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let temp = String(e.detail.value);
    console.log('value值为：', temp)
    this.setData({
      content_3: temp + ","
    })
    this.get_content_final();
  },

  checkboxChange_4: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let temp = String(e.detail.value);
    console.log('value值为：', temp)
    this.setData({
      content_4: temp + ","
    })
    this.get_content_final();
  },
  checkboxChange_5: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let temp = String(e.detail.value);
    console.log('value值为：', temp)
    this.setData({
      content_5: temp + ","
    })
    this.get_content_final();
  },
  checkboxChange_6: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let temp = String(e.detail.value);
    console.log('value值为：', temp)
    this.setData({
      content_6: temp + ","
    })
    this.get_content_final();
  },
  checkboxChange_7: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let temp = String(e.detail.value);
    console.log('value值为：', temp)
    this.setData({
      content_7: temp+","
    })
    this.get_content_final();
  },

  get_content_final: function (e) {
    this.setData({
      content_final: this.data.content_0  +  this.data.content_1 +  this.data.content_2 +  this.data.content_3 +  this.data.content_4 +  this.data.content_5 +  this.data.content_6 +  this.data.content_7
    })
    console.log("content_final="+this.data.content_final)
  },

  setTab: function (e) {
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: edata.tabindex,
      toView: 'here'
    })
    this.update_swiper_height();

  },
  swiperChange: function (e) {
    const edata = e.detail.current;
    this.setData({
      showtab: edata,
    })
    this.update_swiper_height();
  },

  update_swiper_height: function () {
    let temp = '#page' + this.data.showtab;
    // let temp = '#page0';
    let query = wx.createSelectorQuery();
    query.select(temp).boundingClientRect(rect => {
      let height = rect.height;
      console.log(height);
      this.setData({
        swiper_height: height + 'px'
      })
    }).exec();
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    let that = this;
    // that.left();
    that.update_swiper_height();
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
    this.update_swiper_height();
    let that = this;
    let userId = app.data.user_id;
    that.setData({
      id: userId,
    })
    that.setData({
      cont: '',
      content_final: '',
      content_0: '',
      content_1: '',
      content_2: '',
      content_3: '',
      content_4: '',
      content_5: '',
      content_6: '',
      content_7: '',
      hot: [
        { name: '0', value: '胃痛', checked: false, },
        { name: '1', value: '脾气暴怒', checked: false, },
        { name: '2', value: '食量减少', checked: false, },
        { name: '3', value: '多食', checked: false, },
        { name: '4', value: '四肢冷', checked: false, },
        { name: '5', value: '呼吸困难', checked: false, },
        { name: '6', value: '体重下降', checked: false, },
        { name: '7', value: '四肢无力', checked: false, },
        { name: '8', value: '多饮', checked: false, },],

      head: [
        { name: '0', value: '晨起眼皮肿', checked: false, },
        { name: '1', value: '头发脱落', checked: false, },
        { name: '2', value: '头昏目眩', checked: false, },
        { name: '3', value: '头痛', checked: false, },
        { name: '4', value: '头重脚轻感', checked: false, },
        { name: '5', value: '鼻出血', checked: false, },
      ],

      neck: [
        { name: '0', value: '脖子疼痛', checked: false, },
        { name: '1', value: '淋巴结疼痛', checked: false, },
        { name: '2', value: '淋巴结肿胀或增大', checked: false, },
        { name: '3', value: '毛细血管扩张', checked: false, },
        { name: '4', value: '蜘蛛痣样皮疹', checked: false, },],

      shoulder: [
        { name: '0', value: '肩部疼痛（不适）', checked: false, },
        { name: '1', value: '肩部麻痹', checked: false, },
        { name: '2', value: '肩部有红疹', checked: false, },],

      chest: [
        { name: '0', value: '心悸', checked: false, },
        { name: '1', value: '胸闷', checked: false, },
        { name: '2', value: '心慌', checked: false, },
        { name: '3', value: '心动过速', checked: false, },
        { name: '4', value: '呼吸困难', checked: false, },
        { name: '5', value: '咳痰', checked: false, },
        { name: '6', value: '心动过缓', checked: false, },
        { name: '7', value: '气喘', checked: false, },
        { name: '8', value: '心跳无规律', checked: false, },
        { name: '9', value: '心脏压迫感', checked: false, },
        { name: '10', value: '胸口不适', checked: false, },
        { name: '11', value: '胸口沉重感', checked: false, },
        { name: '12', value: '缺氧', checked: false, },
        { name: '13', value: '胸口酸痛', checked: false, },
        { name: '14', value: '胸口疼痛', checked: false, },],

      abdomen: [
        { name: '0', value: '胃痛', checked: false, },
        { name: '1', value: '肠痉挛', checked: false, },
        { name: '2', value: '肚脐周围疼痛', checked: false, },
        { name: '3', value: '胃绞痛', checked: false, },
        { name: '4', value: '食欲不振', checked: false, },
        { name: '5', value: '腹部胀满', checked: false, },
        { name: '6', value: '腹部大小发生改变', checked: false, },
        { name: '7', value: '腹部膨隆', checked: false, },
        { name: '8', value: '腹部有肿块', checked: false, },
        { name: '9', value: '心脏压迫感', checked: false, },
        { name: '10', value: '腹部胀气', checked: false, },
        { name: '11', value: '干呕', checked: false, },
        { name: '12', value: '呕吐', checked: false, },
        { name: '13', value: '呕血', checked: false, },
        { name: '14', value: '胃痉挛', checked: false, },],

      hip: [
        { name: '0', value: '臀部肌肉疼痛', checked: false, },
        { name: '1', value: '臀部及胯部疼痛', checked: false, },
        { name: '2', value: '臀部疼痛', checked: false, },
        { name: '3', value: '臀部出现红疹', checked: false, },],

      hipss: [
        { name: '0', value: '尿床', checked: false, },
        { name: '1', value: '排尿困难', checked: false, },
        { name: '2', value: '多尿', checked: false, },
        { name: '3', value: '夜间尿量增多', checked: false, },
        { name: '4', value: '尿流量小', checked: false, },
        { name: '5', value: '尿频', checked: false, },
        { name: '6', value: '尿急', checked: false, },
        { name: '7', value: '尿不尽', checked: false, },],
    })
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

  formReset: function() {
    console.log('reset');
  },
  formSubmit: function(e) {

    var that = this;
    var content1 = e.detail.value.content + this.data.content_final;

    console.log("str:" + content1);
    if (content1.length < 3) {
      content1 = '我没病';
    }

      wx.showModal({
        title: '提示',
        content: '点击确定后，请稍微等待一会儿...',
        showCancel: false, //是否显示取消按钮 false去掉取消按钮
        success: function(res) {
          //console.log(res)
          wx.showLoading({
            title: '加载中...',
          })
        }
      })
      console.log("one");
      wx.request({
        url: 'https://121.36.104.137/get_illness/request.php', 
        data: { //请求数据
          content: content1,
        },
        header: { //请求头
          "Content-Type": "applciation/json"
        },
        method: "GET", //get为默认方法/POST
        success: function(res) { //收到开发者服务成功返回的回调函数
          console.log("怎么肥四????")
          console.log("success!")
          console.log(res.data)
          console.log(res)

          if (res.data.content[1] == -2) {
            console.log("健康");
            let health = '没有患本小程序诊断的六种疾病';
            let health_result = [{
              name: '没有患本小程序诊断的六种疾病',
              data: 2
            }];
            if (that.data.id != '777')
              that.insert_history(content1, health);
            wx.navigateTo({
              url: '/pages/judge_result/judge_result?result=' + JSON.stringify(health_result) + '&res=2'
            })
          } else {
            console.log("不健康");
            let leng = res.data.content.length;
            let tempcontent = res.data.content;

            let ill_reeult = '';
            var result = [{
              name: ' ',
              data: 0
            }];
            let i;
            var tempdata=0.0;
            for (i = 0; i < leng / 2; i++) {
              let temp = parseFloat(tempcontent[i + leng / 2]);
              temp *= 100;
              temp = temp.toFixed(2);
              let tempcontenti;
              if(tempcontent[i]==1){
                tempcontenti="糖尿病"
              }
              if(tempcontent[i]==2){
                tempcontenti="高血压"
              }
              if(tempcontent[i]==3){
                tempcontenti="慢性阻塞性肺病"
              }
              if(tempcontent[i]==4){
                tempcontenti="心律失常"
              }
              if(tempcontent[i]==5){
                tempcontenti="哮喘"
              }
              if(tempcontent[i]==6){
                tempcontenti="胃炎"
              }
              console.log(tempcontenti);
              result.push({
                name: tempcontenti,
                data: tempcontent[i + leng / 2] * 100
              });
              tempdata += temp;
              ill_reeult += tempcontenti;
              ill_reeult += '%' + temp;
              //ill_reeult += '\n';
            }
            tempdata = 100.0-tempdata;
            console.log(tempdata)
            result.push({
              name: '其他病症',
              data: tempdata
            });
            console.log(result)
            result.splice(0, 1);
            //console.log(result);
            that.setData({
              result: result,
            })
            console.log("???"+result);
            if (that.data.id != '777')
              that.insert_history(content1, ill_reeult);
            wx.navigateTo({
              url: '/pages/judge_result/judge_result?result=' + JSON.stringify(result) + '&res=1'
            })
          }
        },
        fail: function() { //接口调用失败的回调函数
          console.log("fail!")
        },
        complete: function() { //接口调用结束的回调函数（调用成功、失败都会执行）s
          console.log("complete")
          wx.hideLoading()
        }
      })
  },

  insert_history: function(content, result) {
    var that = this;
    let time = String(util.formatTime(new Date()));
    let sql_data = {
      table_name: 'judge_hisory',
      database: 'AI_doctor',
      sql: "insert into judge_hisory(user_id, judge_time, judge_content,judge_result) values('" + that.data.id + "', '" + time + "', '" + content + "', '" + result + "')"
    }
    app.other_sql(sql_data);
  },

  start: function() {
    let that = this;
    that.left();
  },
  left: function() {
    let that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: that.data.animation_css,
      delay: 50
    });
    animation.opacity(0.5).translate(-330, 0).step()
    this.setData({
      state: 'left',
      animation_css: 'ease',
      ani: animation.export()
    })

  },
  right: function() {
    let that = this;
    var animation = wx.createAnimation({
      duration: 1200,
      timingFunction: 'ease',
      delay: 80
    });
    animation.opacity(2).translate(63, 0).step()
    this.setData({
      state: 'right',
      ani: animation.export()
    })
  }

}) //finished