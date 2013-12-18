define(function() {
  
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  
  var Field = function(htmlEl) {
     
    this.scene = new THREE.Scene(); 
    this.group = new THREE.Object3D();
    this.scene.add( this.group );
    
    this.renderer = null;
    this.camera = null;
    
    this.webGLinUse = this.setupRenderer();
    htmlEl.appendChild(this.renderer.domElement);
    
    this.setupAxis();
    this.setupAxisNames();

    this.setupCamera();
    
    this.setupLight();
    
    this.render();
  };
  
  Field.prototype = {
      
      /**
       * @private
       */
      setupRenderer: function() {
        var webGl = true;
        try { 
          this.setupWebGL();
        } catch (e) { 
          webGl = false;
          this.setupCanvas();
        }
        
        if ( (WIDTH/HEIGHT) >  1.5) {
          this.renderer.setSize(WIDTH-(WIDTH*0.075), HEIGHT-(HEIGHT*0.075));
        } else {
          zWide = (WIDTH-(WIDTH*0.075));
          this.renderer.setSize(zWide, zWide/1.77777);
        }
        
        this.renderer.sortObjects = false;
        
        return webGl;
      },
      
      /**
       * @private
       */
      setupCamera: function() {
        var v = this.webGLinUse ? 0.1 : 1;
        this.camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, v, 10000); 
        this.camera.lookAt( {x:0,y:0,z:0} );
        this.camera.position.z = 140;
        
        if ( (WIDTH/HEIGHT) <=  1.5) {
          this.camera.aspect = 1.77777;
          this.camera.updateProjectionMatrix();
        }
      },
      
      /**
       * @private
       */
      setupLight: function() {
        // Lighting the scene.
        var lightF = new THREE.DirectionalLight( 0xffffff, 2 );
        lightF.position.set( 160, 90, 120 );
        this.scene.add( lightF );
        
        var light = new THREE.PointLight( 0xffffff, 2 ); 
        light.position.set( -160, -90, -120 );
        this.scene.add( light );
      },
      
      /**
       * @private
       */
      setupWebGL: function() {
        this.renderer = new THREE.WebGLRenderer(); 
      },
      
      /**
       * @private
       */
      setupCanvas: function() {
        this.renderer = new THREE.CanvasRenderer();
      },
      
      /**
       * @private
       */
      setupAxis: function() {
        var material = new THREE.LineBasicMaterial( { color: 0x2f2f2f, opacity: 0.2 } );
        
        var plane1 = new THREE.Geometry();
        plane1.vertices.push( new THREE.Vector3( 80, -45, 60 ) );
        plane1.vertices.push( new THREE.Vector3( -80, -45, 60 ) );
        plane1.vertices.push( new THREE.Vector3( -80, 45, 60 ) );
        plane1.vertices.push( new THREE.Vector3( 80, 45, 60 ) );
        
        var plane2 = new THREE.Geometry();
        plane2.vertices.push( new THREE.Vector3( 80, -45, -60 ) );
        plane2.vertices.push( new THREE.Vector3( -80, -45, -60 ) );
        plane2.vertices.push( new THREE.Vector3( -80, 45, -60 ) );
        plane2.vertices.push( new THREE.Vector3( 80, 45, -60 ) );
        
        var plane3 = new THREE.Geometry();
        plane3.vertices.push( new THREE.Vector3( -80, -45, 60 ) );
        plane3.vertices.push( new THREE.Vector3( -80, 45, 60 ) );
        plane3.vertices.push( new THREE.Vector3( -80, -45, -60 ) );
        plane3.vertices.push( new THREE.Vector3( -80, 45, -60 ) );
        
        var plane4 = new THREE.Geometry();
        plane4.vertices.push( new THREE.Vector3( -80, 45, 60 ) );
        plane4.vertices.push( new THREE.Vector3( -80, 45, -60 ) );
        plane4.vertices.push( new THREE.Vector3( 80, 45, 60 ) );
        plane4.vertices.push( new THREE.Vector3( 80, 45, -60 ) );

        var plane5 = new THREE.Geometry();
        plane5.vertices.push( new THREE.Vector3( 80, 45, 60 ) );
        plane5.vertices.push( new THREE.Vector3( 80, 45, -60 ) );
        plane5.vertices.push( new THREE.Vector3( 80, -45, -60 ) );
        plane5.vertices.push( new THREE.Vector3( 80, -45, 60 ) );
        
        var plane6 = new THREE.Geometry();
        plane6.vertices.push( new THREE.Vector3( -80, -45, -60 ) );
        plane6.vertices.push( new THREE.Vector3( -80, -45, 60 ) );
        plane6.vertices.push( new THREE.Vector3( 80, -45, 60 ) );
        plane6.vertices.push( new THREE.Vector3( 80, -45, -60 ) );
        
        var plane7 = new THREE.Geometry();
        plane7.vertices.push( new THREE.Vector3( 80, 45, 60 ) );
        plane7.vertices.push( new THREE.Vector3( 80, -45, 60 ) );
        plane7.vertices.push( new THREE.Vector3( 80, 45, -60 ) );
        plane7.vertices.push( new THREE.Vector3( 80, -45, -60 ) );
        
        var plane8 = new THREE.Geometry();
        plane8.vertices.push( new THREE.Vector3( -80, -45, 60 ) );
        plane8.vertices.push( new THREE.Vector3( -80, -45, -60 ) );
        
        var line8 = new THREE.Line( plane8, material );
        line8.type = THREE.LinePieces;
        this.group.add( line8 );
        
        var line7 = new THREE.Line( plane7, material );
        line7.type = THREE.LinePieces;
        this.group.add( line7 );
        
        var line5 = new THREE.Line( plane5, material );
        line5.type = THREE.LinePieces;
        this.group.add( line5 );
        
        var line4 = new THREE.Line( plane4, material );
        line4.type = THREE.LinePieces;
        this.group.add( line4 );
        
        var line1 = new THREE.Line( plane1, material );
        line1.type = THREE.LinePieces;
        this.group.add( line1 );
        
        var line2 = new THREE.Line( plane2, material );
        line2.type = THREE.LinePieces;
        this.group.add( line2 );
        
        var line3 = new THREE.Line( plane3, material );
        line3.type = THREE.LinePieces;
        this.group.add( line3 );
      },
      
      /**
       * @private 
       */
      setupAxisNames: function() {
        var materialAxisLabel = new THREE.MeshLambertMaterial( { color: 0x2a2a2a } );
        
        // Add axis name.
        var textaX = new THREE.TextGeometry( "x", {
                    size: 70,
                    height: 0,
                    curveSegments: 4,
                    font: "helvetiker"
                  });
        textaX.computeBoundingBox();
        var aX = new THREE.Mesh(textaX, materialAxisLabel);
        aX.position.x = -21;
        aX.position.y = -45;
        aX.position.z = -50;
        aX.quaternion.x = 0.7071067811;
        aX.quaternion.y = 0;
        aX.quaternion.z = 0;
        aX.quaternion.w = 0.7071067811;
        this.group.add( aX );
       
        var textaY = new THREE.TextGeometry( "y", {
          size: 50,
          height: 0,
          curveSegments: 4,
          font: "helvetiker"
        });
        textaY.computeBoundingBox();
        var aY = new THREE.Mesh(textaY, materialAxisLabel);
        //aY.position.x = -76;
        //aY.position.y = -37;
        //aY.position.z = -59;
        aY.position.x = -75;
        aY.position.y = -15;
        aY.position.z = -60;
        aY.quaternion.x = 0;
        aY.quaternion.y = 0;
        aY.quaternion.z = 0;
        aY.quaternion.w = 1;
        this.group.add( aY );
        
        var textaZ = new THREE.TextGeometry( "z", {
              size: 50,
              height: 0,
              curveSegments: 4,
              font: "helvetiker"
            });
        textaZ.computeBoundingBox();
        var aZ = new THREE.Mesh(textaZ, materialAxisLabel);
        //aZ.position.x = -78;
        //aZ.position.y = -43;
        //aZ.position.z = -50;
        aZ.position.x = -80;
        aZ.position.y = -41;
        aZ.position.z = 15;
        aZ.quaternion.x = 0;
        aZ.quaternion.y = 0.7071067811;
        aZ.quaternion.z = 0;
        aZ.quaternion.w = 0.7071067811;
        this.group.add( aZ );
        
      },
      
      
///////////////////---> end initialization code
      isWebGLinUse: function() {
        return this.webGLinUse;
      },

      render: function() {
        if (this.waitingToRender) {
          return;
        }
        this.waitingToRender = true;
        var that = this;
        requestAnimationFrame(function() {
          that.waitingToRender = false;
          that.renderer.render(that.scene, that.camera); 
        });
      },
      
      addObject: function(obj) {
        this.group.add(obj);
        this.render();
      },
      
      removeObject: function(obj) {
        this.group.remove(obj);
        this.render();
      }
  };
  
  return Field;
  
});