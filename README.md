# automation<br/>
Home automation<br/>
Проект, которые взаимодействует с установленными датчиками в доме.<br/>
Цель написания данного проекта: управление отоплением в ручном или автоматическом режиме(от температуры на этаже.<br/>
Если температура больше установленного значения - контур этого этажа нужно выключить, если меньше - включить).<br/>
На данный момент есть взаимодействие с двумя типами датчиков Socket(розетка) и Thermometer(термометр).<br/>
Каждый датчик имеет технологию ZigBee: <br/>
--------------------------------------------------------------------------------------------------------------------------------------------------------<br/>
Zigbee — технология, которая основана на радио стандарте IEEE 802.15.4 и предназначена для стандартизации маломощных M2M устройств разных производителей.<br/>
Из особенностей сети можно выделить высокую отказоустойчивость,<br/>
длительный срок службы конечных устройств от одной батареи,<br/>
поддержку большого количества подключений и совместную работу устройств разных производителей.<br/>
--------------------------------------------------------------------------------------------------------------------------------------------------------<br/>
Соединение осуществляется с помощью платы, которая обрабатывает сообщения с каждого датчика, передает их на ZigBee2mqtt сервис.<br/>
ZigBee2mqtt явзяется мостом между mqtt сервером и ZigBee.<br/>
Сообщение с датчика мы сможем получить подключившись к mqtt серверу по адресу: mqtt://192.168.1.101 предвадительно подписавшись на каждый датчик<br/>
subscribe(topic), где topic, это уникальный id датчика(например, zigbee2mqtt/0x00158d00035cd92b)<br/>

в проекте используются библиотеки:<br/>
-"bootstrap": "^5.1.3",<br/>
-"browser-sync": "^2.27.7",<br/>
-"fs": "0.0.1-security",<br/>
-"gulp": "^4.0.2",<br/>
-"gulp-cssbeautify": "^3.0.0",<br/>
-"gulp-csso": "^4.0.1",<br/>
-"gulp-nodemon": "^2.5.0",<br/>
-"gulp-pug": "^5.0.0",<br/>
-"gulp-sass": "^5.0.0",<br/>
-"jquery": "^3.6.0",<br/>
-"sass": "^1.43.4",<br/>
-"ws": "^8.3.0"<br/>

сборка осуществляется в gulpfile.js который парсит код с расширением .pug в понятный для браузера .html<br/>
команды для сборки проекта:<br/>
-gulp serve - запускает плагин browsersync на 3000 порту(по умолчанию запускает страницу /index.html);<br/>
-gulp pug - конвертирует все файлы расширения .pug в .html;<br/>
-gulp styles - конверирует файлы с расришением .scss в .css;<br/>
-gulp scripts - копирует файлы с расширением .js в папку build;<br/>
-gulp default (можно просто gulp) - собирает весь проект используя все выгеперечисленные функции. В кончено итоге получим полную сборку проекта в папке build.<br/>

При загрузке сайта отправляется api запрос на сервер, чтобы получить данные, которые будут видны в окне браузера,<br/>
после данные будут обнавляться в реальном времени с помощью websocket.<br/>

В проекта была использована библиотека jquery для упрощения написания кода.<br/>
Так же испоьзовалась библиотека стилей  bootstrap v5(в нем пришлось изменить стандартный текст, который подходил лчино нам)<br/>
WebSocket - которые позволяют видеть актуальную информацию в любой момент времени(информация обнавляется на всех клиентах)<br/>

Данная программа будет использоваться постоянно, будет развиваться и приносить пользу(например экономия денежных средств).<br/>
В будущем планируется расширить функционал прогаммы:<br/>
-добавить графики температур, количество потребляемой энергии и тд.<br/>
-добавить возможность добавить датчик в ручном режиме, чтобы незнающий пользователь не изменял код самостоятельно.<br/>
-добавить другие виды устройств: датчик движения, датчик растояния, пылесос.<br/>











