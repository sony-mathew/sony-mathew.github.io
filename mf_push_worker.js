/* 
  Version 1.0.1
*/
'use strict';

var WEBSITE_KEY = 'db6c4f9a68611314f08195e7a4da6052ef780ea5874fbe49e823778857b236d1',
  // MF_BASE_URL = 'https://staging.marketfox.co/',
  MF_BASE_URL = 'https://v2.marketfox.io/',
  // BASE_URL = 'https://app.marketfox.io/',
  MF_PUSH_API_CAMPAIGN_FETCH = MF_BASE_URL + 'push/campaign/get_campaign',
  MF_PUSH_API_CLICK_NOTIFICATION = MF_BASE_URL + 'push/campaign/click_notification';

self.addEventListener('push', function(event) {
  console.log('Push notification recieved.');
  self.registration.pushManager.getSubscription().then(function(subscription) {
    event.waitUntil(
      fetch(MF_PUSH_API_CAMPAIGN_FETCH + "?site_key=" + WEBSITE_KEY + "&device_id=" + getDeviceId(subscription))
      .then(function(response) { return response.json(); })
      .then(function(data) {
        var msgPromises = [];
        var notificationOptions = {
          body: data.message,
          icon: data.icon,
          tag: data.campaign_id,
          actions: data.actions,
          data: {
            link: data.link,
            deviceId: getDeviceId(subscription),
            campaignId: data.campaign_id,
            action: data.actions,
            notificationTimeout: data.notification_timeout
          }
        };
        console.log('Fetched data.');
        msgPromises.push(showNotification(data.title, notificationOptions));
        return Promise.all(msgPromises);
      })
      .catch(function(error) {
        console.log('Error : ');
        console.log(error);
      });
    );
  })
});

self.addEventListener('notificationclick', function(event) {
  //closing the clicked notification
  event.notification.close();

  var data = event.notification.data || {},
    url = data.link,
    requestData = {
      method: 'post',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: "site_key=" + WEBSITE_KEY + "&device_id=" + data.deviceId + "&campaign_id=" + data.campaignId
    },
    currentAction, count;

  if (event.action) {
    for(count = 0; count < data.action.length; count++) {
      var currentAction = data.action[count];
      if (currentAction.action === event.action) {
        url = currentAction.url;
        requestData.body = requestData.body + "&action_button=" + currentAction.action;
      }
    }
  };

  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if ((client.url === url) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );

  //sending notification to server on click event
  event.waitUntil(
    return fetch(MF_PUSH_API_CLICK_NOTIFICATION, requestData).then(function(data) {
      console.log('Click Notification send.');
    })
  );
});

function showNotification(title, notificationOptions) {
  var showNotificationPromise = self.registration.showNotification(title, notificationOptions);
  if (notificationOptions.data.notificationTimeout) {
    setTimeout(function() {
        registration.getNotifications({ tag: notificationOptions.tag }).then(function(notifications) {
        for (var i = 0; i < notifications.length; i++) {
          notifications[i].close();
        }
        });
      }, notificationOptions.data.notificationTimeout);﻿
  }
  return showNotificationPromise;
}

function getDeviceId(subscription) {
  return subscription.endpoint.split('/').slice(-1).pop();
}

//helps in debugging
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed Worker.', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated Worker.', event);
});