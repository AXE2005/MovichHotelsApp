// Notificaciones
             var id = 1, dialog;
        
			
            callback = function () {
                cordova.plugins.notification.local.getIds(function (ids) {
                    alert('IDs: ' + ids.join(' ,'));
                });
            };

            showToast = function (text) {
                setTimeout(function () {
                    if (device.platform != 'windows') {
                        window.plugins.toast.showShortBottom(text);
                    } else {
                        showDialog(text);
                    }
                }, 100);
            };

            showDialog = function (text) {
                if (dialog) {
                    dialog.content = text;
                    return;
                }

                dialog = new Windows.UI.Popups.MessageDialog(text);

                dialog.showAsync().done(function () {
                    dialog = null;
                });
            };

  
        <!-- permission -->

            hasPermission = function () {
                cordova.plugins.notification.local.hasPermission(function (granted) {
                     alert(granted ? 'Yes' : 'No');
                });
            };

            registerPermission = function () {
                cordova.plugins.notification.local.registerPermission(function (granted) {
                    //alert(granted ? 'Yes' : 'No');
                });
            };


        <!-- schedule -->
var idex = "";
            schedule = function (titulo, texto, idex) {
				//alert("hago schedule: "+titulo+texto+url);
				var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
				
                cordova.plugins.notification.local.schedule({
                    id: 1,
					title: titulo,
                    text: texto,
                    icon: 'file://icon.png',
                    sound: sound,
					data: { ide: idex }
                   });
            };

            scheduleMultiple = function () {
                cordova.plugins.notification.local.schedule([{
                    id: 1,
                    text: 'Multi Message 1'
                }, {
                    id: 2,
                    text: 'Multi Message 2'
                }, {
                    id: 3,
                    text: 'Multi Message 3'
                }]);
            };

            scheduleDelayed = function () {
                var now = new Date().getTime(),
                    _5_sec_from_now = new Date(now + 5 * 1000);

                var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';

                cordova.plugins.notification.local.schedule({
                    id: 1,
                    title: 'Scheduled with delay',
                    text: 'Test Message 1',
                    at: _5_sec_from_now,
                    sound: sound,
                    badge: 12
                });
            };

            scheduleMinutely = function () {
                var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';

                cordova.plugins.notification.local.schedule({
                    id: 1,
                    text: 'Scheduled every minute',
                    every: 'minute',
                    sound: sound
                });
            };
 

        <!-- update -->

            update = function () {
                cordova.plugins.notification.local.update({
                    id: 1,
                    text: 'Updated Message 1',
                    json: { updated: true }
                });
            };

            updateInterval = function () {
                cordova.plugins.notification.local.update({
                    id: 1,
                    text: 'Updated Message 1',
                    every: 'minute'
                });
            };
 

        <!-- clear -->

            clearSingle = function () {
                cordova.plugins.notification.local.clear(1, callback);
            };

            clearMultiple = function () {
                cordova.plugins.notification.local.clear([2, 3], callback);
            };

            clearAll = function () {
                cordova.plugins.notification.local.clearAll(callback);
            };


        <!-- cancel -->
            cancel = function () {
                cordova.plugins.notification.local.cancel(1, callback);
            };

            cancelMultiple = function () {
                cordova.plugins.notification.local.cancel([2, 3], callback);
            };

            cancelAll = function () {
                cordova.plugins.notification.local.cancelAll(callback);
            };

        <!-- presence -->
            isPresent = function () {
                cordova.plugins.notification.local.isPresent(id, function (present) {
                    alert(present ? 'Yes' : 'No');
                });
            };

            isScheduled = function () {
                cordova.plugins.notification.local.isScheduled(id, function (scheduled) {
                    alert(scheduled ? 'Yes' : 'No');
                });
            };

            isTriggered = function () {
                cordova.plugins.notification.local.isTriggered(id, function (triggered) {
                    alert(triggered ? 'Yes' : 'No');
                });
            };

        <!-- IDs -->
            var callbackIds = function (ids) {
               alert(ids);
                alert(ids.length === 0 ? '- none -' : ids.join(' ,'));
            };

            getIds = function () {
                cordova.plugins.notification.local.getIds(callbackIds);
            };

            getScheduledIds = function () {
                cordova.plugins.notification.local.getScheduledIds(callbackIds);
            };

            getTriggeredIds = function () {
                cordova.plugins.notification.local.getTriggeredIds(callbackIds);
            };

        <!-- notifications -->
            var callbackOpts = function (notifications) {
               alert(notifications);
                alert(notifications.length === 0 ? '- none -' : notifications.join(' ,'));
            };

            var callbackSingleOpts = function (notification) {
               alert(notification);
                alert(notification.toString());
            };

            get = function () {
                cordova.plugins.notification.local.get(1, callbackSingleOpts);
            };

            getMultiple = function () {
                cordova.plugins.notification.local.get([1, 2], callbackOpts);
            };

            getAll = function () {
                cordova.plugins.notification.local.getAll(callbackOpts);
            };

            getScheduled = function () {
                cordova.plugins.notification.local.getScheduled(callbackOpts);
            };

            getTriggered = function () {
                cordova.plugins.notification.local.getTriggered(callbackOpts);
            };


        <!-- callbacks -->
            document.addEventListener('deviceready', function () {

                cordova.plugins.notification.local.on('schedule', function (notification) {
                   //alert('onschedule', arguments);
                    //alert('scheduled: ' + notification.id);
                });

                cordova.plugins.notification.local.on('update', function (notification) {
                   //alert('onupdate', arguments);
                    // alert('updated: ' + notification.id);
                });

                cordova.plugins.notification.local.on('trigger', function (notification) {
                   //alert('ontrigger', arguments);
                    //alert('triggered: ' + notification.id);
                });

                cordova.plugins.notification.local.on('click', function (notification) {
                   //alert('onclick', arguments);
                    //alert('Smart Alert: ' + notification.title);
			//		if (notification.data.ide == 1) {
//            //alert('SmartHotel: ' + notification.data.ide);
//			document.location.href = "chat.html";
//        			}
//					if (notification.data.ide == 2) {
//            alert('Ha Ocurrido un Cambio en tu Vuelo !!');
//			document.location.href = "tools.html";
//       				}
//					if (notification.data.ide == 3) {
//            alert('Ha Cambiado el Estado de Tu Vuelo !!');
//			document.location.href = "tools.html";
//       				}
//					if (notification.data.ide == 4) {
//            //alert('Ha Cambiado el Estado de Tu Vuelo !!');
//			document.location.href = "request.html#lavanderia";
//       				}
					
                });

                cordova.plugins.notification.local.on('cancel', function (notification) {
                   //alert('oncancel', arguments);
                    // alert('canceled: ' + notification.id);
                });

                cordova.plugins.notification.local.on('clear', function (notification) {
                  // alert('onclear', arguments);
                    // alert('cleared: ' + notification.id);
                });

                cordova.plugins.notification.local.on('cancelall', function () {
                   alert('oncancelall', arguments);
                    // alert('canceled all');
                });

                cordova.plugins.notification.local.on('clearall', function () {
                   alert('onclearall', arguments);
                    // alert('cleared all');
                });
            }, false);

        <!-- initialize -->
            app.initialize();
			
