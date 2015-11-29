var showImage = document.getElementsByName('on_off');

document.body.onload = function(){
  switch (localStorage['showImage']){
    case 'on':
      showImage[1].checked = true;
      break;
    default:
      showImage[0].checked = true;
      break;
  }
}
$('#save').on('click', function(){
  if(showImage[0] == true){
    localStorage['showImage'] = 'off';
  }else{
    localStorage['showImage'] = 'on';
  }
})
