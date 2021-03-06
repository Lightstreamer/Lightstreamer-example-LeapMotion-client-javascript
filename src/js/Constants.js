/*
  Copyright (c) Lightstreamer Srl

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
define(function() {
  
  var protocolToUse = document.location.protocol != "file:" ? document.location.protocol : "http:";
  
  return {
    OWN: "own",
    OTHER: "other",
    GHOST: "ghost",

    SERVER: protocolToUse+"//localhost:8080",
    ADAPTER: "LEAPDEMO",
    LOG_UPDATES_ON_CONSOLE: false,
    DEBUG_LEAP: false,
    SIMULATE_LEAP: false,
    
    MAX_SIZE: {
     x:80,
     y:45,
     z:60
    },
    
    LEAP_PADDING: {
      x: 100,
      y: 0,
      z: 10
    },
    
    FRAME_INTERVAL: 50,
    BASE_RATE: 10,
    LOCAL_PLAYER_RT: false,
    
    DEFAULT_NICK: "Anonymous",
    ROOM: "leap"
  };
  
});