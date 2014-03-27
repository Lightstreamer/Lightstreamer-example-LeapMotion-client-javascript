# Lightstreamer - Leap Motion Demo - HTML (LeapJS, Three.js) Client #

<!-- START DESCRIPTION lightstreamer-example-leapmotion-client-javascript -->

A simple application showing the integration between a [Leap Motion Controller](https://www.leapmotion.com/) and the [Lightstreamer JavaScript Client library](http://www.lightstreamer.com/docs/client_javascript_uni_api/index.html).

This demo displays a game field containing some small blocks. Each block is controlled by a different user connected to the same application through a Leap Motion Controller device. 

[![screenshot](screen_leap_large.png)](http://demos.lightstreamer.com/LeapDemo/)<br>
An online demonstration is hosted on our servers at: [http://demos.lightstreamer.com/LeapDemo/](http://demos.lightstreamer.com/LeapDemo/)<br>

This page uses the *JavaScript Client API for Lightstreamer* to handle the communications with Lightstreamer Server, *leapjs* to read the users' hand movement through the Leap Motion Controller and
*three.js* to display the users' positions on the browser.

Each user can act on its own block in two different modes: he can make a fist to grab its block and drag it around the game field or release the fist and "throw" his block.
In the first case all the hand positions are sent to the Lightstreamer server that in turn push them to all the currently connected clients, while on the latter case only 
the applied forces are sent to the server and to the other clients; each client will calculate the current position of the block using the received forces and will re-synchronize 
with the Lightstreamer server, that is calculating the various positions too, every few seconds. 

<!-- END DESCRIPTION lightstreamer-example-leapmotion-client-javascript -->

# Deploy #

Before you can run this demo some dependencies need to be solved:

-  Lightstreamer JS client is currently hot-linked in the html page: you may want to replace it with a local version and/or to upgrade its version.
-  RequireJS is currently hot-linked in the html page: you may want to replace it with a local version and/or to upgrade its version.
-  jQuery is currently hot-linked in the html page: you may want to replace it with a local version and/or to upgrade its version.
-  leapjs is currently hot-linked in the html page: you may want to replace it with a local version and/or to upgrade its version.
-  three.js is currently hot-linked in the html page: you may want to replace it with a local version and/or to upgrade its version.

You can deploy this demo inside Lightstreamer internal web server or in any other web server.
If you choose the former please create a new folder under <LS_HOME>/pages/ and copy the contents of the src folder of this project there.
The client demo configuration assume that Lightstreamer Server, Lightstreamer Adapters and this client are launched on the same machine.
If you need to targeting a different Lightstreamer server please search this line in lsClient.js:
```js
var lsClient = new LightstreamerClient(protocolToUse+"//localhost:8080",Constants.ADAPTER);
```
and change it accordingly.

Note that the [LEAPDEMO](https://github.com/Weswit/Lightstreamer-example-LeapMotion-adapter-java) adapters have to be deployed in your local Lightstreamer server instance.

# See Also #

## Lightstreamer Adapter Needed by This Demo Client ##
<!-- START RELATED_ENTRIES -->

* [Lightstreamer - Leap Motion Demo - Java Adapter](https://github.com/Weswit/Lightstreamer-example-LeapMotion-adapter-java)

<!-- END RELATED_ENTRIES -->

# Lightstreamer Compatibility Notes #

* Compatible with Lightstreamer JavaScript Client library version 6.1 or newer.
