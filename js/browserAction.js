$(function(){
	$.popupHtmlFunc.init();
});

$.popupHtmlFunc = {
	init: function(){
		this.loginCheck();
		this.events();
	},
	events: function(){
		this.showImageSetting();
	},
	createLoginPage: function(data){
		var template = $("#login_template").html();
		var $loginTmpl = $(template).clone();
		$('#main').html($loginTmpl);
		var token = data.match('<meta name="csrf-token" content="(.+?)" />')[0];
		$('#main').append(token);

		$('#new_user').submit(function(event) {
			event.preventDefault();
			var $form = $(this);
			var data = {
				'utf8': '✓',
				'authenticity_token': $('meta[name=csrf-token]').attr('content'),
				'user[email]': $form.find('input.loginid').val(),
				'user[password]': $form.find('input.password').val(),
				'user[remember_me]': 0,
				'commit': 'Log in'
			}

			$.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: data,
            success: function(data, textStatus, xhr) {
            	 if(data.indexOf('/pictures/new') > 0){
                	$.popupHtmlFunc.createSettingPage(data);
                 }
            },
            error: function(xhr, textStatus, error) {console.log('error!!!!!!!');}
            });
		});
	},
	createSettingPage: function(data){
		var template = $('#setting_template').html();
		var token = data.match('<meta name="csrf-token" content="(.+?)" />')[0];
		$('#main').html(template);
		$('#main').append(token);
		$.popupHtmlFunc.showImageSetting();
		$.popupHtmlFunc.logout();
	},
	loginCheck: function(){
		$.ajax({
			type: 'get',
			url: 'https://gentle-lowlands-4464.herokuapp.com/'
		}).done(function(data, textStatus, jqXHR ){
			 if(data.indexOf('/pictures/new') < 0){
			 	$.popupHtmlFunc.createLoginPage(data);
			 }else{
			 	$.popupHtmlFunc.createSettingPage(data);
			 }
		}).fail(function(data){
	   	 console.log('error!!!');
		});
	},
	showImageSetting: function(){
			$('.send_image_button').on('click', function(e){
				var isOn = $(e.target).hasClass('on');
				var req;
				if(isOn){
					$('.on').addClass('selected');
					$('.off').removeClass('selected');
					//設定保存したい
				}else{
					$('.on').removeClass('selected');
					$('.off').addClass('selected');
					//設定保存したい
				}
			});
	},
	logout: function(){
		$('#logout').on('click',function(){
			var data = {
				'authenticity_token': $('meta[name=csrf-token]').attr('content'),
				'_method': 'delete'
			}
			$.ajax({
						'url': 'https://gentle-lowlands-4464.herokuapp.com/users/sign_out',
						'type': 'post',
						'data': data,
						success: function(data, textStatus, xhr) {
							$.popupHtmlFunc.loginCheck();
						},
						error: function(xhr, textStatus, error) {console.log('error!!!!!!!');}
						});
		})
	}

};
