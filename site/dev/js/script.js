$(function(){
    $('.toggle-device').on('click', function(){
        
        $(this).closest('.device-item-bottom').find('.sockects').toggleClass('d-none').end()
        .closest('.device-item-bottom').find('.thermometers').toggleClass('d-none').end()
        .closest('.device-item-bottom').find('.toggle-device').toggleClass('choose').end();
    })
})