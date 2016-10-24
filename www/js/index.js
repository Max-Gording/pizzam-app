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
 * under the License.
 */
var app = {

    /*---------------app object property -------------------------------------------------------------------------------*/
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        app.goingState = "start-app";
                                                                              //  alert("From initialize " + app.goingState);
    },

    /*---------------app object property -------------------------------------------------------------------------------*/
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.

    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
                                                                             //    alert ("First Eventlistener");
        document.addEventListener('online', app.onOnline, false);
        document.addEventListener('offline', function(){
                                                                               //  alert("Timeout");
                //  setTimeout(function(){app.onOffline(), 40000});
                app.onOffline();
            }, false
        );

                                                                                //    alert("Next  listeners");

    },



    /*---------------app object property, Main Allication  Handler-------------------------------------------------------------------------------*/

    mainAppHandler: function(calledFrom){
        switch(calledFrom){
            case "onDeviceReady":
            {
                                                                                        //      alert("Enter mainAppHandler");
                app.checkConnection();

                if (app.goingState == "start-app" && app.myNetworkState == "connected") {
                                                                                        
                    var pizzamPortalURL = "http://pizzam.de";
                    var bodyTag = document.getElementsByTagName('body')[0];
                    bodyTag.addEventListener("click", function(){app.goToPortalSite(pizzamPortalURL);}, false);
                    app.goToPortalSite(pizzamPortalURL);

                }
            }
                break;

        }

    },


    /*---------------app object property -------------------------------------------------------------------------------*/
    // deviceready Event Handler

    onDeviceReady: function() {
        window.open = cordova.InAppBrowser.open;
                                                                //    alert("From onDeviceReady " + app.goingState);

        app.mainAppHandler("onDeviceReady");



    },

    /*---------------app object property -------------------------------------------------------------------------------*/

    stopRotation: function(){
                                                                         //   alert("Enter stopRotation");
        //    app.goingState = "stopped";
        var circularProgressContainer = document.querySelector('#circular-progress');
                                                                         //   alert(circularProgressContainer);
        circularProgressContainer.classList.remove("visible");
        circularProgressContainer.classList.add("not-visible");
    },

    /*---------------app object property -------------------------------------------------------------------------------*/

    startRotation: function(){
        var circularProgressContainer = document.querySelector('#circular-progress');
        circularProgressContainer.classList.remove("not-visible");
        circularProgressContainer.classList.add("visible");
    },


    /*---------------app object property -------------------------------------------------------------------------------*/

    checkConnection: function(){
        var networkState = navigator.connection.type;
        if (networkState == Connection.NONE){
            app.onOffline();
        }
        else{
            app.onOnline();
        }
    },

    /*---------------app object property -------------------------------------------------------------------------------*/

    onOffline: function(){
        setTimeout(closeOnOffline, 1000);
        function closeOnOffline() {
            var netState = navigator.connection.type;
                                                                            //    alert("NetworkState = "+netState);
            if (netState == Connection.NONE){
                app.myNetworkState = "no-internet";
                app.stopRotation();
                                                                           //   alert("No connection!"); //Debug
                app.myChildWindowClose();
             //   alert("Leider gibt es keine Internetverbindung.  Die Bestellung konnte nicht aufgegeben werden. Schließen Sie bitee die App um später zu probieren.");
                var noInternetMsgContainer = document.querySelector('#no-internet-msg-container');
                noInternetMsgContainer.classList.remove("not-visible");
                noInternetMsgContainer.classList.add("visible");
            };
        }
    },

    /*---------------app object property -------------------------------------------------------------------------------*/

    onOnline: function(){
        app.myNetworkState = "connected";
        //  app.startRotation();
                                                                                          //   alert("Connected!");
        var noInternetMsgContainer = document.querySelector('#no-internet-msg-container');
        noInternetMsgContainer.classList.remove("visible");
        noInternetMsgContainer.classList.add("not-visible");
    //    app.mainAppHandler("onOnline");
    },

   /*---------------app object property -------------------------------------------------------------------------------*/

    myChildWindowOpen: function(shopURL){

        var ref = window.open(shopURL, '_blank', 'location=no,hidden=yes,closebuttoncaption=Done,toolbar=no');
        //   var ref = window.open('http://google.com/', '_blank', 'location=yes,hidden=yes,closebuttoncaption=Done,toolbar=no,hardwareback=no');
        app.myCildWindowState = "loading";
        app.myChildWindow = ref;
                                                          //   alert("This is app.myChildWindow "+app.myChildWindow);
        var loadStopCallback = function (event) {
                                                                                 //     alert('stop: ' + event.url);
            //  setTimeout(function(){ app.stopRotation()},40);
            app.stopRotation();
            ref.show();
            //    setTimeout(function(){ ref.close()},15000);
            app.myCildWindowState = "showing";
        }
        ref.addEventListener('loadstop', loadStopCallback);
        ref.addEventListener('exit', function(){ ref = null;});

    },


    /*---------------app object property -------------------------------------------------------------------------------*/

    myChildWindowClose: function(){
                                                                            //   alert("Enter myChildWindowClose");
        if(!((app.myChildWindow == undefined) || (app.myChildWindow == null))){
                                                                             //     alert("In loop");
                                                                            //    alert("This is app.myChildWindow "+app.myChildWindow);
            app.myChildWindow.close();
            app.myCildWindowState = "closed";
            return;
        }
        else{return}
    },

    /*---------------app object property -------------------------------------------------------------------------------*/

    goToPortalSite: function(portalURL){
                                                          //   alert("Button Click!");
        app.startRotation();
        app.myChildWindowOpen(portalURL);
    },


    /*---------------app object property -------------------------------------------------------------------------------*/

    get goingState() {
        return this.goState;
    },

    set goingState(value){
        this.goState = value;
                                                             //   alert("Just state = " + this.state)
    },

    /*---------------app object property -------------------------------------------------------------------------------*/

    get myNetworkState() {
        return this.networkState;
    },

    set myNetworkState(value){
        this.networkState = value;
    },

    /*---------------app object property -------------------------------------------------------------------------------*/

    get myChildWindowState() {
        return this.childWindowState;
    },

    set myCildWindowState(value){
        this.childWindowState = value;
    },

    /*---------------app object property -------------------------------------------------------------------------------*/

    get myChildWindow(){
        return this.childWindow;
    },

    set myChildWindow(value){
        this.childWindow = value;
    },




    /*---------------app object end -------------------------------------------------------------------------------*/
};
