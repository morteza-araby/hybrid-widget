/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * <plugin name="cordova-plugin-iosrtc" spec="https://github.com/BasqueVoIPMafia/cordova-plugin-iosrtc#a9d8f73acebf70f226dd90ac5b1393fe9f19a6ab" />
    
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    app.receivedEvent('deviceready');

    //Init for Native part
    console.log("C3RTCApp >>> deviceready event");

    // if iOS devices
    if (window.device.platform === "iOS") {
      cordova.plugins.iosrtc.debug.enable("*");

      // Pollute global namespace with WebRTC stuff.
      cordova.plugins.iosrtc.registerGlobals();

      window.addEventListener("orientationchange", function () {
        console.log("C3RTCApp >>> orientationchange event");

        updateVideos();
      });

      window.updateVideos = function () {
        console.debug("C3RTCApp >>> update iosrtc videos");

        // NOTE: hack, but needed due to CSS transitions and so on.
        [0, 500, 1000, 1500].forEach(function (delay) {
          setTimeout(function () {
            cordova.plugins.iosrtc.refreshVideos();
          }, delay);
        });
      };
    }
    // Non iOS devices.
    else {
      window.updateVideos = function () { };
    }

    // Wait a bit since we are adding more stuff into the DOM.
    setTimeout(function () {
      // Avoid iOS WebSocket crash:
      //   https://github.com/eface2face/cordova-plugin-iosrtc/issues/12
      // Also looad the original AppRTC JS scripts once Cordova is ready (so the iosrtc plugin
      // has polluted the window namespace with WebRTC class/functions).

      //TODO: Add your own js file here after device ready		  
      ["js/lib/jquery-2.2.1.min.js",
        "js/lib/materialize.min.js",
        "js/ios-websocket-hack.js",
        "js/init.js",
        "js/C3WidgetController.js",
        "js/C3LoginWidget.js",        
        "js/C3UserProfileWidget.js",
        "js/C3UserRoomsWidget.js",
        "js/C3ChatWidget.js",
        "js/C3CallWidget.js"].forEach(function (path) {
          var script = document.createElement("script");

          script.type = "text/javascript";
          script.src = path;
          script.async = false;
          document.getElementsByTagName("body")[0].appendChild(script);
        });

    }, 100);

    setTimeout(function () {
      app.initC3Widgets();
    }, 1000)


  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    // var parentElement = document.getElementById(id);
    // var listeningElement = parentElement.querySelector('.listening');
    // var receivedElement = parentElement.querySelector('.received');

    // listeningElement.setAttribute('style', 'display:none;');
    // receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },

  //initiate C3 widgets
  initC3Widgets: function () {
    var serverUrl = "https://demo.cct.ericsson.net";
    var containers = [];
    var loginContainer = document.getElementById('c3login-container');
    var userProfileContainer = document.getElementById('c3user-profile-container');
    var userRoomsContainer = document.getElementById('c3user-rooms-container');
    var chatContainer = document.getElementById('c3chat-container');
    var callContainer = document.getElementById("c3call-container");


    //Create a array of containers, with name and value for each container object.
    // This structure is mandatory, thou controller checks for name and value.
    containers.push({
      name: "C3LoginWidget",
      value: loginContainer
    });
    containers.push({
      name: "C3UserProfileWidget",
      value: userProfileContainer
    });
    containers.push({
      name: "C3UserRoomsWidget",
      value: userRoomsContainer
    });
    containers.push({
      name: "C3ChatWidget",
      value: chatContainer
    });
    containers.push({
      name: "C3CallWidget",
      value: callContainer
    });
    let palette = {
      canvasColor: '#F3F3F3', //seb block.appintformblock, background
      appBarColor: '#0092aa',
      appBarTextColor: '#FFFFFF',
      appBarTitleFontWeight: 100,
      subheaderColor: '#0092aa',
      subheaderFontWeight: '300',
      raisedButtonPrimaryColor: '#dadada',
      raisedButtonPrimaryTextColor: '#262626!important',
      //cardHeader
      cardHeaderBackgroundColor: '#005f71',
      cardHeaderColor: 'white',
      cardHeaderFontWeight: 'bold',
      cardHeaderFontSize: 16,
      cardHeaderTitleColor: 'white',
      cardHeaderSubtitleColor: 'white',

    }
    let controller = new window.C3WidgetController.controller();
    window.loginWidget = new C3LoginWidget({
      controller: controller,
      container: loginContainer,
      containers: containers,
      baseTheme: palette,
      globalName: 'loginWidget'
    });
    C3WidgetController.C3Utils.setCctAddress(serverUrl);
    app.initC3Events();

  },

  initC3Events: function () {
    //$('.button-collapse').sideNav();

    //Listening to Controller Events
    var userProfileContainer = document.getElementById('c3user-profile-container');
    var userRoomsContainer = document.getElementById('c3user-rooms-container');
    var chatContainer = document.getElementById('c3chat-container');
    var callContainer = document.getElementById("c3call-container");

    C3EventEmitter.on('change', function (event) {
      console.log('Got Event:', event);
      switch (event.action) {
        case 'SET_CURRENT_ROOM':
          userRoomsContainer.style.display = 'none';
          userProfileContainer.style.display = 'none';
          break;
        case 'APP_CHAT_WIDGET_DESTROYED':
          userRoomsContainer.style.display = 'block';
          userProfileContainer.style.display = 'block';
          break;

        default:
          break;
      }
    }.bind(this));
  }
};

app.initialize();