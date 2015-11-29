$.ajax({
	type: 'get',
	url: 'https://gentle-lowlands-4464.herokuapp.com/'
}).done(function(data, textStatus, jqXHR ){
	 if(data.indexOf('/pictures/new') < 0){
		return false;
	 }else{
		sendRequest();
	 }
}).fail(function(data){
	 console.log('error!!!');
});

function sendRequest(){
	// var url = "https://floating-dawn-8410.herokuapp.com/pictures/getpic"
	$.ajax({
   		 url: 'https://gentle-lowlands-4464.herokuapp.com/pictures/random.json'
 	}).done(function(data){
    console.log('success!!');
    // var url = 'http://localhost:8888/googleEx/popup.html';
		var imageUrl = 'https://gentle-lowlands-4464.herokuapp.com' + data.pic_url;
		console.log(data.pic_url);
		window.open(imageUrl,'openwindow','left=50,top=50,width=300,height=280');

	}).fail(function(data){
	    console.log('error!!!');
	});
};
