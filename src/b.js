var originLi = undefined;

function moveTitleUmpKeyDown($li){
	var $title = $li.find('.reportTitleText');
	var $umpKey = $li.find('.report');
	//console.log($umpKey.attr('value1'));
	//console.log($title.text());
	var $div = $li.children('div.col-md-12');
	$div.attr('style','padding-right: 2px;padding-left: 2px');//;background-color: green;
	var $titleHtml = $('<div class="ly-title"/>').append('&nbsp;&nbsp;'+$title.data('content')).css("color","#FFFFFF").css('font-size','18px');
	//var $umpKeyHtml = $('<div/>').append($umpKey.attr('value1')).css("color","#FFFFFF").css('font-size','18px');
	var $umpKeyHtml = $('<div/>').append($('<input/>').val($umpKey.attr('value1')).css('width','100%')).css("color","#FFFFFF").css('font-size','12px');
	$li.find('.portlet-title').before($titleHtml).after($umpKeyHtml);	
	$title.remove();
}

function sightAllCharts(){
	$('.reportLi').each(function(i, reportLi){
		$li = $(reportLi);
		var lySight = $li.attr('ly-sight');
		if(lySight){
			return;
		}
		moveTitleUmpKeyDown($li);
		addTpChartAction($li);
		$li.attr('ly-sight', 'true');
	});
	initTooggleTp();
}

function reloadChart($li){
	var $reload = $li.find('.reload');
	// 不管用
	//$reload.trigger("click");
	click($reload);
}

function hideTpLegendItems($li){
	var relationid = $li.attr('relationid');
	
	if(location.pathname.indexOf('/report/toFixedLayoutReport')!=-1){
		relationid='undefined';
	}

	var resourcesindex = $li.attr('resourcesindex');
	var cookieName = 'report_'+relationid;
	//var cookieValue = $.cookie(cookieName);
	//console.log(cookieName+' >> '+ cookieValue);
	var cookieValuePrefix = relationid+'#div_'+resourcesindex +'#';
	var legendItem = '4,5,6,7';
	$.cookie(cookieName, cookieValuePrefix+legendItem);
	//console.log(cookieName+' @: '+ cookieValue +' >> '+  cookieValuePrefix+legendItem);

	reloadChart($li);
}

function showTpLegendItem($li){
	var relationid = $li.attr('relationid');
	
	if(location.pathname.indexOf('/report/toFixedLayoutReport')!=-1){
		relationid='undefined';
	}

	var resourcesindex = $li.attr('resourcesindex');
	var cookieName = 'report_'+relationid;
	var cookieValue = $.cookie(cookieName);
	//console.log(cookieName+' >> '+ cookieValue);
	//var cookieValuePrefix = relationid+'#div_'+resourcesindex +'#';
	
	$.cookie(cookieName, '', { expires: -1 });
	// console.log(cookieName+' #: '+ cookieValue +' >> '+  null);
	
	reloadChart($li);
}

function showAllTpLegendItem(){
	$('.reportLi').each(function(i, reportLi){
		$li = $(reportLi);
		var $report = $li.find('.report');
		if( 'ump-m-tp' == $report.attr('resourcescode')){
			showTpLegendItem($li);
		}
		
	});
}

function hideAllTpLegendItem(){
	$('.reportLi').each(function(i, reportLi){
		$li = $(reportLi);
		var $report = $li.find('.report');
		if( 'ump-m-tp' == $report.attr('resourcescode')){
			hideTpLegendItems($li);
		}
	});
}


function toggleTpLegendItem($li){
	var $report = $li.find('.report');
	
	if( 'ump-m-tp' !== $report.attr('resourcescode')){
		return;
	}

	var relationid = $li.attr('relationid');
	
	if(location.pathname.indexOf('/report/toFixedLayoutReport')!=-1){
		relationid='undefined';
	}

	var resourcesindex = $li.attr('resourcesindex');
	var cookieName = 'report_'+relationid;
	var cookieValue = $.cookie(cookieName);
	//console.log(cookieName+' >> '+ cookieValue);
	//var cookieValuePrefix = relationid+'#div_'+resourcesindex +'#';
	
	if( cookieValue ){
		showTpLegendItem($li);
	}else{
		hideTpLegendItems($li);
	}

}

function addTpChartAction($li){
	var $report = $li.find('.report');
	
	if( 'ump-m-tp' !== $report.attr('resourcescode')){
		return;
	}

	var $tools = $li.find('.tools');
	var url = chrome.extension.getURL("icon-16.png");
	// var $img = $('<img/>').attr('src', url).css('padding-bottom', '15px');
	// var $btn = $('<a href="javascript:void(0);"></a>').append($img).addClass('toggleTp');
	var $btn = $('<a href="javascript:void(0);"></a>').css('background-image','url('+url+')').css('width','16px').addClass('toggleTp');
	$btn.appendTo($tools);

}

function initTooggleTp(){
	$('.toggleTp').click(function(e){
		var $li = $(e.target).closest('.reportLi');
		toggleTpLegendItem($li);
	});
	$('.fa-move').css('right','115px');
}

function fixedColWidth(){
	if(location.pathname.indexOf('/report/toFixedLayoutReport')!=-1){
		$('.portlet').removeAttr("style");
		$msg = $('<h4/>').text('本页面有bug，TP图例无法单独控制！');
		$('#report_layout_div').removeAttr('style').css('padding-left','30px').css('padding-right','4px').before($msg);	
	}
	$('.portlet-body').css('padding-right','0px').css('padding-left','0px');
}

function reloadAllChart(){
	$('.reload').each(function(i, v){
		$reload = $(v);
		if($reload.is(":visible")){
			click($reload);
		}
	});
}

function click($reload){
	 var type = 'click'; //要触发的事件类型
	 var bubbles = true; //事件是否可以冒泡
	 var cancelable = true; //事件是否可以阻止浏览器默认事件
	 var view = document.defaultView; //与事件关联的视图，该属性默认即可，不管
	 var detail = 0;
	 var screenX = 0;
	 var screenY = 0;
	 var clientX = 0;
	 var clientY = 0;
	 var ctrlKey = false; //是否按下ctrl
	 var altKey = false; //是否按下alt
	 var shiftKey = false;
	 var metaKey = false;
	 var button = 0; //表示按下哪一个鼠标键
	 var relatedTarget = 0; //模拟mousemove或者out时候用到，与事件相关的对象
	 var event = document.createEvent('Events');
	 event.initEvent(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY,
	     ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget);
	 var c = $reload.get(0);
	 //console.log(event);
	 //console.log(c)
	 c.dispatchEvent(event);
}



function addReloadAllBtn(){
	var $btn = $('<button/>').text('刷新全部！');
	$btn.click(reloadAllChart);
	$('#reportList').before($btn).before('&nbsp;&nbsp;');;
}

function addIgnoreLegend(){
	var $btn = $('<button/>').text('隐藏次要指标');
	$btn.click(hideAllTpLegendItem);
	var $btn2 = $('<button/>').text('显示全部指标');
	$btn2.click(showAllTpLegendItem);
	$('#reportList').before($btn).before($btn2).before('&nbsp;&nbsp;');
	
}

// ------------------------

function hideAllInfo(){
	$('[id^=div_info_]').hide();
}

function showAllInfo(){
	$('[id^=div_info_]').show();
}


function addHideInfo(){
	var $btn = $('<button/>').text('隐藏信息栏');
	$btn.click(hideAllInfo);
	var $btn2 = $('<button/>').text('显示信息栏');
	$btn2.click(showAllInfo);
	$('#reportList').before($btn).before($btn2).before('&nbsp;&nbsp;');
}

// ------------------------
function pullChartHeight(){
	var height =$('.report').css('height');
	var step = Number.parseFloat( $('#ly_chart_step').val());
	var h = Number.parseFloat(height.substring(0, height.length-2));
	$('.report').css('height', (h+step)+'px');
	window.dispatchEvent(new Event('resize'));
}

function restoreChartHeight(){
	$('.report').css('height','150px');
	window.dispatchEvent(new Event('resize'));
}

function addAdjustChartHeight(){
	var $input = $('<input id="ly_chart_step" value="50" style="width:40px;"/>');
	var $btn = $('<button/>').text('拉高图形');
	$btn.click(pullChartHeight);
	var $btn2 = $('<button/>').text('还原高度');
	$btn2.click(restoreChartHeight);
	$('#reportList').before($input).before($btn).before($btn2).before('&nbsp;&nbsp;');
}

// ------------------------------
function sortChart(){
	var $ul = $('#reportList');
	var sort = $ul.attr('sort');
	if('y' == sort){
		return;
	}
	var $lis =  $('.reportLi');
	originLi = $lis;

	var $sortd = _.sortBy($lis,function(item){
		var title = $(item).find('.ly-title').text();
		console.log(title);
		return title;
	});
	$ul.attr('sort','y').empty().append($sortd);
}

function unsortChart(){
	var $ul = $('#reportList');
	var sort = $ul.attr('sort');
	if('y' !== sort){
		return;
	}
	$ul.attr('sort','n').empty().append(originLi);
}

function addSortChart(){
	var $btn = $('<button/>').text('排序图形');
	$btn.click(sortChart);
	var $btn2 = $('<button/>').text('还原排序');
	$btn2.click(unsortChart);
	$('#reportList').before($btn).before($btn2).before('&nbsp;&nbsp;');
}

// -------------------------------------------


function changeCol(col){
	var i = 12/col;
	$('.reportLi').removeClass('col-md-12 col-md-6 col-md-4 col-md-3 col-md-2').addClass('col-md-'+i);
	window.dispatchEvent(new Event('resize'));
}

function addChangeCol(){
	$.each([1,2,3,4,6],function(i, n){
		var $btn = $('<button data-col="1"/>').text(n+'栏');
		$btn.click(function(){
			changeCol(n);
		});	
		$('#reportList').before($btn);
	});
	$('#reportList').before('&nbsp;&nbsp;');
}

// ----------------------
function initPage(){


	// 取初始化标记
	var lySight = $('body').attr('ly-sight');
	if(lySight){
		return;
	}
	// 处理所有图表
	sightAllCharts();
	// 设置设置列宽
	fixedColWidth();
	// 添加功能按钮
	addReloadAllBtn();
	addIgnoreLegend();
	addHideInfo();
	addAdjustChartHeight();
	addSortChart();
	addChangeCol();

	// 默认吟唱信息栏并拉高图标
	hideAllInfo();
	pullChartHeight();
	// 设置初始化标记
	$('body').attr('ly-sight','true');
	// 触发页面重排
	window.dispatchEvent(new Event('resize'));
}

initPage();