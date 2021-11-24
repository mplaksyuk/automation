$(function(){
    $('.toggle-device').on('click', function(){
        
        $(this).closest('.device-item-bottom').find('.sockects').toggleClass('d-none').end()
        .closest('.device-item-bottom').find('.thermometers').toggleClass('d-none').end()
        .closest('.device-item-bottom').find('.toggle-device').toggleClass('choose').end();
    })

    $('.device').on('click', function(){
        $('.all-device-information-content').empty();
        const cln = $(this).clone();
        cln.appendTo('.all-device-information-content');
        
        const element = cln.children().attr('class');
        cln.find("."+`${element}`+"-information").removeClass('d-none');


    })

    $('.all-device-information-content').on('dblclick', function(){
        $(this).empty();
    })



})