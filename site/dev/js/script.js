$(function(){

    const s_link = '.sockets-container-list';
    const t_link = '.thermometers-container-list';


    function change_local_device(device) {
        if (!localStorage.hasOwnProperty('devices')) {
            localStorage.setItem('devices', JSON.stringify({
                sockets: [],
                thermometers: []
            }))
        }

        console.log(JSON.parse(localStorage.getItem('devices')));
        const {sockets, thermometers} = JSON.parse(localStorage.getItem('devices'))
 
        switch (device.type) {
            case "socket":
                if (sockets.indexOf(device) === -1) {
                    sockets.push(device) 
                } else {
                    sockets = sockets.map( socket => socket.topic == device.topic 
                                ? device 
                                : socket)
                }
                
                localStorage.setItem('devices', JSON.stringify({sockets, thermometers}))
                break
            case "thermometer":
                 if (thermometers.indexOf(device) === -1) {
                    thermometers.push(device) 
                } else {
                    thermometers.map( thermometer => thermometer.topic == device.topic 
                                ? device 
                                : thermometer)
                }
                
                localStorage.setItem('devices', JSON.stringify({sockets, thermometers}))
                break
        }
        
    }

    function create_device(device) {
       

        if(device.type == "socket"){

            const socket =  $('#t-socket');
            const socket_info = socket.find('.socket-information');

            socket.contents().clone().appendTo(s_link)
            .find('h5.name').text(device.name).end()
            .find('h5.state').text(device.state).end()
            .find('h5.floor').text(device.floor).end();

            socket_info.find('h5.name').text(device.name).end()
            .find('h5.state').text(device.state).end()
            .find('h5.floor').text(device.floor).end();

        }
        else if(device.type == "thermometer"){
            
            const temp = $('#t-thermometer');
            const temp_info = temp.find('.thermometer-information');

            temp.contents().clone().appendTo(t_link)
            .find('h5.name').text(device.name).end()
            .find('h5.floor').text(device.floor).end();

            temp_info.find('h5.name').text(device.name).end()
            .find('h5.floor').text(device.floor).end();
        }

        change_local_device(device)
    }
    
    $.getJSON('/api/v1/devices', function(data) {
        console.log("get");
        data.forEach(device => create_device(device));
    });
    
    $('.toggle-device').on('click', function(){
        
        $(this).closest('.device-item-bottom').find('.sockects').toggleClass('d-none').end()
        .closest('.device-item-bottom').find('.thermometers').toggleClass('d-none').end()
        .closest('.device-item-bottom').find('.toggle-device').toggleClass('choose').end();
         $('.all-device-information-content').empty();
    })

    $('.devices').on('click','.device', function(){

        $('.all-device-information-content').empty();
        const cln = $(this).clone();
        cln.appendTo('.all-device-information-content');
        
        const element = cln.children().attr('class');
        cln.find("."+`${element}`+"-information").removeClass('d-none');


    })

    $('.all-device-information-content').on('dblclick',function(){
        $(this).empty();
    })
    
    console.log("get");
        
})