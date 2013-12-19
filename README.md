# Lightstreamer - Leap Motion Demo - HTML Clients #

_TODO Intro_

_TODO Snapshot_ _TODO link_

_TODO Description_

# Deploy #

Before you can run the demos of this project some dependencies need to be solved:

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

## Lightstreamer Adapter needed by this demo client ##

* [Lightstreamer - Leap Motion Demo - Java Adapter](https://github.com/Weswit/Lightstreamer-example-LeapMotion-adapter-java)

# Lightstreamer Compatibility Notes #

* Compatible with Lightstreamer JavaScript Client library version 6.1 or newer.