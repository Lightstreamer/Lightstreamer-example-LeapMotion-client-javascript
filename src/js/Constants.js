define(function() {
  
  return {
    OWN: "own",
    OTHER: "other",
    GHOST: "ghost",

    ADAPTER: "LEAPDEMO",
    LOG_UPDATES_ON_CONSOLE: false,
    DEBUG_LEAP: false,
    SIMULATE_LEAP: false,
    
    MAX_SIZE: {
     x:80,
     y:45,
     z:60
    },
    
    //TODO tune
    LEAP_PADDING: {
      x: 10,
      y: 10,
      z: 10
    },
    
    FRAME_INTERVAL: 50,
    BASE_RATE: 10,
    LOCAL_PLAYER_RT: false,
    
    DEFAULT_NICK: "Anonymous",
    ROOM: "leap"
  };
  
});