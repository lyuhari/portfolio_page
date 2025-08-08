document.addEventListener('DOMContentLoaded', function() {
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
        });};});