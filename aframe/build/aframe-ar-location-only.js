!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("aframe"),require("three")):"function"==typeof define&&define.amd?define(["aframe","three"],e):"object"==typeof exports?exports.ARjs=e(require("aframe"),require("three")):t.ARjs=e(t.AFRAME,t.THREE)}(this,(function(t,e){return(()=>{"use strict";var i={697:e=>{e.exports=t},807:t=>{t.exports=e}},o={};function n(t){var e=o[t];if(void 0!==e)return e.exports;var s=o[t]={exports:{}};return i[t](s,s.exports,n),s.exports}n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var s={};return(()=>{n.r(s);var t=n(697),e=n(807);const i=function(t){var i=this;this.object=t,this.object.rotation.reorder("YXZ"),this.enabled=!0,this.deviceOrientation={},this.screenOrientation=0,this.alphaOffset=0,this.smoothingFactor=1,this.TWO_PI=2*Math.PI,this.HALF_PI=.5*Math.PI;var o,n,s,a,r=function(t){i.deviceOrientation=t},d=function(){i.screenOrientation=window.orientation||0},c=(o=new e.Vector3(0,0,1),n=new e.Euler,s=new e.Quaternion,a=new e.Quaternion(-Math.sqrt(.5),0,0,Math.sqrt(.5)),function(t,e,i,r,d){n.set(i,e,-r,"YXZ"),t.setFromEuler(n),t.multiply(a),t.multiply(s.setFromAxisAngle(o,-d))});this.connect=function(){d(),window.addEventListener("orientationchange",d,!1),window.addEventListener("deviceorientation",r,!1),i.enabled=!0},this.disconnect=function(){window.removeEventListener("orientationchange",d,!1),window.removeEventListener("deviceorientation",r,!1),i.enabled=!1},this.update=function(){if(!1!==i.enabled){var t=i.deviceOrientation;if(t){var o=t.alpha?e.Math.degToRad(t.alpha)+i.alphaOffset:0,n=t.beta?e.Math.degToRad(t.beta):0,s=t.gamma?e.Math.degToRad(t.gamma):0,a=i.screenOrientation?e.Math.degToRad(i.screenOrientation):0,r=this.smoothingFactor;this.lastOrientation?(o=this._getSmoothedAngle(o,this.lastOrientation.alpha,r),n=this._getSmoothedAngle(n+Math.PI,this.lastOrientation.beta,r),s=this._getSmoothedAngle(s+this.HALF_PI,this.lastOrientation.gamma,r,Math.PI)):(n+=Math.PI,s+=this.HALF_PI),this.lastOrientation={alpha:o,beta:n,gamma:s},c(i.object.quaternion,o,n-Math.PI,s-this.HALF_PI,a)}}},this._orderAngle=function(t,e,i=this.TWO_PI){return e>t&&Math.abs(e-t)<i/2||t>e&&Math.abs(e-t)>i/2?{left:t,right:e}:{left:e,right:t}},this._getSmoothedAngle=function(t,e,i,o=this.TWO_PI){const n=this._orderAngle(t,e,o),s=n.left,a=n.right;n.left=0,n.right-=s,n.right<0&&(n.right+=o);let r=a==e?(1-i)*n.right+i*n.left:i*n.right+(1-i)*n.left;return r+=s,r>=o&&(r-=o),r},this.dispose=function(){i.disconnect()},this.connect()};var o,a=Math.PI/2;t.registerComponent("arjs-look-controls",{dependencies:["position","rotation"],schema:{enabled:{default:!0},magicWindowTrackingEnabled:{default:!0},pointerLockEnabled:{default:!1},reverseMouseDrag:{default:!1},reverseTouchDrag:{default:!1},touchEnabled:{default:!0},smoothingFactor:{type:"number",default:1}},init:function(){this.deltaYaw=0,this.previousHMDPosition=new THREE.Vector3,this.hmdQuaternion=new THREE.Quaternion,this.magicWindowAbsoluteEuler=new THREE.Euler,this.magicWindowDeltaEuler=new THREE.Euler,this.position=new THREE.Vector3,this.magicWindowObject=new THREE.Object3D,this.rotation={},this.deltaRotation={},this.savedPose=null,this.pointerLocked=!1,this.setupMouseControls(),this.bindMethods(),this.previousMouseEvent={},this.setupMagicWindowControls(),this.savedPose={position:new THREE.Vector3,rotation:new THREE.Euler},this.el.sceneEl.is("vr-mode")&&this.onEnterVR()},setupMagicWindowControls:function(){var e,o=this.data;t.utils.device.isMobile()&&(e=this.magicWindowControls=new i(this.magicWindowObject),"undefined"!=typeof DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission&&(e.enabled=!1,this.el.sceneEl.components["device-orientation-permission-ui"].permissionGranted?e.enabled=o.magicWindowTrackingEnabled:this.el.sceneEl.addEventListener("deviceorientationpermissiongranted",(function(){e.enabled=o.magicWindowTrackingEnabled}))))},update:function(t){var e=this.data;e.enabled!==t.enabled&&this.updateGrabCursor(e.enabled),t&&!e.magicWindowTrackingEnabled&&t.magicWindowTrackingEnabled&&(this.magicWindowAbsoluteEuler.set(0,0,0),this.magicWindowDeltaEuler.set(0,0,0)),this.magicWindowControls&&(this.magicWindowControls.enabled=e.magicWindowTrackingEnabled,this.magicWindowControls.smoothingFactor=e.smoothingFactor),t&&!e.pointerLockEnabled!==t.pointerLockEnabled&&(this.removeEventListeners(),this.addEventListeners(),this.pointerLocked&&this.exitPointerLock())},tick:function(t){this.data.enabled&&this.updateOrientation()},play:function(){this.addEventListeners()},pause:function(){this.removeEventListeners(),this.pointerLocked&&this.exitPointerLock()},remove:function(){this.removeEventListeners(),this.pointerLocked&&this.exitPointerLock()},bindMethods:function(){this.onMouseDown=t.utils.bind(this.onMouseDown,this),this.onMouseMove=t.utils.bind(this.onMouseMove,this),this.onMouseUp=t.utils.bind(this.onMouseUp,this),this.onTouchStart=t.utils.bind(this.onTouchStart,this),this.onTouchMove=t.utils.bind(this.onTouchMove,this),this.onTouchEnd=t.utils.bind(this.onTouchEnd,this),this.onEnterVR=t.utils.bind(this.onEnterVR,this),this.onExitVR=t.utils.bind(this.onExitVR,this),this.onPointerLockChange=t.utils.bind(this.onPointerLockChange,this),this.onPointerLockError=t.utils.bind(this.onPointerLockError,this)},setupMouseControls:function(){this.mouseDown=!1,this.pitchObject=new THREE.Object3D,this.yawObject=new THREE.Object3D,this.yawObject.position.y=10,this.yawObject.add(this.pitchObject)},addEventListeners:function(){var e=this.el.sceneEl,i=e.canvas;i?(i.addEventListener("mousedown",this.onMouseDown,!1),window.addEventListener("mousemove",this.onMouseMove,!1),window.addEventListener("mouseup",this.onMouseUp,!1),i.addEventListener("touchstart",this.onTouchStart),window.addEventListener("touchmove",this.onTouchMove),window.addEventListener("touchend",this.onTouchEnd),e.addEventListener("enter-vr",this.onEnterVR),e.addEventListener("exit-vr",this.onExitVR),this.data.pointerLockEnabled&&(document.addEventListener("pointerlockchange",this.onPointerLockChange,!1),document.addEventListener("mozpointerlockchange",this.onPointerLockChange,!1),document.addEventListener("pointerlockerror",this.onPointerLockError,!1))):e.addEventListener("render-target-loaded",t.utils.bind(this.addEventListeners,this))},removeEventListeners:function(){var t=this.el.sceneEl,e=t&&t.canvas;e&&(e.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp),e.removeEventListener("touchstart",this.onTouchStart),window.removeEventListener("touchmove",this.onTouchMove),window.removeEventListener("touchend",this.onTouchEnd),t.removeEventListener("enter-vr",this.onEnterVR),t.removeEventListener("exit-vr",this.onExitVR),document.removeEventListener("pointerlockchange",this.onPointerLockChange,!1),document.removeEventListener("mozpointerlockchange",this.onPointerLockChange,!1),document.removeEventListener("pointerlockerror",this.onPointerLockError,!1))},updateOrientation:(o=new THREE.Matrix4,function(){var t,e=this.el.object3D,i=this.pitchObject,n=this.yawObject,s=this.el.sceneEl;s.is("vr-mode")&&s.checkHeadsetConnected()?s.hasWebXR&&(t=s.renderer.xr.getCameraPose())&&(o.elements=t.transform.matrix,o.decompose(e.position,e.rotation,e.scale)):(this.updateMagicWindowOrientation(),e.rotation.x=this.magicWindowDeltaEuler.x+i.rotation.x,e.rotation.y=this.magicWindowDeltaEuler.y+n.rotation.y,e.rotation.z=this.magicWindowDeltaEuler.z)}),updateMagicWindowOrientation:function(){var t=this.magicWindowAbsoluteEuler,e=this.magicWindowDeltaEuler;this.magicWindowControls&&this.magicWindowControls.enabled&&(this.magicWindowControls.update(),t.setFromQuaternion(this.magicWindowObject.quaternion,"YXZ"),this.previousMagicWindowYaw||0===t.y||(this.previousMagicWindowYaw=t.y),this.previousMagicWindowYaw&&(e.x=t.x,e.y+=t.y-this.previousMagicWindowYaw,e.z=t.z,this.previousMagicWindowYaw=t.y))},onMouseMove:function(t){var e,i,o,n=this.pitchObject,s=this.previousMouseEvent,r=this.yawObject;this.data.enabled&&(this.mouseDown||this.pointerLocked)&&(this.pointerLocked?(i=t.movementX||t.mozMovementX||0,o=t.movementY||t.mozMovementY||0):(i=t.screenX-s.screenX,o=t.screenY-s.screenY),this.previousMouseEvent.screenX=t.screenX,this.previousMouseEvent.screenY=t.screenY,e=this.data.reverseMouseDrag?1:-1,r.rotation.y+=.002*i*e,n.rotation.x+=.002*o*e,n.rotation.x=Math.max(-a,Math.min(a,n.rotation.x)))},onMouseDown:function(t){var e=this.el.sceneEl;if(!(!this.data.enabled||e.is("vr-mode")&&e.checkHeadsetConnected())&&0===t.button){var i=e&&e.canvas;this.mouseDown=!0,this.previousMouseEvent.screenX=t.screenX,this.previousMouseEvent.screenY=t.screenY,this.showGrabbingCursor(),this.data.pointerLockEnabled&&!this.pointerLocked&&(i.requestPointerLock?i.requestPointerLock():i.mozRequestPointerLock&&i.mozRequestPointerLock())}},showGrabbingCursor:function(){this.el.sceneEl.canvas.style.cursor="grabbing"},hideGrabbingCursor:function(){this.el.sceneEl.canvas.style.cursor=""},onMouseUp:function(){this.mouseDown=!1,this.hideGrabbingCursor()},onTouchStart:function(t){1===t.touches.length&&this.data.touchEnabled&&!this.el.sceneEl.is("vr-mode")&&(this.touchStart={x:t.touches[0].pageX,y:t.touches[0].pageY},this.touchStarted=!0)},onTouchMove:function(t){var e,i,o=this.el.sceneEl.canvas,n=this.yawObject;this.touchStarted&&this.data.touchEnabled&&(i=2*Math.PI*(t.touches[0].pageX-this.touchStart.x)/o.clientWidth,e=this.data.reverseTouchDrag?1:-1,n.rotation.y-=.5*i*e,this.touchStart={x:t.touches[0].pageX,y:t.touches[0].pageY})},onTouchEnd:function(){this.touchStarted=!1},onEnterVR:function(){var t=this.el.sceneEl;t.checkHeadsetConnected()&&(this.saveCameraPose(),this.el.object3D.position.set(0,0,0),this.el.object3D.rotation.set(0,0,0),t.hasWebXR&&(this.el.object3D.matrixAutoUpdate=!1,this.el.object3D.updateMatrix()))},onExitVR:function(){this.el.sceneEl.checkHeadsetConnected()&&(this.restoreCameraPose(),this.previousHMDPosition.set(0,0,0),this.el.object3D.matrixAutoUpdate=!0)},onPointerLockChange:function(){this.pointerLocked=!(!document.pointerLockElement&&!document.mozPointerLockElement)},onPointerLockError:function(){this.pointerLocked=!1},exitPointerLock:function(){document.exitPointerLock(),this.pointerLocked=!1},updateGrabCursor:function(t){var e=this.el.sceneEl;function i(){e.canvas.classList.add("a-grab-cursor")}function o(){e.canvas.classList.remove("a-grab-cursor")}e.canvas?t?i():o():t?e.addEventListener("render-target-loaded",i):e.addEventListener("render-target-loaded",o)},saveCameraPose:function(){var t=this.el;this.savedPose.position.copy(t.object3D.position),this.savedPose.rotation.copy(t.object3D.rotation),this.hasSavedPose=!0},restoreCameraPose:function(){var t=this.el,e=this.savedPose;this.hasSavedPose&&(t.object3D.position.copy(e.position),t.object3D.rotation.copy(e.rotation),this.hasSavedPose=!1)}}),t.registerComponent("arjs-webcam-texture",{init:function(){this.scene=this.el.sceneEl,this.texCamera=new e.OrthographicCamera(-.5,.5,.5,-.5,0,10),this.texScene=new e.Scene,this.scene.renderer.autoClear=!1,this.video=document.createElement("video"),this.video.setAttribute("autoplay",!0),this.video.setAttribute("playsinline",!0),this.video.setAttribute("display","none"),document.body.appendChild(this.video),this.geom=new e.PlaneBufferGeometry,this.texture=new e.VideoTexture(this.video),this.material=new e.MeshBasicMaterial({map:this.texture});const t=new e.Mesh(this.geom,this.material);this.texScene.add(t)},play:function(){if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){const t={video:{facingMode:"environment"}};navigator.mediaDevices.getUserMedia(t).then((t=>{this.video.srcObject=t,this.video.play()})).catch((t=>{alert(`Webcam error: ${t}`)}))}else alert("sorry - media devices API not supported")},tick:function(){this.scene.renderer.clear(),this.scene.renderer.render(this.texScene,this.texCamera),this.scene.renderer.clearDepth()},pause:function(){this.video.srcObject.getTracks().forEach((t=>{t.stop()}))},remove:function(){this.material.dispose(),this.texture.dispose(),this.geom.dispose()}}),t.registerComponent("gps-camera",{_watchPositionId:null,originCoords:null,currentCoords:null,lookControls:null,heading:null,schema:{simulateLatitude:{type:"number",default:0},simulateLongitude:{type:"number",default:0},simulateAltitude:{type:"number",default:0},positionMinAccuracy:{type:"int",default:100},alert:{type:"boolean",default:!1},minDistance:{type:"int",default:0},maxDistance:{type:"int",default:0},gpsMinDistance:{type:"number",default:5},gpsTimeInterval:{type:"number",default:0}},update:function(){if(0!==this.data.simulateLatitude&&0!==this.data.simulateLongitude){var t=Object.assign({},this.currentCoords||{});t.longitude=this.data.simulateLongitude,t.latitude=this.data.simulateLatitude,t.altitude=this.data.simulateAltitude,this.currentCoords=t,this.originCoords=null,this._updatePosition()}},init:function(){if(this.el.components["arjs-look-controls"]||this.el.components["look-controls"]){this.lastPosition={latitude:0,longitude:0},this.loader=document.createElement("DIV"),this.loader.classList.add("arjs-loader"),document.body.appendChild(this.loader),this.onGpsEntityPlaceAdded=this._onGpsEntityPlaceAdded.bind(this),window.addEventListener("gps-entity-place-added",this.onGpsEntityPlaceAdded),this.lookControls=this.el.components["arjs-look-controls"]||this.el.components["look-controls"];var t=this._getDeviceOrientationEventName();if(this._onDeviceOrientation=this._onDeviceOrientation.bind(this),navigator.userAgent.match(/Version\/[\d.]+.*Safari/))if("function"==typeof DeviceOrientationEvent.requestPermission){var e=function(){console.log("Requesting device orientation permissions..."),DeviceOrientationEvent.requestPermission(),document.removeEventListener("touchend",e)};document.addEventListener("touchend",(function(){e()}),!1),alert("After camera permission prompt, please tap the screen to activate geolocation.")}else{var i=setTimeout((function(){alert("Please enable device orientation in Settings > Safari > Motion & Orientation Access.")}),750);window.addEventListener(t,(function(){clearTimeout(i)}))}window.addEventListener(t,this._onDeviceOrientation,!1)}},play:function(){if(0!==this.data.simulateLatitude&&0!==this.data.simulateLongitude){var t=Object.assign({},this.currentCoords||{});t.latitude=this.data.simulateLatitude,t.longitude=this.data.simulateLongitude,0!==this.data.simulateAltitude&&(t.altitude=this.data.simulateAltitude),this.currentCoords=t,this._updatePosition()}else this._watchPositionId=this._initWatchGPS(function(t){var e={latitude:t.coords.latitude,longitude:t.coords.longitude,altitude:t.coords.altitude,accuracy:t.coords.accuracy,altitudeAccuracy:t.coords.altitudeAccuracy};0!==this.data.simulateAltitude&&(e.altitude=this.data.simulateAltitude),this.currentCoords=e,(this._haversineDist(this.lastPosition,this.currentCoords)>=this.data.gpsMinDistance||!this.originCoords)&&(this._updatePosition(),this.lastPosition={longitude:this.currentCoords.longitude,latitude:this.currentCoords.latitude})}.bind(this))},tick:function(){null!==this.heading&&this._updateRotation()},pause:function(){this._watchPositionId&&navigator.geolocation.clearWatch(this._watchPositionId),this._watchPositionId=null},remove:function(){var t=this._getDeviceOrientationEventName();window.removeEventListener(t,this._onDeviceOrientation,!1),window.removeEventListener("gps-entity-place-added",this.onGpsEntityPlaceAdded)},_getDeviceOrientationEventName:function(){if("ondeviceorientationabsolute"in window)var t="deviceorientationabsolute";else"ondeviceorientation"in window?t="deviceorientation":(t="",console.error("Compass not supported"));return t},_initWatchGPS:function(t,e){return e||(e=function(t){console.warn("ERROR("+t.code+"): "+t.message),1!==t.code?3!==t.code||alert("Cannot retrieve GPS position. Signal is absent."):alert("Please activate Geolocation and refresh the page. If it is already active, please check permissions for this website.")}),"geolocation"in navigator==0?(e({code:0,message:"Geolocation is not supported by your browser"}),Promise.resolve()):navigator.geolocation.watchPosition(t,e,{enableHighAccuracy:!0,maximumAge:this.data.gpsTimeInterval,timeout:27e3})},_updatePosition:function(){if(this.currentCoords.accuracy>this.data.positionMinAccuracy){if(this.data.alert&&!document.getElementById("alert-popup")){var t=document.createElement("div");t.innerHTML="GPS signal is very poor. Try move outdoor or to an area with a better signal.",t.setAttribute("id","alert-popup"),document.body.appendChild(t)}}else{var e=document.getElementById("alert-popup");if(this.currentCoords.accuracy<=this.data.positionMinAccuracy&&e&&document.body.removeChild(e),this.originCoords)this._setPosition();else{this.originCoords=this.currentCoords,this._setPosition();var i=document.querySelector(".arjs-loader");i&&i.remove(),window.dispatchEvent(new CustomEvent("gps-camera-origin-coord-set"))}}},_setPosition:function(){var t=this.el.getAttribute("position"),e={longitude:this.currentCoords.longitude,latitude:this.originCoords.latitude};t.x=this.computeDistanceMeters(this.originCoords,e),t.x*=this.currentCoords.longitude>this.originCoords.longitude?1:-1,e={longitude:this.originCoords.longitude,latitude:this.currentCoords.latitude},t.z=this.computeDistanceMeters(this.originCoords,e),t.z*=this.currentCoords.latitude>this.originCoords.latitude?-1:1,this.el.setAttribute("position",t),window.dispatchEvent(new CustomEvent("gps-camera-update-position",{detail:{position:this.currentCoords,origin:this.originCoords}}))},computeDistanceMeters:function(t,e,i){var o=this._haversineDist(t,e);return i&&this.data.minDistance&&this.data.minDistance>0&&o<this.data.minDistance||i&&this.data.maxDistance&&this.data.maxDistance>0&&o>this.data.maxDistance?Number.MAX_SAFE_INTEGER:o},_haversineDist:function(t,i){var o=e.Math.degToRad(i.longitude-t.longitude),n=e.Math.degToRad(i.latitude-t.latitude),s=Math.sin(n/2)*Math.sin(n/2)+Math.cos(e.Math.degToRad(t.latitude))*Math.cos(e.Math.degToRad(i.latitude))*(Math.sin(o/2)*Math.sin(o/2));return 2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))*6371e3},_computeCompassHeading:function(t,e,i){var o=t*(Math.PI/180),n=e*(Math.PI/180),s=i*(Math.PI/180),a=Math.cos(o),r=Math.sin(o),d=Math.sin(n),c=Math.cos(s),h=Math.sin(s),u=-a*h-r*d*c,l=-r*h+a*d*c,p=Math.atan(u/l);return l<0?p+=Math.PI:u<0&&(p+=2*Math.PI),p*(180/Math.PI)},_onDeviceOrientation:function(t){void 0!==t.webkitCompassHeading?t.webkitCompassAccuracy<50?this.heading=t.webkitCompassHeading:console.warn("webkitCompassAccuracy is event.webkitCompassAccuracy"):null!==t.alpha?!0===t.absolute||void 0===t.absolute?this.heading=this._computeCompassHeading(t.alpha,t.beta,t.gamma):console.warn("event.absolute === false"):console.warn("event.alpha === null")},_updateRotation:function(){var t=(360-this.heading-(this.el.getAttribute("rotation").y-e.Math.radToDeg(this.lookControls.yawObject.rotation.y)))%360;this.lookControls.yawObject.rotation.y=e.Math.degToRad(t)},_onGpsEntityPlaceAdded:function(){this.originCoords&&window.dispatchEvent(new CustomEvent("gps-camera-origin-coord-set")),this.loader&&this.loader.parentElement&&document.body.removeChild(this.loader)}}),t.registerComponent("gps-entity-place",{_cameraGps:null,schema:{longitude:{type:"number",default:0},latitude:{type:"number",default:0}},remove:function(){window.removeEventListener("gps-camera-origin-coord-set",this.coordSetListener),window.removeEventListener("gps-camera-update-position",this.updatePositionListener)},init:function(){this.coordSetListener=()=>{if(!this._cameraGps){var t=document.querySelector("[gps-camera]");if(!t.components["gps-camera"])return void console.error("gps-camera not initialized");this._cameraGps=t.components["gps-camera"]}this._updatePosition()},this.updatePositionListener=t=>{if(this.data&&this._cameraGps){var e={longitude:this.data.longitude,latitude:this.data.latitude},i=this._cameraGps.computeDistanceMeters(t.detail.position,e);this.el.setAttribute("distance",i),this.el.setAttribute("distanceMsg",(o=(o=i).toFixed(0))>=1e3?o/1e3+" kilometers":o+" meters"),this.el.dispatchEvent(new CustomEvent("gps-entity-place-update-position",{detail:{distance:i}})),this._cameraGps.computeDistanceMeters(t.detail.position,e,!0)===Number.MAX_SAFE_INTEGER?this.hideForMinDistance(this.el,!0):this.hideForMinDistance(this.el,!1)}var o},window.addEventListener("gps-camera-origin-coord-set",this.coordSetListener),window.addEventListener("gps-camera-update-position",this.updatePositionListener),this._positionXDebug=0,window.dispatchEvent(new CustomEvent("gps-entity-place-added",{detail:{component:this.el}}))},hideForMinDistance:function(t,e){e?t.setAttribute("visible","false"):t.setAttribute("visible","true")},_updatePosition:function(){var t={x:0,y:this.el.getAttribute("position").y||0,z:0},e={longitude:this.data.longitude,latitude:this._cameraGps.originCoords.latitude};if(t.x=this._cameraGps.computeDistanceMeters(this._cameraGps.originCoords,e),this._positionXDebug=t.x,t.x*=this.data.longitude>this._cameraGps.originCoords.longitude?1:-1,e={longitude:this._cameraGps.originCoords.longitude,latitude:this.data.latitude},t.z=this._cameraGps.computeDistanceMeters(this._cameraGps.originCoords,e),t.z*=this.data.latitude>this._cameraGps.originCoords.latitude?-1:1,0!==t.y){var i=void 0!==this._cameraGps.originCoords.altitude?this._cameraGps.originCoords.altitude:0;t.y=t.y-i}this.el.setAttribute("position",t)}}),t.registerComponent("gps-projected-camera",{_watchPositionId:null,originCoords:null,currentCoords:null,lookControls:null,heading:null,schema:{simulateLatitude:{type:"number",default:0},simulateLongitude:{type:"number",default:0},simulateAltitude:{type:"number",default:0},positionMinAccuracy:{type:"int",default:100},alert:{type:"boolean",default:!1},minDistance:{type:"int",default:0},gpsMinDistance:{type:"number",default:0},gpsTimeInterval:{type:"number",default:0}},update:function(){if(0!==this.data.simulateLatitude&&0!==this.data.simulateLongitude){var t=Object.assign({},this.currentCoords||{});t.longitude=this.data.simulateLongitude,t.latitude=this.data.simulateLatitude,t.altitude=this.data.simulateAltitude,this.currentCoords=t,this.originCoords=null,this._updatePosition()}},init:function(){if(this.el.components["arjs-look-controls"]||this.el.components["look-controls"]){this.lastPosition={latitude:0,longitude:0},this.loader=document.createElement("DIV"),this.loader.classList.add("arjs-loader"),document.body.appendChild(this.loader),this.onGpsEntityPlaceAdded=this._onGpsEntityPlaceAdded.bind(this),window.addEventListener("gps-entity-place-added",this.onGpsEntityPlaceAdded),this.lookControls=this.el.components["arjs-look-controls"]||this.el.components["look-controls"];var t=this._getDeviceOrientationEventName();if(this._onDeviceOrientation=this._onDeviceOrientation.bind(this),navigator.userAgent.match(/Version\/[\d.]+.*Safari/))if("function"==typeof DeviceOrientationEvent.requestPermission){var e=function(){console.log("Requesting device orientation permissions..."),DeviceOrientationEvent.requestPermission(),document.removeEventListener("touchend",e)};document.addEventListener("touchend",(function(){e()}),!1),alert("After camera permission prompt, please tap the screen to activate geolocation.")}else{var i=setTimeout((function(){alert("Please enable device orientation in Settings > Safari > Motion & Orientation Access.")}),750);window.addEventListener(t,(function(){clearTimeout(i)}))}window.addEventListener(t,this._onDeviceOrientation,!1)}},play:function(){if(0!==this.data.simulateLatitude&&0!==this.data.simulateLongitude){var t=Object.assign({},this.currentCoords||{});t.latitude=this.data.simulateLatitude,t.longitude=this.data.simulateLongitude,0!==this.data.simulateAltitude&&(t.altitude=this.data.simulateAltitude),this.currentCoords=t,this._updatePosition()}else this._watchPositionId=this._initWatchGPS(function(t){var e={latitude:t.coords.latitude,longitude:t.coords.longitude,altitude:t.coords.altitude,accuracy:t.coords.accuracy,altitudeAccuracy:t.coords.altitudeAccuracy};0!==this.data.simulateAltitude&&(e.altitude=this.data.simulateAltitude),this.currentCoords=e,(this._haversineDist(this.lastPosition,this.currentCoords)>=this.data.gpsMinDistance||!this.originCoords)&&(this._updatePosition(),this.lastPosition={longitude:this.currentCoords.longitude,latitude:this.currentCoords.latitude})}.bind(this))},tick:function(){null!==this.heading&&this._updateRotation()},pause:function(){this._watchPositionId&&navigator.geolocation.clearWatch(this._watchPositionId),this._watchPositionId=null},remove:function(){var t=this._getDeviceOrientationEventName();window.removeEventListener(t,this._onDeviceOrientation,!1),window.removeEventListener("gps-entity-place-added",this.onGpsEntityPlaceAdded)},_getDeviceOrientationEventName:function(){if("ondeviceorientationabsolute"in window)var t="deviceorientationabsolute";else"ondeviceorientation"in window?t="deviceorientation":(t="",console.error("Compass not supported"));return t},_initWatchGPS:function(t,e){return e||(e=function(t){console.warn("ERROR("+t.code+"): "+t.message),1!==t.code?3!==t.code||alert("Cannot retrieve GPS position. Signal is absent."):alert("Please activate Geolocation and refresh the page. If it is already active, please check permissions for this website.")}),"geolocation"in navigator==0?(e({code:0,message:"Geolocation is not supported by your browser"}),Promise.resolve()):navigator.geolocation.watchPosition(t,e,{enableHighAccuracy:!0,maximumAge:this.data.gpsTimeInterval,timeout:27e3})},_updatePosition:function(){if(this.currentCoords.accuracy>this.data.positionMinAccuracy){if(this.data.alert&&!document.getElementById("alert-popup")){var t=document.createElement("div");t.innerHTML="GPS signal is very poor. Try move outdoor or to an area with a better signal.",t.setAttribute("id","alert-popup"),document.body.appendChild(t)}}else{var e=document.getElementById("alert-popup");if(this.currentCoords.accuracy<=this.data.positionMinAccuracy&&e&&document.body.removeChild(e),this.originCoords)this._setPosition();else{this.originCoords=this._project(this.currentCoords.latitude,this.currentCoords.longitude),this._setPosition();var i=document.querySelector(".arjs-loader");i&&i.remove(),window.dispatchEvent(new CustomEvent("gps-camera-origin-coord-set"))}}},_setPosition:function(){var t=this.el.getAttribute("position"),e=this.latLonToWorld(this.currentCoords.latitude,this.currentCoords.longitude);t.x=e[0],t.z=e[1],this.el.setAttribute("position",t),window.dispatchEvent(new CustomEvent("gps-camera-update-position",{detail:{position:this.currentCoords,origin:this.originCoords}}))},computeDistanceMeters:function(t,e){var i=this.el.getAttribute("position"),o=t.x-i.x,n=t.z-i.z,s=Math.sqrt(o*o+n*n);return e&&this.data.minDistance&&this.data.minDistance>0&&s<this.data.minDistance?Number.MAX_SAFE_INTEGER:s},latLonToWorld:function(t,e){var i=this._project(t,e);return[i[0]-this.originCoords[0],-(i[1]-this.originCoords[1])]},_project:function(t,e){const i=20037508.34;return[e/180*i,Math.log(Math.tan((90+t)*Math.PI/360))/(Math.PI/180)*i/180]},_unproject:function(t,e){const i=20037508.34;var o=e/i*180;return{longitude:t/i*180,latitude:180/Math.PI*(2*Math.atan(Math.exp(o*Math.PI/180))-Math.PI/2)}},_computeCompassHeading:function(t,e,i){var o=t*(Math.PI/180),n=e*(Math.PI/180),s=i*(Math.PI/180),a=Math.cos(o),r=Math.sin(o),d=Math.sin(n),c=Math.cos(s),h=Math.sin(s),u=-a*h-r*d*c,l=-r*h+a*d*c,p=Math.atan(u/l);return l<0?p+=Math.PI:u<0&&(p+=2*Math.PI),p*(180/Math.PI)},_onDeviceOrientation:function(t){void 0!==t.webkitCompassHeading?t.webkitCompassAccuracy<50?this.heading=t.webkitCompassHeading:console.warn("webkitCompassAccuracy is event.webkitCompassAccuracy"):null!==t.alpha?!0===t.absolute||void 0===t.absolute?this.heading=this._computeCompassHeading(t.alpha,t.beta,t.gamma):console.warn("event.absolute === false"):console.warn("event.alpha === null")},_updateRotation:function(){var t=(360-this.heading-(this.el.getAttribute("rotation").y-THREE.Math.radToDeg(this.lookControls.yawObject.rotation.y)))%360;this.lookControls.yawObject.rotation.y=THREE.Math.degToRad(t)},_haversineDist:function(t,e){var i=THREE.Math.degToRad(e.longitude-t.longitude),o=THREE.Math.degToRad(e.latitude-t.latitude),n=Math.sin(o/2)*Math.sin(o/2)+Math.cos(THREE.Math.degToRad(t.latitude))*Math.cos(THREE.Math.degToRad(e.latitude))*(Math.sin(i/2)*Math.sin(i/2));return 2*Math.atan2(Math.sqrt(n),Math.sqrt(1-n))*6371e3},_onGpsEntityPlaceAdded:function(){this.originCoords&&window.dispatchEvent(new CustomEvent("gps-camera-origin-coord-set")),this.loader&&this.loader.parentElement&&document.body.removeChild(this.loader)}}),t.registerComponent("gps-projected-entity-place",{_cameraGps:null,schema:{longitude:{type:"number",default:0},latitude:{type:"number",default:0}},remove:function(){window.removeEventListener("gps-camera-update-position",this.updatePositionListener)},init:function(){this.coordSetListener=()=>{if(!this._cameraGps){var t=document.querySelector("[gps-projected-camera]");if(!t.components["gps-projected-camera"])return void console.error("gps-projected-camera not initialized");this._cameraGps=t.components["gps-projected-camera"],this._updatePosition()}},this.updatePositionListener=t=>{if(this.data&&this._cameraGps){var e=this.el.getAttribute("position"),i=this._cameraGps.computeDistanceMeters(e);this.el.setAttribute("distance",i),this.el.setAttribute("distanceMsg",(o=(o=i).toFixed(0))>=1e3?o/1e3+" kilometers":o+" meters"),this.el.dispatchEvent(new CustomEvent("gps-entity-place-update-position",{detail:{distance:i}})),this._cameraGps.computeDistanceMeters(e,!0)===Number.MAX_SAFE_INTEGER?this.hideForMinDistance(this.el,!0):this.hideForMinDistance(this.el,!1)}var o},window.addEventListener("gps-camera-origin-coord-set",this.coordSetListener),window.addEventListener("gps-camera-update-position",this.updatePositionListener),this._positionXDebug=0,window.dispatchEvent(new CustomEvent("gps-entity-place-added",{detail:{component:this.el}}))},hideForMinDistance:function(t,e){e?t.setAttribute("visible","false"):t.setAttribute("visible","true")},_updatePosition:function(){var t=this._cameraGps.latLonToWorld(this.data.latitude,this.data.longitude),e=this.el.getAttribute("position");this.el.setAttribute("position",{x:t[0],y:e.y,z:t[1]})}})})(),s})()}));