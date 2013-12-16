define(["LightstreamerClient","./Constants"],function(LightstreamerClient,Constants) {
  var lsClient = new LightstreamerClient(Constants.SERVER,Constants.ADAPTER);
  lsClient.connect();
  return lsClient;
});