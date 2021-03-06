$(function() {
    var json = [];
    var field = $('.search-field');
    var icon = $('.icon-search');
    var results = $('.search-results ul');

    $.getJSON('/search.json', function(data) {
        json = data;
    });

    field.on('input', function() {
        if (field.val() !== '')
            search(field.val().toLowerCase());
        else
            results.empty();
    });

    icon.on('click', function() {
        field.animate({
            width: 'toggle'
        });
        field.focus();
    });

    field.on('blur', function() {
        if (field.val() === '')
            field.animate({
                width: 'toggle'
            });
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 200)
            $('.go-top').fadeIn(200);
        else
            $('.go-top').fadeOut(200);
    });

    $('.smoothScroll').on('click', function(e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        if (target == '') {
            target = '';
            $target = $('body');
        }
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });

    function search(text) {
        var found = false;
        results.empty();
        $.each(json, function(i, v) {
            if (v.title.toLowerCase().search(text) !== -1) {
                results.append('<li><a href="' + v.url + '">' + v.title + '</a></li>');
                found = true;
            }
        });
        if (!found)
            results.append('<li><p>Sorry, but what you were looking for was not found!</p></li>');
    }

    if ($('#resume').length > 0) {
      $('section').removeClass('content').addClass('resume-content');
    }
    if ($('.post').length > 0) {
      $('section').removeClass('content').addClass('post-content');
    }

    // Set the interval to be 5 seconds
    var t = setInterval(function(){
        $("#carousel ul").animate({marginLeft:-480},1000,function(){
            $(this).find("li:last").after($(this).find("li:first"));
            $(this).css({marginLeft:0});
        })
    },5000);
});

