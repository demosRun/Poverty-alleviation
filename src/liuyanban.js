$(document).ready(function() {
	$('.liuyanTab span').on('click',function(){
		var index = $(this).index();
		$('.liuyanTab span').removeClass('active');
		$(this).addClass('active');
		$('.liuyanBox').hide();
		$('.liuyanBox').eq(index).show();
	})
		$(".p3_2 dd").eq(-1).addClass("end");
	
	$("#rb_right li").mouseover(function(){
		$("#rb_right li").attr('id','');
		
		$(this).attr('id','active');
	});

	$("#rb_right li").mouseout(function(){
		$("#rb_right li").attr('id','');
	});

	
	

	$(window).scroll(function(){
		var top2 = $(window).scrollTop();
	  	if(top2 >= 0){
			$('#rb_right').show();
			$('#rb_right_er').show();
		}
	});
	try{
		$("#pic1").jCarouselLite({
			btnPrev: "#prev",
			btnNext: "#next",
			speed: 1000,
			auto: 2000,
			vertical: true,
			visible:5
		});
	}catch(e){}

});




'use strict';

//地方领导留言设置
var $leader = $('#leader');
var $leader2 = $('#leader2');
var mdata = {};
var m_postfid;
var m_domianId; //
var m_subject;
var m_content;
var m_truename;
var m_linktel;
var m_fid; //
var m_code;
var m_hiddenRemark;
var m_typeid;
var leader;
var m_address;

// 设置分类
function setDomianId(val) {
  m_domianId = val;
}

function setTypeId(val) {
  m_typeid = val;
}

// 选择省
function setProId(val) {
  var pid = val;
  //var localUrl = 'http://leaders.people.com.cn/liuyan_data/forum/forum_data_' + pid + '.jsonp';
	var localUrl = 'http://messageboard.peopletech.cn/forum_data_' + pid + '.jsonp';
  $.ajax({
    type: 'get',
    url: localUrl,
    cache: false,
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'IndexForum',
    async: false,
    success: function success(data) {
      leader = data;	  
      createLeader(leader, pid);
    },
    error: function error() {}
  });
}
function createLeader(leader, pid) {
  $leader.html('');  
  var r = [];
  var lArr = leader[pid].childIds;

  var LEN = lArr.length;  
  //LEN = pid == 38 || pid == 39 ? 1 : 2;
  for (var i = 0; i < LEN; i++) {
    var oIndex = lArr[i];	
    var oLeader = leader[oIndex];
    r.push(oLeader);
  }

  var STR = '<option style="color: #b6b6b6" disabled selected>\u8BF7\u9009\u62E9</option>';
  for (var k = 0; k < r.length; k++) {
    var nowR = r[k];
    STR += '<option value="' + nowR.fid + '" topIds="' + nowR.topIds + '">' + nowR.name + '</option>';
  }
  $leader.html(STR);
}
function createLeader2(leader,pid) {
  $leader2.html('');  
  var r1 = [];
  var lArr1 = leader[pid].childIds;   
  if(lArr1 != null){
	  var LEN1 = lArr1.length;
	  //LEN = pid == 38 || pid == 39 ? 1 : 2;
	  for (var i = 0; i < LEN1; i++) {
		var oIndex1 = lArr1[i];
		var oLeader1 = leader[oIndex1];
		r1.push(oLeader1);
	  }
	
	  var STR1 = '<option style="color: #b6b6b6" disabled selected>\u8BF7\u9009\u62E9</option>';
	  for (var k1 = 0; k1 < r1.length; k1++) {
		var nowR1 = r1[k1];
		STR1 += '<option value="' + nowR1.fid + '" topIds="' + nowR1.topIds + '">' + nowR1.name + '</option>';
	  }
	  $leader2.html(STR1);
  }  
}

// 选择领导
function setLeaderId(val) {
  m_fid = val; 
  createLeader2(leader,val)
}

function setLeaderId1(val) {
  m_fid = val;
}

//地方留言提交
function sub() {
  m_content = $('#mcontent').val();
  m_truename = $('#username').val();
  m_linktel = $('#tel').val();
  m_subject = $('#subject').val();
  m_code = parseInt($('#code').val());
  m_hiddenRemark = $('#hiddenRemark').val()
//	m_address = $('#address').val();
//	var addressinfo = '事发详细地址:'+m_address;
//	if(m_address != ''){
//		m_content = m_content+ '，' +addressinfo;
//	}
  mdata = {
    topicId: 60,
    typeId: m_typeid,
    domainId: m_domianId,
    Fid: m_fid,
    subject: m_subject,
    content: m_content + '##',
	hiddenRemark:m_hiddenRemark,
    realName: m_truename,
    phone: m_linktel,
    varCode: m_code,
    position: 0
  };

  if (m_domianId && m_fid && m_subject && m_content && m_truename && m_linktel && m_code) {
    $.ajax({
      type: 'post',
      url: 'http://liuyan.people.com.cn/topicThreads/huoDongPost',
      data: mdata,
      crossDomain: true,
      dataType: 'json',
      // jsonp: "callback",
      // jsonpCallback: "wangqizheng",
      success: function success(data) {
        if (data.result == 'success') {
          alert('提交留言成功！');
          $('#mcontent').val('');
          $('#username').val('');
          $('#tel').val('');
          $('#subject').val('');
          $('#code').val('');
        }
        var code = data.error;
        if (code == 'T0001') {
          alert('提交失败，您输入的信息不完整');
        } else if (code == 'T0002') {
          alert('提交失败，请确定您选择的留言版块是否正确');
        } else if (code == 'T0003' || code == 'T0004') {
          alert('提交失败，请确定您输入的分类或领域等信息是否正确');
        } else if (code == 'T0005') {
          alert('提交失败，您留言的话题活动已经结束');
        } else if (code == 'T0006') {
          alert('提交失败，请确定您的留言来源是否正确');
        } else if (code == 'T0007') {
          alert('提交失败，留言状态错误');
        } else if (code == 'T0008') {
          alert('提交失败，请检查留言标题是否符合要求');
        } else if (code == 'T0009') {
          alert('提交失败，请检查留言内容是否符合要求');
        } else if (code == 'T0010') {
          alert('提交失败，您输入的内容中包含了禁止词语');
        } else if (code == 'T0011') {
          alert('提交失败，请不要频繁发表留言');
        } else if (code == 'T0012') {
          alert('提交失败，您没有权限进行此操作');
        } else if (code == 'T0013') {
          alert('提交失败，您输入的验证码错误');
        }
      },
      error: function error(data) {}
    });
  } else {
    alert('请将表格填写完整');
  }
}

//部委留言通用设置
var $buwei = $('#buwei');
var $buwei2 = $('#buwei2');
var $buweiList = $('#buweiList');
var bdata = {};
var b_postfid;
var b_domianId; //
var b_subject;
var b_content;
var b_truename;
var b_linktel;
var b_fid; //
var b_hiddenRemark;
var b_code;
var buwei;
var b_typeid;
var b_address;

// 设置部委分类
function setDomianBuweiId(val) {
  b_typeid = val;
}
//直接引用数据代码
var buweiUrl = 'http://messageboard.peopletech.cn/forum_data_bw.jsonp';
$.ajax({
    type: 'GET',
    url: buweiUrl,
    cache: false,
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'IndexForum',
    async: false,
    success: function success(data) {
		createBuwei(data);
    },
    error: function error() {}
});
// 选择部委
function setProBuweiId(val) {
  var pid = val;
  //var localUrl = 'http://leaders.people.com.cn/liuyan_data/forum/forum_data_' + pid + '.jsonp';
  var localUrl = 'http://messageboard.peopletech.cn/forum_data_bw.jsonp';
  $.ajax({
    type: 'get',
    url: localUrl,
    cache: false,
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'IndexForum',
    async: false,
    success: function success(data) {
      buwei = data;	  
      createLeaderBuwei(buwei, pid);
    },
    error: function error() {}
  });
}
function createBuwei(data){
	
	  var LEN = data.length;
	  //console.log('部委数据:',data)
	
	  var STR = '<option style="color: #b6b6b6" disabled selected>请选择部委</option>';
	  $.each(data, function(index, item){
		  if(item.fup == 0 && item.forumState != 0){
			  //console.log('应用数据:',item)
			  STR += '<option value="' + item.fid + '" topIds="' + item.topIds + '">' + item.name + '</option>';
		  }
      });
	
	  $buweiList.append(STR);
}
function createLeaderBuwei(buwei, pid) {
  $buwei.html('');  
  var r = [];
  var lArr = buwei[pid].childIds;

  var LEN = lArr.length;  
  //LEN = pid == 38 || pid == 39 ? 1 : 2;
  for (var i = 0; i < LEN; i++) {
    var oIndex = lArr[i];	
    var oLeader = buwei[oIndex];
    r.push(oLeader);
  }

  var STR = '<option style="color: #b6b6b6" disabled selected>\u8BF7\u9009\u62E9</option>';
  for (var k = 0; k < r.length; k++) {
    var nowR = r[k];
    STR += '<option value="' + nowR.fid + '" topIds="' + nowR.topIds + '">' + nowR.name + '</option>';
  }
  $buwei.html(STR);
}

// 选择部委领导
function setLeaderBuweiId(val) {
  b_fid = val; 
  console.log(b_fid);
}

//部委留言提交
function subbuwei() {
  b_content = $('#b_content').val();
  b_truename = $('#b_username').val();
  b_linktel = $('#b_tel').val();
  b_subject = $('#b_subject').val();
  b_code = parseInt($('#b_code').val());
  b_hiddenRemark = $('#b_hiddenRemark').val()
	b_address = $('#b_address').val();
	var addressinfo = '事发详细地址:'+b_address;
	if(b_address != ''){
		b_content = b_content+ '，' +addressinfo;
	}
  bdata = {
    topicId: 60,
    typeId: b_typeid,
    Fid: b_fid,
    subject: b_subject,
    content: b_content + '##',
	hiddenRemark: b_hiddenRemark,
    realName: b_truename,
    phone: b_linktel,
    varCode: b_code,
    position: 1
  };

  if (b_typeid && b_fid && b_subject && b_content && b_truename && b_linktel && b_code) {
    $.ajax({
      type: 'post',
      url: 'http://liuyan.people.com.cn/topicThreads/huoDongPost',
      data: bdata,
      crossDomain: true,
      dataType: 'json',
      // jsonp: "callback",
      // jsonpCallback: "wangqizheng",
      success: function success(data) {
        if (data.result == 'success') {
          alert('提交留言成功！');
          $('#mcontent').val('');
          $('#username').val('');
          $('#tel').val('');
          $('#subject').val('');
          $('#code').val('');
        }
        var code = data.error;
        if (code == 'T0001') {
          alert('提交失败，您输入的信息不完整');
        } else if (code == 'T0002') {
          alert('提交失败，请确定您选择的留言版块是否正确');
        } else if (code == 'T0003' || code == 'T0004') {
          alert('提交失败，请确定您输入的分类或领域等信息是否正确');
        } else if (code == 'T0005') {
          alert('提交失败，您留言的话题活动已经结束');
        } else if (code == 'T0006') {
          alert('提交失败，请确定您的留言来源是否正确');
        } else if (code == 'T0007') {
          alert('提交失败，留言状态错误');
        } else if (code == 'T0008') {
          alert('提交失败，请检查留言标题是否符合要求');
        } else if (code == 'T0009') {
          alert('提交失败，请检查留言内容是否符合要求');
        } else if (code == 'T0010') {
          alert('提交失败，您输入的内容中包含了禁止词语');
        } else if (code == 'T0011') {
          alert('提交失败，请不要频繁发表留言');
        } else if (code == 'T0012') {
          alert('提交失败，您没有权限进行此操作');
        } else if (code == 'T0013') {
          alert('提交失败，您输入的验证码错误');
        }
      },
      error: function error(data) {}
    });
  } else {
    alert('请将表格填写完整');
  }
}

// 发送验证码
var $sendCode = $('#sendCode');

$sendCode.click(function () {
  var pnum = $('#tel').val();
  if ($sendCode.hasClass('success')) {
    alert('每隔60秒才能发送一次哦');
    return;
  }
  if (pnum) {
    $.ajax({
      type: 'post',
      async: false,
      url: 'http://liuyan.people.com.cn/topicThreads/getPhoneVarCode',
      dataType: 'json',
      crossDomain: true,
      data: {
        phoneNum: pnum
      },
      success: function success(data) {
        if (data.result == 'fail') {
          alert('发送失败');
        } else {
          alert('发送成功');
          $sendCode.addClass('success');
          setTimeout(function () {
            $sendCode.removeClass('success');
          }, 60000);
        }
      },
      error: function error() {
        log('fail');
      }
    });
  }

});
var $bsendCode = $('#b_sendCode');

$bsendCode.click(function () {
  var pnum = $('#b_tel').val();
  if ($bsendCode.hasClass('success')) {
    alert('每隔60秒才能发送一次哦');
    return;
  }
  if (pnum) {
    $.ajax({
      type: 'post',
      async: false,
      url: 'http://liuyan.people.com.cn/topicThreads/getPhoneVarCode',
      dataType: 'json',
      crossDomain: true,
      data: {
        phoneNum: pnum
      },
      success: function success(data) {
        if (data.result == 'fail') {
          alert('发送失败');
        } else {
          alert('发送成功');
          $bsendCode.addClass('success');
          setTimeout(function () {
            $bsendCode.removeClass('success');
          }, 60000);
        }
      },
      error: function error() {
        log('fail');
      }
    });
  }

});