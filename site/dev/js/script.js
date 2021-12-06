const ws = new WebSocket('ws://localhost:9090');

$(function(){

    ws.onmessage = message => {
        const response = JSON.parse(message.data);
        console.log(response);

        $(`#${response.name}`)
            .find('h5.name').text(response.name).end()
            .find('h5.state').text(response.state).end()
            .find('h5.floor').text(response.floor).end()
            .find('h5.temperature').text(response.temperature).end()
            .find('h5.humidity').text(response.humidity).end();

        const device_info = $(`#${response.name}`).find('.'+`${response.type}`+'-information');
            device_info.find('h5.name').text(response.name).end()
            .find('h5.state').text(response.state).end()
            .find('h5.floor').text(response.floor).end()
            .find('h5.power').text(response.power).end()
            .find('h5.consumption').text(response.consumption).end()
            .find('h5.linkquality').text(response.linkquality).end()
            .find('h5.temperature').text(response.temperature).end()
            .find('h5.humidity').text(response.humidity).end()
            .find('h5.pressure').text(response.pressure).end()
            .find('ah5.voltage').text(response.voltage).end()
            .find('h5.topic').text(response.topic).end();
        
        if(response.type == 'thermometer')
            $(".temperature-floor"+`${response.floor}`).text(response.temperature).end();
        
        const looked = $(".all-device-information");
        if(looked.find('h5.name').text() == response.name) {
            looked.find('h5.name').text(response.name).end()
            .find('h5.state').text(response.state).end()
            .find('h5.floor').text(response.floor).end()
            .find('h5.power').text(response.power).end()
            .find('h5.consumption').text(response.consumption).end()
            .find('h5.linkquality').text(response.linkquality).end()
            .find('h5.temperature').text(response.temperature).end()
            .find('h5.humidity').text(response.humidity).end()
            .find('h5.pressure').text(response.pressure).end()
            .find('ah5.voltage').text(response.voltage).end()
            .find('h5.topic').text(response.topic).end();

            
        }
    };

    const s_link = '.sockets-container-list';
    const t_link = '.thermometers-container-list';

    
    function create_device(device) {
       
        console.log(device);
        if(device.type == "socket"){

            const t_socket =  $('#t-socket');
            
            const socket = t_socket.contents().clone().appendTo(s_link)
                .attr('id', device.name)
                .find('h5.name').text(device.name).end()
                .find('h5.state').text(device.state).end()
                .find('h5.floor').text(device.floor).end();

            const socket_info = socket.find('.socket-information');

            socket_info.find('h5.name').text(device.name).end()
            .find('h5.state').text(device.state).end()
            .find('h5.floor').text(device.floor).end()
            .find('h5.power').text(device.power).end()
            .find('h5.consumption').text(device.consumption).end()
            .find('h5.linkquality').text(device.linkquality).end()
            .find('h5.temperature').text(device.temperature).end()
            .find('h5.topic').text(device.topic).end();

            

        }
        else if(device.type == "thermometer"){
            
            const t_temp = $('#t-thermometer');
            
            const temp = t_temp.contents().clone().appendTo(t_link)
            .attr('id', device.name)
            .find('h5.name').text(device.name).end()
            .find('h5.floor').text(device.floor).end()
            .find('h5.temperature').text(device.temperature).end()
            .find('h5.humidity').text(device.humidity).end();
            
            const temp_info = temp.find('.thermometer-information');

            $(".temperature-floor"+`${device.floor}`).text(device.temperature).end();

            temp_info.find('h5.name').text(device.name).end()
            .find('h5.floor').text(device.floor).end()
            .find('h5.temperature').text(device.temperature).end()
            .find('h5.humidity').text(device.humidity).end()
            .find('h5.linkquality').text(device.linkquality).end()
            .find('h5.pressure').text(device.pressure).end()
            .find('h5.voltage').text(device.voltage).end()
            .find('h5.topic').text(device.topic).end();
        }

        //change_local_device(device)
    }
    
    $.getJSON('/api/v1/devices', function(data) {
        console.log(data);
        data.forEach(device => create_device(device));
    });
    
    $('.toggle-device').on('click', function(){
        
        $(this).closest('.device-item-bottom').find('.sockects').toggleClass('d-none').end()
        .closest('.device-item-bottom').find('.thermometers').toggleClass('d-none').end()
        .closest('.device-item-bottom').find('.toggle-device').toggleClass('choose').end();
        // $('.all-device-information-content').empty();
    })

    $('.devices').on('click','.device', function(){

        $('.all-device-information-content').empty();
        const cln = $(this).clone();
        cln.appendTo('.all-device-information-content');
        
        const element = cln.children().attr('class');
        cln.find("."+`${element}`+"-information").removeClass('d-none');

        if(element == "socket" && $(".turn-off-button").hasClass('d-none')) {
            $(".turn-off-button").removeClass('d-none');
        }
        else if(element == "thermometer" && $(".turn-off-button").hasClass('d-none') == false) {
            $(".turn-off-button").addClass('d-none');
        }
    })

    $(".turn-off-button").on('click', function(){
        
        
        const t = $(this).closest('.all-device-information').find("h5.state").text();
        const state = $(this).closest('.all-device-information').find("h5.state").text() == "ON" ? "OFF" : "ON";
        
        const obj = {
            state: state,
            topic: $(this).closest('.all-device-information').find("h5.topic").text()
        }
        
        $.ajax('/api/v1/state', {
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(obj),
            method: 'POST'});
     
    });

    $('.all-device-information-content').on('dblclick',function(){
        $(this).empty();
    })
    
    console.log("get");
        
})