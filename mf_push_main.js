/*
Version : 1.0.1
Documentation : 

  1. FOR SETTING UP USER ATTRIBUTES
  ----------------------------------------------------------
  Call the market api as given below to update the user details
  
  MarketFoxSdk.setUserDetails({
    name: 'Johny Lenn',
    email: 'johny@example.com',
    phone: '+97287629817'
  });
  
  All this info will be tagged to the subscribed push user
  When you change the info here, it will get updated.
  
  2. FOR SETTING UP SEGMENTS
  ----------------------------------------------------------
  Call the market api as given below to update the user details
  
  MarketFoxSdk.addToSegments('segment_1,segment_2');
  Here the current user will be added to 'segment_1' & 'segment_2'

  MarketFoxSdk.removeFromSegments('segment_3,segment_4');
  Here the current user will be removed from 'segment_3' & 'segment_4' 

*/

// var WEBSITE_KEY = 'b3c0c6e476517bcea10d3bedab83ff8e7a24d978b458b27fe19b9104052d1b46';

(function () {
  'use strict';
  
  var WEBSITE_KEY = 'db6c4f9a68611314f08195e7a4da6052ef780ea5874fbe49e823778857b236d1',
    BASE_URL = 'https://staging.marketfox.co/';
    // BASE_URL = 'http://localhost:3000/';

  var MarketFoxSdk = function(options) {
    this.sub = false;
    this.initialize();
  };

  MarketFoxSdk.prototype = {
    constructor: MarketFoxSdk,
    /* 
      All configs should be here
    */

    //related to browser push
    workerFileName: 'mf_push_worker.js',
    subscribeUrl: BASE_URL + 'push/subscribe',
    subscriptionUpdateUrl: BASE_URL + 'push/subscriber_update',
    unsubscribeUrl: BASE_URL + 'push/unsubscribe',

    /* 
      All the functions Which can be used as general purpose irrespective of product should be
      written here.
    */

    initialize: function () {
      this.setUserSession();
      if (this.chrome()) {
        this.registerServiceWorker();
      }
    },

    arrayDiff: function (a, b) {
      return a.filter(function(x) { return b.indexOf(x) < 0 });
    },

    arrayCommon: function (a, b) {
      return a.filter(function(x) { return b.indexOf(x) > -1 });
    },

    arrayUniq: function(arr) {
      return arr.filter(function (item, pos) { return arr.indexOf(item) == pos });
    },

    arrayTrim: function (arr) {
      return arr.map(Function.prototype.call, String.prototype.trim);
    },

    arrayClean: function (arr) {
      return this.arrayTrim(arr.filter(function(e){return e}));
    },

    sendRequest: function (url, data, method) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log('Success');
        } else {
          console.log('Error');
        }
      };
      xhr.send(JSON.stringify(data));
    },

    chrome: function () {
      return (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor));
    },

    getCookie: function (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') { 
            c = c.substring(1); 
          }
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    },

    setCookie: function (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=" + document.location.hostname + ";path=/";
    },

    setUserSession: function () {
      var existing_key = this.getCookie('mf_user_session_key');
      if (existing_key) {
        this.user_session_key = existing_key;
        this.setCookie('mf_user_session_key', this.user_session_key, 730);
      } else {
        this.user_session_key = Math.floor(new Date()).toString() + Math.random().toString(36).substr(2, 20);
        this.setCookie('mf_user_session_key', this.user_session_key, 730);
      }
    },
    
    /* 
      Browser Push related functions
    */

    registerServiceWorker: function () {
      var $this = this;
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register($this.workerFileName).
        then(function() {
          return navigator.serviceWorker.ready;
        }).then(function(serviceWorkerRegistration) {
          $this.reg = serviceWorkerRegistration;
          if ($this.reg) {
            $this.subscribe();
          }
        }).catch(function(error) {
          console.log('Service Worker Error.', error);
        });
      } else {
        console.log('Service Worker is not supported.');
      }
    },

    subscribe: function () {
      var $this = this;
      navigator.permissions.query({name:'notifications'})
      .then(function(permissionStatus) {
        $this.alreadySubscribed = (permissionStatus.state == 'granted');

        //subscribe for push
        $this.reg.pushManager.subscribe({userVisibleOnly: true}).
        then( function(pushSubscription) {
          $this.sub = pushSubscription;
          console.log('endpoint : ', $this.sub.endpoint);
          $this.deviceId = $this.sub.endpoint.split('/').slice(-1).pop();
          if (!$this.alreadySubscribed) {
            $this.sendSubscribeEvent();
          } else {
            $this.checkDeviceIdChanges();
          }
        });

        // to listen for unsubscribe event
        permissionStatus.onchange = function(event) {  
          if (this.state != 'granted') {
            $this.unsubscribeNotification($this, event);
          }
        };
      });
    },

    unsubscribe: function () {
      var $this = this;
      this.sub.unsubscribe().then(function(event) {
        $this.unsubscribeNotification($this, event);
      }).catch(function(error) {
        console.log('Error unsubscribing', error);
      });
    },

    unsubscribeNotification: function (obj, event) {
      var data = {
        'user_session_key': obj.user_session_key,
        'device_id': obj.deviceId,
        'site_key': WEBSITE_KEY
      };
      this.sendRequest(this.unsubscribeUrl, data, "POST");
      console.log('Unsubscribed from push notifications.', event);
    },

    sendSubscribeEvent: function () {
      console.log('Subscribe event send');
      var data = {
        'device_id': this.deviceId,
        'site_key': WEBSITE_KEY,
        'user_session_key': this.user_session_key
      };
      this.sendRequest(this.subscribeUrl, data, "POST");
      this.setCookie('mf_push_deviceId', this.deviceId, 732);
    },

    checkDeviceIdChanges: function() {
      var deviceId = this.getCookie('mf_push_deviceId');
      if (deviceId !== this.deviceId) {
        this.subscriberUpdate();
        this.setCookie('mf_push_deviceId', this.deviceId, 732);
      }
    },

    addToSegments: function (groups) {
      var existingGroups = this.arrayUniq(this.arrayClean(this.getCookie('mf_push_groups').split(','))).sort(),
        groupDiff;
      groups = this.arrayUniq(this.arrayClean(groups.split(','))).sort();
      groupDiff = this.arrayDiff(groups, existingGroups);
      if (groupDiff.length > 0) {
        groups = existingGroups.concat(groupDiff).sort().join();
        this.subscriberUpdate({groups_to_add: groupDiff.join()});
        this.setCookie('mf_push_groups', groups, 732);
      }
    },

    removeFromSegments: function (groups) {
      var existingGroups = this.arrayUniq(this.arrayClean(this.getCookie('mf_push_groups').split(','))).sort(),
        groupCommon, groupDiff;
      groups = this.arrayUniq(this.arrayClean(groups.split(','))).sort();
      groupCommon = this.arrayCommon(existingGroups, groups);
      if (groupCommon.length > 0) {
        groupDiff = this.arrayDiff(existingGroups, groupCommon);
        this.subscriberUpdate({groups_to_remove: groups.join()});
        this.setCookie('mf_push_groups', groupDiff.sort().join(), 732);
      }
    },

    setUserDetails: function (user) {
      var userName = this.getCookie('mf_push_user_name'),
        userEmail = this.getCookie('mf_push_user_email'),
        userPhone = this.getCookie('mf_push_user_phone'), data = {};
      if (user && user.name && (user.name.trim() !== userName.trim()) ) {
        data['name'] = user.name.trim();
        this.setCookie('mf_push_user_name', user.name.trim(), 732);
      };
      if (user && user.email && (user.email.trim() !== userEmail.trim())) {
        data['email'] = user.email.trim();
        this.setCookie('mf_push_user_email', user.email.trim(), 732);
      };
      if (user && user.phone && (user.phone.trim() !== userPhone.trim())) {
        data['phone'] = user.phone.trim();
        this.setCookie('mf_push_user_phone', user.phone.trim(), 732);
      };
      if (Object.keys(data).length !== 0) {
        this.subscriberUpdate({user: data});
      }
    },

    subscriberUpdate: function(data) {
      data = data || {};
      data['device_id'] = this.deviceId;
      data['user_session_key'] = this.user_session_key;
      data['site_key'] = WEBSITE_KEY;
      this.sendRequest(this.subscriptionUpdateUrl, data, 'POST');
    }

  };

  window.MarketFoxSdk = new MarketFoxSdk;
})();
