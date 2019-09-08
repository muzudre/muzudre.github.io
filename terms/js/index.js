$(function(){
    var articleHeight = $('.article').height();
    var toTop;
    var perc;
    var windowHeight = $(window).height();
  
    $(window).on('scroll', function(){
      checkProg();
    });
  function checkProg(){
    toTop = ($(window).scrollTop()+windowHeight)-$('.article').offset().top;
      perc = toTop/articleHeight;
      fillProgressBar(perc);
  }
  function fillProgressBar(p){
    p = (p*100)+"%";
    $('#progress-bar').width(p);
  };
  checkProg();

});