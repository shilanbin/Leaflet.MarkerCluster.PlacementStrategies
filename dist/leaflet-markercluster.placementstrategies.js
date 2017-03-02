!function(e,t){L.MarkerCluster.include({spiderfy:function(){if(this._group._spiderfied!==this&&!this._group._inZoomAnimation){var e,t=this.getAllChildMarkers(),n=this._group,i=n._map,r=i.latLngToLayerPoint(this._latlng);this._group.getLayers()[0]instanceof L.CircleMarker||(r.y+=10);for(var o in t)t[o].setStyle({className:"clustered-element"});switch(this._group._unspiderfy(),this._group._spiderfied=this,this._clockHelpingGeometries=[],this._group.options.elementsPlacementStrategy){case"default":e=t.length>=this._circleSpiralSwitchover?this._generatePointsSpiral(t.length,r):this._generatePointsCircle(t.length,r);break;case"spiral":e=this._generatePointsSpiral(t.length,r);break;case"one-circle":e=this._generatePointsCircle(t.length,r);break;case"concentric":e=this._generatePointsConcentricCircles(t.length,r);break;case"clock":e=this._generatePointsClocksCircles(t.length,r,!1);break;case"clock-concentric":e=this._generatePointsClocksCircles(t.length,r,!0);break;default:console.log('!!unknown placement strategy value. Allowed strategy names are : "default", "spiral", "one-circle", "concentric", "clock" and "clock-concentric" ')}this._animationSpiderfy(t,e)}},unspiderfy:function(e){var t=this._group;this._group._inZoomAnimation||(this._animationUnspiderfy(e),t.options.helpingCircles&&this._removeClockHelpingCircles(t._featureGroup),t._spiderfied=null)},_generatePointsCircle:function(e,t){var n,i,r=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+e),o=r/this._2PI,s=this._2PI/e,l=[];for(l.length=e,n=e-1;n>=0;n--)i=this._circleStartAngle+n*s,l[n]=new L.Point(t.x+o*Math.cos(i),t.y+o*Math.sin(i))._round();return l},_generatePointsSpiral:function(e,t){var n,i=this._group.options.spiderfyDistanceMultiplier,r=i*this._spiralLengthStart,o=i*this._spiralFootSeparation,s=i*this._spiralLengthFactor*this._2PI,l=0,a=[];for(a.length=e,n=e-1;n>=0;n--)l+=o/r+5e-4*n,a[n]=new L.Point(t.x+r*Math.cos(l),t.y+r*Math.sin(l))._round(),r+=s/l;return a},_regularPolygonVertexPlacement:function(e,t,n,i){var r=this._2PI/t,o=r*e;return 2!==t&&(o-=1.6),new L.Point(n.x+Math.cos(o)*i,n.y+Math.sin(o)*i)._round()},_generatePointsClocksCircles:function(e,t,n){var i=[],r=this._group.options.firstCircleElements,o=1.5*this._circleFootSeparation,s=this._group.options.spiderfyDistanceMultiplier,l=this._group.options.spiderfyDistanceSurplus,a=this._group.options.elementsMultiplier,c=1,p=r,h=o,u=0;this._createHelpingCircle(t,h);for(var g=1;g<=e;g++){var m=g-u;m>p&&(c+=1,u+=p,m=g-u,p=Math.floor(p*a),h=(l+h)*s,this._createHelpingCircle(t,h)),i[g-1]=n&&1===c?this._regularPolygonVertexPlacement(m-1,Math.min(r,e),t,h):this._regularPolygonVertexPlacement(m-1,p,t,h)}return i},_createHelpingCircle:function(e,t){if(this._group.options.helpingCircles){var n={radius:t};L.extend(n,this._group.options.clockHelpingCircleOptions);var i=new L.CircleMarker(this._group._map.layerPointToLatLng(e),n);this._group._featureGroup.addLayer(i),this._clockHelpingGeometries.push(i)}},_generatePointsConcentricCircles:function(e,t){var n=[],i=this._group.options.firstCircleElements,r=1.5*this._circleFootSeparation,o=this._group.options.spiderfyDistanceMultiplier,s=this._group.options.elementsMultiplier,l=this._group.options.spiderfyDistanceSurplus,a=Math.round(i*s),c=[{distance:r,noElements:0},{distance:(l+r)*o,noElements:0},{distance:(2*l+r)*o*o,noElements:0},{distance:(3*l+r)*o*o*o,noElements:0}];e>i&&(c[1].noElements=a,(i<e&&e<2*i||i+a<e&&e<2*i+a)&&(c[1].noElements=i)),e>i+Math.round(i*s)&&(c[2].noElements=Math.round(i*s)),e>i+2*Math.round(i*s)&&(c[2].noElements=Math.round(i*s*s)),e>i+Math.round(i*s)+Math.round(i*s*s)&&(c[2].noElements=Math.round(i*s)),e>i+2*Math.round(i*s)+Math.round(i*s*s)&&(c[2].noElements=Math.round(i*s*s)),c[0].noElements=Math.min(e-c[1].noElements-c[2].noElements,i),c[3].noElements=Math.max(e-c[0].noElements-c[1].noElements-c[2].noElements,0);for(var p=0,h=c[0],u=1;u<=e;u++)c[1].noElements>0&&(u>c[0].noElements&&(h=c[1],p=c[0].noElements),u>c[0].noElements+c[1].noElements&&c[2].noElements>0&&(h=c[2],p=c[0].noElements+c[1].noElements),u>c[0].noElements+c[1].noElements+c[2].noElements&&c[3].noElements>0&&(h=c[3],p=c[0].noElements-c[1].noElements-c[2].noElements)),n[u-1]=this._regularPolygonVertexPlacement(u-p,h.noElements,t,h.distance);for(var g in c)c[g].noElements&&this._createHelpingCircle(t,c[g].distance);return n},_removeClockHelpingCircles:function(e){for(var t in this._clockHelpingGeometries)e.removeLayer(this._clockHelpingGeometries[t])}}),L.MarkerClusterGroup.include({options:{maxClusterRadius:80,iconCreateFunction:null,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,elementsPlacementStrategy:"clock-concentric",firstCircleElements:10,elementsMultiplier:1.5,spiderfyDistanceSurplus:30,helpingCircles:!0,clockHelpingCircleOptions:{color:"grey",dashArray:5,fillOpacity:0,opacity:.5,weight:3},animate:!1,animateAddingMarkers:!1,spiderfyDistanceMultiplier:1,spiderLegPolylineOptions:{weight:1.5,color:"#222",opacity:.5},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}}}),t[""]=e}({},function(){return this}());