$.contentScript = {
	timer: null,
	loginCheck: function(){
		$.ajax({
			type: 'get',
			url: 'https://gentle-lowlands-4464.herokuapp.com/'
		}).done(function(data, textStatus, jqXHR ){
			 if(data.indexOf('/pictures/new') < 0){
				return false;
			 }else{
				$.contentScript.showLoop();
			 }
		}).fail(function(data){
			 console.log('error!!!');
		});
	},
	sendRequest: function(){
		$.ajax({
	   		 url: 'https://gentle-lowlands-4464.herokuapp.com/pictures/random.json'
	 	}).done(function(data){
			var imageUrl = 'https://gentle-lowlands-4464.herokuapp.com' + data.pic_url;
			var left = $.contentScript.getRundom();
			var top = $.contentScript.getRundom();
			var imageSize = $.contentScript.getImageSize();
			// window.open(imageUrl,'openwindow','left=' + left + ',top=' + top + ',width=' + imageSize.width + ',height=' + imageSize.height);
			if($.contentScript.getShowType() == 1){
				window.open(imageUrl,'openwindow','left=' + left + ',top=' + top + ',width=300,height=300');
			}else{
				window.open(imageUrl);
			}

		}).fail(function(data){
		    console.log('error!!!');
				if($.contentScript.timer){
						$.contentScript.stopLoop();
				}
		});
	},
	getShowType: function(){
		return Math.floor(Math.random()*2 + 1) ;
	},
	getRundom: function(){
		return Math.round(Math.random() * 1000);
	},
	getImageSize: function(src){//できない
		var img = new Image();
		img.src = src;

		return {'width': img.width, 'height': img.height};
	},
	showLoop: function(){
		var time = $.contentScript.getRundom() * 30;
		console.log(time);
		$.contentScript.timer = setTimeout(function(){
		  $.contentScript.sendRequest();
			$.contentScript.showLoop();
		},time);
	},
	stopLoop: function(){
		clearTimeout($.contentScript.timer);
	}
};

//実行
if(!location.href.match('https://gentle-lowlands-4464.herokuapp.com')){
	$.contentScript.loginCheck();
}
