/* Original mathematical assembly. No textures, images or model files. */
(() => {
  'use strict';
  const COUNT=144,TAU=Math.PI*2;
  const common=`
  precision highp float;
  uniform vec2 uResolution,uCenter,uTurn,uPointer;
  uniform vec4 uWeights;
  uniform float uLab,uOrder,uTime,uScale,uDpr,uUnfold,uHold,uDrive,uPulse,uOpacity;
  const float TAU=6.28318530718;
  mat3 rotX(float a){return mat3(1.,0.,0.,0.,cos(a),sin(a),0.,-sin(a),cos(a));}
  mat3 rotY(float a){return mat3(cos(a),0.,-sin(a),0.,1.,0.,sin(a),0.,cos(a));}
  mat3 rotZ(float a){return mat3(cos(a),sin(a),0.,-sin(a),cos(a),0.,0.,0.,1.);}
  vec3 knot(float a){float r=2.+.62*cos(3.*a);return vec3(r*cos(2.*a),r*sin(2.*a),.85*sin(3.*a))*.52;}
  vec3 lattice(float id){return vec3(mod(id,6.)-2.5,mod(floor(id/6.),6.)-2.5,floor(id/36.)-1.5)*.44;}
  vec3 field(float id){vec2 p=vec2(mod(id,12.)-5.5,floor(id/12.)-5.5)*.235;return vec3(p,.22*sin(p.x*2.5+uTime*.9)*cos(p.y*2.1-uTime*.6));}
  vec3 petal(float id){float a=id*2.39996323,r=.16+sqrt(id/144.)*1.21;return vec3(cos(a)*r,sin(a)*r,.42*sin(a*2.+uTime*.35)+(id/144.-.5)*.65);}
  vec4 weights(){float a=smoothstep(0.,.55,uOrder),b=smoothstep(.55,1.,uOrder);return uWeights+uLab*vec4(1.-a,a*(1.-b),b,0.);}
  vec3 center(float id,vec4 w){float a=id/144.*TAU;return knot(a)*w.x+lattice(id)*w.y+field(id)*w.z+petal(id)*w.w;}
  mat3 view(){return rotZ(.13*sin(uTime*.23)+uDrive*.10)*rotY(uTurn.x-.45)*rotX(uTurn.y-.32);}
  vec4 project(vec3 p){float s=5.8/(5.8+p.z);vec2 q=uCenter+vec2(p.x,-p.y)*uScale*s;return vec4(q.x/uResolution.x*2.-1.,1.-q.y/uResolution.y*2.,p.z/7.,1.);}
  `;
  const meshVertex=common+`
  attribute vec3 aPosition,aNormal;
  attribute float aId;
  uniform float uPass;
  varying vec3 vNormal;
  varying float vBlue;
  void main(){
    vec4 w=weights();float id=aId,a=id/144.*TAU;
    vec3 c=center(id,w),t=normalize(knot(a+.003)-knot(a-.003));
    vec3 n=normalize(cross(t,normalize(knot(a)))),b=normalize(cross(t,n));
    mat3 K=mat3(t,n,b),L=rotZ(.12*sin(uTime*.7+id*.14)),F=rotX(.13*cos(id*.23+uTime*.6));
    mat3 P=rotZ(id*2.39996323)*rotY(.38*sin(id*.27+uTime*.5));
    vec3 size=vec3(.028,.29,.075)*w.x+vec3(.135)*w.y+vec3(.094,.094,.032)*w.z+vec3(.12,.24,.024)*w.w;
    float breath=.5+.5*sin(a*6.-uTime*1.2),separate=uUnfold+uHold*.38;
    float wave=exp(-pow(length(c)-uPulse*2.8,2.)*10.)*step(uPulse,2.5);
    c*=1.+separate*.6+wave*.20+abs(uDrive)*.08;
    c.z+=separate*.15*sin(id*.4)+wave*.18*sin(a*4.);
    vec3 local=aPosition*size*(1.+.12*breath*w.x);
    local=K*local*w.x+L*local*w.y+F*local*w.z+P*local*w.w;
    mat3 V=view();vec3 p=V*(c+local);
    float reach=exp(-dot(p.xy-uPointer,p.xy-uPointer)*2.8);
    p.xy+=normalize(p.xy-uPointer+vec2(.0001))*reach*.22;p.z-=reach*.30;
    vNormal=normalize(V*(K*aNormal*w.x+L*aNormal*w.y+F*aNormal*w.z+P*aNormal*w.w));
    float marker=1.-step(1.4,mod(id,19.));
    float scan=1.-smoothstep(.15,.42,abs(mod(id,12.)/11.-(.5+.5*sin(uTime*.65))));
    vBlue=max(marker,scan*w.z*.90);
    gl_Position=project(p);if(uPass>.5)gl_Position.z-=.001;
  }`;
  const meshFragment=`
  precision highp float;
  uniform float uPass,uOpacity;
  varying vec3 vNormal;
  varying float vBlue;
  void main(){
    float light=clamp(dot(normalize(vNormal),normalize(vec3(-.55,.85,-1.))),0.,1.);
    vec3 paper=vec3(.91,.914,.894),ink=vec3(.12,.15,.16),blue=vec3(.157,.333,1.);
    vec3 color=mix(ink,paper,.24+.76*light);
    color=mix(color,blue*(.55+.45*light),vBlue*.95);
    if(uPass>.5)color=mix(ink,blue,vBlue*.75);
    gl_FragColor=vec4(color,uOpacity*(uPass>.5?.55:1.));
  }`;
  const flowVertex=common+`
  attribute vec2 aFlow;
  uniform float uPass;
  varying float vAlpha,vBlue;
  void main(){
    float lane=aFlow.y,a=aFlow.x*TAU;
    if(uPass>1.5)a+=uTime*(.19+lane*.013);
    float r=1.65+mod(lane,3.)*.085+uUnfold*.24;
    vec3 p=vec3(cos(a)*r,sin(a)*r,0.);
    p=rotX(floor(lane/3.)*1.03+.4)*rotY(floor(lane/3.)*.85+uTime*.06)*p;
    vec3 cube=vec3(cos(a),sin(a),sin(a*2.)*.25)*1.57;
    float phase=uPass>1.5?fract(aFlow.x+uTime*(.03+lane*.001)):aFlow.x;
    vec3 grid=vec3((phase-.5)*3.25,(lane/11.-.5)*2.65,.30*sin(phase*7.+uTime*.9));
    vec4 w=weights();p=p*(w.x+w.w)+cube*w.y+grid*w.z;
    p*=1.+uHold*.08;p=view()*p;
    gl_Position=project(p);gl_PointSize=(2.2+mod(lane,3.)*.65)*uDpr;
    vAlpha=uPass>1.5?.9:.16;vBlue=uPass>1.5?1.:step(9.,lane)*.8;
  }`;
  const flowFragment=`
  precision highp float;
  uniform float uPass,uOpacity;
  varying float vAlpha,vBlue;
  void main(){if(uPass>1.5&&length(gl_PointCoord-vec2(.5))>.5)discard;
  gl_FragColor=vec4(mix(vec3(.13,.17,.19),vec3(.157,.333,1.),vBlue),vAlpha*uOpacity);}`;

  class FieldRenderer {
    constructor(canvas){
      this.canvas=canvas;this.mobile=matchMedia('(max-width:760px), (pointer:coarse)').matches;this.ready=false;this.backend='canvas';this.makeGeometry();
      try{
        this.gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false,powerPreference:'low-power'});
        if(!this.gl)throw Error('WebGL unavailable');this.initGL();this.backend='webgl';
      }catch(error){
        this.error=String(error);console.warn('Using Canvas fallback:',this.error);
        const replacement=canvas.cloneNode(false);canvas.replaceWith(replacement);this.canvas=replacement;this.gl=null;this.context=replacement.getContext('2d');
      }
      this.ready=!!(this.gl||this.context);this.canvas.dataset.renderer=this.backend;
      if(this.gl){
        this.canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();this.ready=false;document.documentElement.classList.remove('rendered');});
        this.canvas.addEventListener('webglcontextrestored',()=>{this.initGL();this.ready=true;document.documentElement.classList.add('rendered');this.onWake?.();});
      }
      this.resize();
    }
    makeGeometry(){
      const corners=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
      this.faces=[[0,3,2,1],[4,5,6,7],[0,1,5,4],[3,7,6,2],[0,4,7,3],[1,2,6,5]];
      const normals=[[0,0,-1],[0,0,1],[0,-1,0],[0,1,0],[-1,0,0],[1,0,0]],edges=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
      this.corners=corners;const solids=[],wires=[];
      for(let id=0;id<COUNT;id++){
        this.faces.forEach((face,i)=>[0,1,2,0,2,3].forEach(n=>solids.push(...corners[face[n]],...normals[i],id)));
        edges.forEach(edge=>edge.forEach(n=>wires.push(...corners[n],0,0,1,id)));
      }
      this.meshData=new Float32Array([...solids,...wires]);this.solidCount=solids.length/7;this.wireCount=wires.length/7;
      const tracks=[],signals=[],segments=this.mobile?80:128;
      for(let lane=0;lane<12;lane++){
        for(let j=0;j<segments;j++)tracks.push(j/segments,lane,(j+1)/segments,lane);
        for(let j=0;j<9;j++)signals.push(j/9,lane);
      }
      this.flowData=new Float32Array([...tracks,...signals]);this.trackCount=tracks.length/2;this.signalCount=signals.length/2;
    }
    program(vertex,fragment,names){
      const gl=this.gl,program=gl.createProgram();
      [gl.VERTEX_SHADER,gl.FRAGMENT_SHADER].forEach((kind,i)=>{
        const shader=gl.createShader(kind);gl.shaderSource(shader,i?fragment:vertex);gl.compileShader(shader);
        if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));gl.attachShader(program,shader);gl.deleteShader(shader);
      });
      gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
      const uniforms={};names.forEach(n=>uniforms[n]=gl.getUniformLocation(program,'u'+n));return {program,uniforms};
    }
    initGL(){
      const gl=this.gl,names=['Resolution','Center','Turn','Pointer','Weights','Lab','Order','Time','Scale','Dpr','Unfold','Hold','Drive','Pulse','Opacity','Pass'];
      this.mesh=this.program(meshVertex,meshFragment,names);this.flow=this.program(flowVertex,flowFragment,names);
      this.mesh.buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.mesh.buffer);gl.bufferData(gl.ARRAY_BUFFER,this.meshData,gl.STATIC_DRAW);
      this.flow.buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.flow.buffer);gl.bufferData(gl.ARRAY_BUFFER,this.flowData,gl.STATIC_DRAW);
      gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.clearColor(0,0,0,0);
    }
    resize(){
      this.width=innerWidth;this.height=innerHeight;this.dpr=Math.min(devicePixelRatio||1,this.mobile?1.4:1.75);
      this.canvas.width=Math.round(this.width*this.dpr);this.canvas.height=Math.round(this.height*this.dpr);this.gl?.viewport(0,0,this.canvas.width,this.canvas.height);
    }
    bind(material,p){
      const g=this.gl,u=material.uniforms;g.useProgram(material.program);g.bindBuffer(g.ARRAY_BUFFER,material.buffer);
      g.uniform2f(u.Resolution,this.width,this.height);g.uniform2f(u.Center,p.x,p.y);g.uniform2f(u.Turn,p.turnX,p.turnY);g.uniform2f(u.Pointer,p.pointerX,p.pointerY);
      g.uniform4f(u.Weights,...p.weights.slice(0,4));g.uniform1f(u.Lab,p.weights[4]);
      ['Order','Time','Scale','Dpr','Unfold','Hold','Drive','Pulse','Opacity'].forEach(n=>g.uniform1f(u[n],n==='Dpr'?this.dpr:p[n[0].toLowerCase()+n.slice(1)]));
      for(let i=0;i<4;i++)g.disableVertexAttribArray(i);
    }
    attribute(material,name,size,stride,offset){
      const g=this.gl,n=g.getAttribLocation(material.program,name);if(n<0)return;g.enableVertexAttribArray(n);g.vertexAttribPointer(n,size,g.FLOAT,false,stride,offset);
    }
    render(p){
      if(!this.ready)return;if(!this.gl){this.renderCanvas(p);return;}
      const g=this.gl;g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);
      this.bind(this.mesh,p);this.attribute(this.mesh,'aPosition',3,28,0);this.attribute(this.mesh,'aNormal',3,28,12);this.attribute(this.mesh,'aId',1,28,24);
      g.uniform1f(this.mesh.uniforms.Pass,0);g.drawArrays(g.TRIANGLES,0,this.solidCount);
      g.depthMask(false);g.uniform1f(this.mesh.uniforms.Pass,1);g.drawArrays(g.LINES,this.solidCount,this.wireCount);
      this.bind(this.flow,p);this.attribute(this.flow,'aFlow',2,8,0);
      g.uniform1f(this.flow.uniforms.Pass,1);g.drawArrays(g.LINES,0,this.trackCount);
      g.uniform1f(this.flow.uniforms.Pass,2);g.drawArrays(g.POINTS,this.trackCount,this.signalCount);g.depthMask(true);
    }
    // Reduced-cost fallback: same layouts and faceted cells, sorted by depth.
    renderCanvas(p){
      const ctx=this.context;ctx.setTransform(this.dpr,0,0,this.dpr,0,0);ctx.clearRect(0,0,this.width,this.height);
      const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
      const a=smooth(0,.55,p.order),b=smooth(.55,1,p.order),w=p.weights.slice(0,4);w[0]+=p.weights[4]*(1-a);w[1]+=p.weights[4]*a*(1-b);w[2]+=p.weights[4]*b;
      const knot=t=>{const r=2+.62*Math.cos(3*t);return [r*Math.cos(2*t)*.52,r*Math.sin(2*t)*.52,.85*Math.sin(3*t)*.52];};
      const norm=v=>{const n=Math.hypot(...v)||1;return v.map(x=>x/n);},cross=(x,y)=>[x[1]*y[2]-x[2]*y[1],x[2]*y[0]-x[0]*y[2],x[0]*y[1]-x[1]*y[0]];
      const rotate=(v,x,y,z)=>{const Y=v[1]*Math.cos(x)-v[2]*Math.sin(x),Z=v[1]*Math.sin(x)+v[2]*Math.cos(x),X=v[0]*Math.cos(y)+Z*Math.sin(y),z2=-v[0]*Math.sin(y)+Z*Math.cos(y);return [X*Math.cos(z)-Y*Math.sin(z),X*Math.sin(z)+Y*Math.cos(z),z2];};
      const project=v=>{const s=p.scale*5.8/(5.8+v[2]);return [p.x+v[0]*s,p.y-v[1]*s];},polygons=[];
      for(let id=0;id<COUNT;id++){
        const t=id/COUNT*TAU,k=knot(t),before=knot(t-.003),after=knot(t+.003),tangent=norm(after.map((v,i)=>v-before[i])),n=norm(cross(tangent,norm(k))),bi=norm(cross(tangent,n));
        const lattice=[id%6-2.5,Math.floor(id/6)%6-2.5,Math.floor(id/36)-1.5].map(v=>v*.44),x=(id%12-5.5)*.235,y=(Math.floor(id/12)-5.5)*.235;
        const field=[x,y,.22*Math.sin(x*2.5+p.time*.9)*Math.cos(y*2.1-p.time*.6)],angle=id*2.39996323,r=.16+Math.sqrt(id/144)*1.21,petal=[Math.cos(angle)*r,Math.sin(angle)*r,.42*Math.sin(angle*2+p.time*.35)+(id/144-.5)*.65];
        const c=k.map((v,i)=>v*w[0]+lattice[i]*w[1]+field[i]*w[2]+petal[i]*w[3]),wave=Math.exp(-((Math.hypot(...c)-p.pulse*2.8)**2)*10)*(p.pulse<=2.5?1:0),separate=p.unfold+p.hold*.38;
        const size=[.028*w[0]+.135*w[1]+.094*w[2]+.12*w[3],.29*w[0]+.135*w[1]+.094*w[2]+.24*w[3],.075*w[0]+.135*w[1]+.032*w[2]+.024*w[3]];
        const vertices=this.corners.map(corner=>{
          const q=corner.map((v,i)=>v*size[i]),K=q.map((_,i)=>tangent[i]*q[0]+n[i]*q[1]+bi[i]*q[2]),L=rotate(q,0,0,.12*Math.sin(p.time*.7+id*.14)),F=rotate(q,.13*Math.cos(id*.23+p.time*.6),0,0),P=rotate(q,0,.38*Math.sin(id*.27+p.time*.5),angle);
          const v=c.map((v,i)=>v*(1+separate*.6+wave*.2+Math.abs(p.drive)*.08)+K[i]*w[0]+L[i]*w[1]+F[i]*w[2]+P[i]*w[3]);return rotate(v,p.turnY-.32,p.turnX-.45,.13*Math.sin(p.time*.23)+p.drive*.1);
        });
        this.faces.forEach((face,i)=>polygons.push({points:face.map(j=>project(vertices[j])),depth:face.reduce((s,j)=>s+vertices[j][2],0)/4,blue:id%19<2,shade:i}));
      }
      polygons.sort((a,b)=>b.depth-a.depth);ctx.globalAlpha=p.opacity;ctx.lineWidth=.55;
      polygons.forEach(face=>{const shades=['#4b5458','#e2e4df','#b9bfbe','#d6dad5','#777f81','#c9ceca'];ctx.fillStyle=face.blue?'#2855ff':shades[face.shade];ctx.strokeStyle=face.blue?'#1735a8':'#4b555b';ctx.beginPath();face.points.forEach((v,i)=>i?ctx.lineTo(...v):ctx.moveTo(...v));ctx.closePath();ctx.fill();ctx.stroke();});ctx.globalAlpha=1;
    }
  }
  window.FieldRenderer=FieldRenderer;
})();
