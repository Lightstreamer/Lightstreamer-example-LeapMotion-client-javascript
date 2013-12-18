/*
Copyright 2013 Weswit s.r.l.

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

require(["js/LeapMotion.js"],
    function(LeapMotion) {
  
  $(document).ready(function() {
    function showInstructions(show) {
      if (show) {
        $("#waiting_leap").hide();
        $("#leap_instructions").show();
      } else {
        $("#waiting_leap").show();
        $("#leap_instructions").hide();
      }
    }
    setTimeout(function() {
      showInstructions(LeapMotion.isReady());
    },1000);
    LeapMotion.addListener({
      onReady: function(ready) {
        showInstructions(ready);
      }
    });
  });
});
  
  