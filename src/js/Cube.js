define(["./Constants"],function(Constants) {
  
  var geometry = new THREE.CubeGeometry(2,4,2);
  
  var materials = {};
  materials[Constants.OWN] = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
  materials[Constants.OTHER] = new THREE.MeshLambertMaterial( { color: 0x0f87ff } );
  materials[Constants.GHOST] = new THREE.MeshLambertMaterial( { color: 0xdddddd } );
  
  var NICK_OFFSET = {
      x: 2,
      y: 1,
      z: 2,
  };
  var MSG_OFFSET = {
      x: 0,
      y: -3,
      z: 2
  };
      
  
  var materialMsgs = new THREE.MeshLambertMaterial( { color: 0xffc32b } );
  
  var Cube = function(key,type,field,showInfo) {
    this.field = field;
    
    this.cube = null;
    this.dinamics = {V: new THREE.Vector3( 0, 0, 0 ), R: new THREE.Vector3( 0, 0, 0 )};
    
    this.text = null; 
    this.nick = null;
    this.showNickFlag = showInfo;
    
    this.msg = null; 
    this.status = null;
    this.showStatusFlag = showInfo;
    
    this.key = key;
    this.type = type;
    
    
    
    this.initCube();
  };
  
  
  Cube.prototype = {
      /**
       * @private
       */
      initCube: function() {
        
        this.cube = new THREE.Mesh(geometry, materials[this.type]);
        //this.cube.useQuaternion = true; is now the default

        this.field.addObject(this.cube);
      },
      
      clear: function() {
        this.field.removeObject(this.cube);
        this.cube = null;
        this.showNick(false);
        this.showStatus(false);
      },
        
      setNick: function(nick) {
        this.nick = nick;
        this.showNick(this.showNickFlag);
      },
      
      showNick: function(show) {
        if (this.text != null) {
          this.field.removeObject(this.text);
          this.text = null;
        }
        
        this.showNickFlag = show;
        
        if (this.nick == null || this.nick == "" || !show) {
          return;
        }
        
        var text3d = new THREE.TextGeometry( this.nick, {
              size: 1.2,
              height: 0,
              curveSegments: 0,
              
              font: "droid serif",
              weight: "bold",
            });
        text3d.computeBoundingBox();

        this.text = new THREE.Mesh(text3d, materials[this.type]);

        this.text.position.x = this.cube.position.x+NICK_OFFSET["x"];
        this.text.position.y = this.cube.position.y+NICK_OFFSET["y"];
        this.text.position.z = this.cube.position.z+NICK_OFFSET["z"];
        
        this.field.addObject(this.text);
        
        this.field.render();
      }, 
      
      setStatus: function(status) {
        this.status = status;
        this.showStatus(this.showStatusFlag);
      },
      
      showStatus: function (show) {
        if (this.msg != null) {
          this.field.removeObject(this.msg);
          this.msg = null;
        }
       
        this.showStatusFlag = show;
        
        if (this.status == null || this.status == "" || !show) {
          return;
        }

        text3d = new THREE.TextGeometry( this.status, {
          size: 1.2,
          height: 0,
          curveSegments: 0,

          font: "droid serif"
        });
        text3d.computeBoundingBox();
        
        this.msg = new THREE.Mesh(text3d, materialMsgs);
        
        this.msg.position.x = this.cube.position.x+MSG_OFFSET["x"];
        this.msg.position.y = this.cube.position.y+MSG_OFFSET["y"];
        this.msg.position.z = this.cube.position.z+MSG_OFFSET["z"];
        
        this.field.addObject(this.msg);
        
        this.field.render();
      },
      
      getKey: function() {
        return this.key;
      },
      getCube: function() {
        return this.cube;
      },
      getDinamics: function() {
        return this.dinamics;
      },
      getStatus: function(){
        return this.status;
      },
      getNick: function() {
        return this.nick;
      },
     
      setDVX: function(val) {
        this.dinamics.V.x = val;
      },
      setDVY: function(val) {
        this.dinamics.V.y = val;
      },
      setDVZ: function(val) {
        this.dinamics.V.z = val;
      },
      setDRX: function(val) {
        this.dinamics.R.x = val;
      },
      setDRY: function(val) {
        this.dinamics.R.y = val;
      },
      setDRZ: function(val) {
        this.dinamics.R.z = val;
      },
      
      //Rotation
      
      setRotX: function(val) {
        this.setRotation("x",val);
      },
      setRotY: function(val) {  
        this.setRotation("y",val);
      },
      setRotZ: function(val) {
        this.setRotation("z",val);
      },
      setRotW: function(val) {
        this.setRotation("w",val);
      },
      
      setRotation: function(axis,val) {
        this.cube.quaternion[axis] = val;
        this.field.render();
      },
      
      //Position
      
      setPosX: function(val) {
        this.setPos("x",val);
      },
      setPosY: function(val) {  
        this.setPos("y",val);
      },
      setPosZ: function(val) {
        this.setPos("z",val);
      },
      
      setPos: function(axis,value) {
        if ( value >= Constants.MAX_SIZE[axis] ) {
          value = Constants.MAX_SIZE[axis] * -1;
        }else if ( value <= (Constants.MAX_SIZE[axis] * -1) ) {
          value = Constants.MAX_SIZE[axis];
        }
        
        this.cube.position[axis] = value;
        if (this.text) {
          this.text.position[axis] = value+NICK_OFFSET[axis];
        }
        if (this.msg) {
          this.msg.position[axis] = value+MSG_OFFSET[axis];
        }
        
        this.field.render();
      },
      
      /**
       * @private
       */
      calculateAxisPos: function(axis,rateFactor) {
        return this.cube.position[axis] + (this.dinamics.V[axis] * 0.002 * rateFactor);
      },
      
      calculate: function(rateFactor) { 
        this.setPos("x", this.calculateAxisPos("x",rateFactor));
        this.setPos("y", this.calculateAxisPos("y",rateFactor));
        this.setPos("z", this.calculateAxisPos("z",rateFactor));
       
        var qx = new THREE.Quaternion();
        qx.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), (this.dinamics.R.x * 0.02 * rateFactor) );
        this.cube.quaternion.multiply( qx );
        this.cube.quaternion.normalize();
          
        var qy = new THREE.Quaternion();
        qy.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), (this.dinamics.R.y * 0.02 * rateFactor) );
        this.cube.quaternion.multiply( qy );
        this.cube.quaternion.normalize();
          
        var qz = new THREE.Quaternion();
        qz.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), (this.dinamics.R.z * 0.02 * rateFactor) );
        this.cube.quaternion.multiply( qz );
        this.cube.quaternion.normalize();
        
        this.field.render();
      }
  };
  
  return Cube;
});