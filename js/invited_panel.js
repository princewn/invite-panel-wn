// JavaScript Document
function init(){
	var showInvited=invitedPeople();
	var target=$(".zg-link");
	var button;
	target.each(function(){
		var strvalue=$(this).text();
	    //alert(strvalue);
		var inviteExist=strExist(strvalue,showInvited); 
		button=$(this).siblings().filter(".invite-button")
		//alert($(this).attr('title'));
		if(inviteExist){
			button.html("收回邀请");			
			button.removeClass("zg-btn-blue").addClass("zg-btn-grey");			
		}
	});	
	avatarMouseOn();
	buttonToggle();
}
function strExist(searchvalue,str){
	if(str.indexOf(searchvalue)!=-1){
		console.log("pass");
		return true;
	}
	else{
		return false;
	}
}
/*次函数逻辑混乱，程序流程图，用例分析*/
function buttonToggle(){
/*	$(".zg-btn-blue").click(function(){
		setInvited($(this));
	});			
	$(".zg-btn-grey").click(function(){
		setUnInvited($(this));
	});		*/
	$(".invite-button").click(function(){
        var target=$(this).siblings().filter(".zg-link");
		var button=target.siblings().filter(".invite-button");
        var invite=checkCookie(target.attr('title'));
		if (invite=="invited"){
			button.html("邀请回答");
			button.removeClass("zg-btn-grey").addClass("zg-btn-blue");			
			setUnInvited(target.attr('title'));
		}
		else if(invite=="uninvited"){
			$(this).html("收回邀请");			
			$(this).removeClass("zg-btn-blue").addClass("zg-btn-grey");					            setInvited(target.attr('title'));
		}
		else{
			setInvited(target.attr('title'));
			console.log('已经新建'+invite+'!');			
		}
	});
		
}
function invitedPeople(){
	//alert($(".invited-shortlist").html());
	$(".invited-shortlist").html("");
	var target=$(".zg-link");
	var showInvited="";
	var counter=0;
	var show=new String;
	target.each(function(){
		var invite=checkCookie($(this).attr('title'));
		if(invite=="invited"){
			counter++;
			if(counter==1){
				showInvited='<a href="#" class="zg-link-gray">'+$(this).text()+'</a>';
			}
			else{
				showInvited+=',<a href="#" class="zg-link-gray">'+$(this).text()+'</a>';
			}			
			
		}
	});	
	var arrayInvited=showInvited.split(",");
	if(counter<4){
		show=arrayInvited.join(",");
	}
	else{
		show=""+arrayInvited[counter-3]+","+arrayInvited[counter-2]+","+arrayInvited[counter-1]+"等";
	}
	if(counter==0){
		$(".invite-font").html("");
	}
	else{
		$(".invite-font").text("你已邀请");
	}
	$(".invited-shortlist").html(show);
	if(counter>0){
		$(".invite-status-counter").html(counter+"人");
	}
	else{
		$(".invite-status-counter").html("");
	}
	return showInvited;
}
function setInvited(c_name){
	setCookie(c_name,"invited",365);
	console.log(checkCookie(c_name)+"结果是这样");
	console.log("已经设置为invited");
	invitedPeople();
}
function setUnInvited(c_name){
	setCookie(c_name,"uninvited",365);
	console.log(checkCookie(c_name)+"结果是这样");
	console.log("已经设置为uninvited");
	invitedPeople();
}
function clearCookie(){
	var target=$(".zg-link");
	target.each(function(){
		deleteCookie($(this).attr('title')) ;
	});	
	alert("cookie全部清除");
}
function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1 ;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1)
			{
				c_end=document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	else{
		console.log("找到cookie"+document.cookie.length);
		console.log("document.cookie为"+document.cookie);
		return null;
	}
}

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function checkCookie(c_name)
{	
	username=getCookie(c_name);
	//username=1;
	if (c_name!=null || c_name!="")
	{
		if(username)
		{
			console.log('早已存在的'+username+'!');
			return username;

		}
		else{
			return false;
		}
	}
}
function deleteCookie(c_name) {  
    setCookie(c_name,null, -1);  
} 
function avatarMouseOn(){
	$(".zm-item-link-avatar").mouseenter(function(){
/*        var target=$(this).siblings().filter(".zg-link").attr('title');
		var index=$("suggest-persons").filter(".zm-item-link-avatar").index(this);*/
		var index=$(this).parent().parent().index();
		//alert(index);
		console.log(index);
		avatarInformation(index);
		$("#zh-tooltip").css({
						position:"absolute",
						top:$(this).offset().top+20,
						left:$(this).offset().left-60
						
					   });
		flag=0;
		$("#zh-tooltip").mouseenter(function(){
			flag=1;
			//alert("移入#zh-tooltip是已经设置为"+flag);
		
		});
		$("#zh-tooltip").mouseleave(function(){
			//alert("go");
			flag=0;
			//alert("移出#zh-tooltip是已经设置为"+flag);
			//alert("tool out"+flag);
			
			function tooltipNone(){
				//alert('最终判断的'+flag);
				if(flag==0){
					
						$("#zh-tooltip").css({
									display:"none",
									visible:"hidden"
						});			
			
				}				
			}		//var t=setTimeout("alert('5 seconds!')",2000);
			var s=setTimeout(tooltipNone,0);			
		});			
	});
	$(".zm-item-link-avatar").mouseleave(function(){
		//alert(".zm-item-link-avatar out"+flag);		
	},function(){
		function tooltipNone(){
			//alert('最终判断的'+flag);
			if(flag==0){
				
					$("#zh-tooltip").css({
								display:"none",
								visible:"hidden"
							   });			
		
			}				
		}		//var t=setTimeout("alert('5 seconds!')",2000);
		var s=setTimeout(tooltipNone,500);
	});
}
function avatarInformation(index){
	var ava ='{"recommended":['+
'{"name": "周源","slug": "zhouyuan","avatarUrl": "images/user_avatar_3.png","bio": "知乎 001 号员工","id": 4},'+'{"name": "黄继新","slug": "jixin","avatarUrl": "images/user_avatar_5.png","bio": "和知乎在一起","id": 5},'+'{"name": "李申申","slug": "shen","avatarUrl": "images/user_avatar_6.png","bio": "知乎 002 号员工","id": 6},'+'{"name": "Raymond Wang","slug": "raymond-wang","avatarUrl": "images/user_avatar_7.png","bio": "lawyer","id": 7}'+
']}';

	var txt = '{"employees":[' +
	'{"firstName":"Bill","lastName":"Gates" },' +
	'{"firstName":"George","lastName":"Bush" },' +
	'{"firstName":"Thomas","lastName":"Carter" }]}';
	var avatar = eval ("(" + ava + ")");
	var obj = eval ("(" + txt + ")");

	var avaterHtml='<div id="zh-tooltip"  class="goog-hovercard popover bottom" ><div  class="popover-content no-hovercard"><div class="zh-profile-card member"><div class="upper"><a class="avatar-link" href="/people/zhang-liang-44-93"><img class="avatar" src="'+avatar.recommended[index].avatarUrl+'"><span class="name">'+avatar.recommended[index].name+'</span></a><i class="icon icon-profile-male"></i><div class="tagline">'+avatar.recommended[index].bio+'</div><div class="personal"><i class="icon icon-profile-company"></i><span class="info-wrap"><span class="item">'+avatar.recommended[index].slug+'</span><span class="item">'+avatar.recommended[index].id+'</span></span></div></div><div class="lower clearfix"><div class="meta"><a class="item" target="_blank" href="/people/zhang-liang-44-93/answers"><span class="value">84</span><span class="key">回答</span></a><a class="item" target="_blank" href="/people/zhang-liang-44-93/posts"><span class="value">0</span><span class="key">文章</span></a><a class="item" target="_blank" href="/people/zhang-liang-44-93/followers"><span class="value">65</span><span class="key">关注者</span></a></div><div class="operation"><button data-follow="m:button" data-id="e7a35191780eefc183b306bb9e7652c9" class="zg-btn zg-btn-follow zm-rich-follow-btn">关注他</button><a href="/inbox/3387524200" class="zg-btn-white member-profile-card-pm"  style="position:relative; top:-40px;left:-50px;" data-pm-name="'+avatar.recommended[index].name+'" ><i class="zg-icon pm">私信</i></a></div></div></div></div><div class="arrow" style="left: 82.5px;"></div><div class="arrow2" style="left: 82.5px;"></div></div>';
	$("#avaterHtml").html(avaterHtml);
}



