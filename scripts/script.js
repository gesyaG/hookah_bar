$(document).ready(function () {

    new WOW().init();

    $('#btn-to-menu').on("click", function () {
        $('#menu')[0].scrollIntoView({behavior:"smooth"});
    });

    $('#btn-to-order').on("click", function () {
        $('#order')[0].scrollIntoView({behavior:"smooth"});
    });

    $('.single-item').slick({
        dots: true,
        responsive: [{
            breakpoint: 1070,
            settings: {
                arrows: false
            },
        }]
    });

    let phone =  $("#phone");

    $(function () {
        phone.mask("+7 (999) 999-99-99");
    })

    $('.autoplay').slick({
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 15000,
        variableWidth: true,
        responsive: [{
            breakpoint: 990,
            settings: {
                dots: true,
                arrows: false
            },
        }]
    });

    let navigation = $('#navigation');

    $('#burger').on("click", function () {
        navigation.addClass('open');
    })

    let time = $('#time');


    $('#close').on("click", function () {
        navigation.removeClass('open');
    })

    $('#submit').click(function () {
        let name = $('#name');
        let hasError = false;

        $('.error-input').hide();

        if (!name.val()) {
            name.css('border-color', "red");
            name.next().show();
            hasError = true;
        } else {
            name.css('border-color', "#f4f5f5");
        }
        if (!phone.val()) {
            phone.css('border-color', "red");
            phone.next().show();
            hasError = true;
        } else {
            phone.css('border-color', "#f4f5f5");
        }
        if (time.val() == 0) {
            time.css('border-color', "red");
            time.next().show();
            hasError = true;
        } else {
            time.css('border-color', "#f4f5f5");
        }

        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: name.val(), phone: phone.val(), time: time.val()}
            })
                .done(function (msg) {
                    console.log(msg);
                    if (msg.success === 1) {
                        let success = $('#success');
                        let orderHide = $('#order-hide');
                        let dateOrder = time.val().split(' ')[0];
                        let timeOrder = time.val().split(' ')[1];
                        orderHide.hide();
                        success.css('display', 'block');
                        $('#date-order').html(dateOrder);
                        $('#time-order').html(timeOrder);
                        $('#close-success').on("click", function () {
                            orderHide.css('display', 'block');
                            success.hide();
                        })
                    } else {
                        alert('Возникла ошибка при бронировании, позвоните нам и мы оформим вам бронь!');
                    }
                });
        }
    })

});

