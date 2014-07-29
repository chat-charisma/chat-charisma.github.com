$(window).load(function() {
    var offset = $(window).scrollTop(),
        yad = $('#kauli_yad_1');
    $(window).on('scroll', function(event) {
        var diff = offset - $(window).scrollTop();
        console.log(diff);
        offset = $(window).scrollTop();
        yad.addClass('fixed');
        if (diff > 0) {
            yad.removeClass('top');
            yad.addClass('bottom');
        } else if (diff < 0) {
            yad.removeClass('bottom');
            yad.addClass('top');
        }
    });
});
