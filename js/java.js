$(document).ready(function() {
  
  // 스무스 스크롤 - 개선된 버전
  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var targetElement = $(target);
    
    if (targetElement.length) {
      var offsetTop = targetElement.offset().top - 100; // 헤더 높이만큼 빼기
      $('html, body').animate({
        scrollTop: offsetTop
      }, 800);
    }
  });

  // TOP 버튼 클릭 - jQuery 방식
  $('.top-btn').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });

  // 디버깅용 콘솔 로그
  console.log('jQuery loaded and ready');
  console.log('Sections found:', $('#about, #graphic, #web').length);

});

// TOP 버튼을 위한 전역 함수 (HTML onclick에서 사용)
function scrollToTop() {
  $('html, body').animate({
    scrollTop: 0
  }, 800);
}