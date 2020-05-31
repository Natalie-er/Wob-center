$(document).ready(function () {
    if ($(window).width() <= 1280 && $(window).width() >= 768) {
        if ($('.rate-item').length) {
            for (i = 0; i < $('.rate-item').length; i++) {
                let rateItem = $('.rate-item')[i];
                let rateItemInfo = $(rateItem).find('.rate-box__info');
                let rateItemBottom = $(rateItem).find('.rate-item__bottom');
                
                $(rateItemInfo).appendTo(rateItemBottom);
            }
        }
    }
})  