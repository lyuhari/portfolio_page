// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 슬라이드 관련 변수
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide_img > div');
    const indicators = document.querySelectorAll('.slide_indicator');
    const slideContainer = document.querySelector('.slide_img');

    // 슬라이드 표시 함수
    function showSlide(index) {
        // 슬라이드 이동
        slideContainer.style.transform = `translateX(-${index * 33.333}%)`;
        
        // 인디케이터 업데이트
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }

    // 다음 슬라이드
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 이전 슬라이드
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // 슬라이드 화살표 이벤트 리스너
    const nextButton = document.querySelector('.slide_arrow.next');
    const prevButton = document.querySelector('.slide_arrow.prev');
    
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }

    // 인디케이터 클릭 이벤트
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    // 자동 슬라이드 (5초마다)
    setInterval(nextSlide, 5000);

    // 헤더 스크롤 효과
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const slideContainer = document.querySelector('.slide_container');
        
        if (!header || !slideContainer) return;
        
        const slideHeight = slideContainer.offsetHeight;
        
        // 스크롤 위치에 따른 헤더 스타일 변경
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 슬라이드 영역을 지나면 헤더 스타일 변경
        if (window.scrollY > slideHeight - 100) {
            header.classList.add('past-slider');
        } else {
            header.classList.remove('past-slider');
        }
    });

    // 언어 선택 드롭다운
    const languageToggle = document.querySelector('.toggle_select_language');
    const languageDropdown = document.querySelector('.select_language_list');
    
    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            languageDropdown.classList.toggle('show');
            this.classList.toggle('active');
        });
        
        // 외부 클릭시 드롭다운 닫기
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.select_language_wrap')) {
                languageDropdown.classList.remove('show');
                languageToggle.classList.remove('active');
            }
        });
    }

    // 제품 카드 호버 효과 (추가 기능)
    const productCards = document.querySelectorAll('.product_card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 뉴스 카드 호버 효과 (추가 기능)
    const newsCards = document.querySelectorAll('.news_card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
        });
    });

    // 스크롤 애니메이션 효과 (추가 기능)
    function animateOnScroll() {
        const elements = document.querySelectorAll('.product_card, .news_card, .direct_card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // 초기 애니메이션 설정
    const animatedElements = document.querySelectorAll('.product_card, .news_card, .direct_card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    // 스크롤 이벤트에 애니메이션 추가
    window.addEventListener('scroll', animateOnScroll);
    
    // 페이지 로드시 한번 실행
    animateOnScroll();
});

// jQuery를 사용한 추가 기능 (jQuery가 로드되었을 때만 실행)
$(document).ready(function() {
    
    // 부드러운 스크롤 효과
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = this.hash;
        const $target = $(target);
        
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 100
            }, 600, 'swing');
        }
    });

    // 메뉴 호버 효과 개선
    $('.gnb > li').hover(
        function() {
            $(this).find('.sub').stop(true, true).fadeIn(300);
        },
        function() {
            $(this).find('.sub').stop(true, true).fadeOut(200);
        }
    );

    // 이미지 lazy loading (선택사항)
    $('img').each(function() {
        const $img = $(this);
        const src = $img.attr('src');
        
        if (src) {
            $img.on('load', function() {
                $img.fadeIn(300);
            }).on('error', function() {
                console.log('이미지 로드 실패:', src);
            });
        }
    });


    // 검색 기능 (기본적인 형태)
    $('.search-input').on('keypress', function(e) {
        if (e.which === 13) { // Enter 키
            const searchTerm = $(this).val().trim();
            if (searchTerm) {
                console.log('검색어:', searchTerm);
                // 실제 검색 로직을 여기에 구현
            }
        }
    });
});