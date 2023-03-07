let scene, batton, parallelogram, coneRev, path;
let balais1, angle, rendu, camera, previousPoint, previousAngle;
let position = 0;
var up = new THREE.Vector3(0, 0, 1);
var axis = new THREE.Vector3();
let coefficient = 1;
let positX, positY;
let scoreEquipe1 = 0;
let scoreEquipe2 = 0;


let origine = new THREE.Vector3(0, 0, 0);
let Pt0 = new THREE.Vector3(1.5, 7.5, 1.9);
let Pt1 = new THREE.Vector3(2.5, 3, 1.9);
let Pt2 = new THREE.Vector3(-1, 2, 1.9);
let Pt3 = new THREE.Vector3(2, 0, 1.9);
let M0 = new THREE.Vector3(Pt3.x, Pt3.y, 1.9);
let M1 = new THREE.Vector3(5.5, -3, 1.9);
let M2 = new THREE.Vector3(-2, -2, 1.9);
let aleatX = Math.floor(Math.random() * (4 + 1 + 1) - 1);
let aleatY = Math.floor(Math.random() * (13 - 9 + 1) + 9);
let M3 = new THREE.Vector3(aleatX, - aleatY, 1.9);
let P2P3 = new THREE.Vector3(0, 0, 1);
let Tg2 = new THREE.Vector3(0, 0, 1);
P2P3.subVectors(Pt3,Pt2);
Tg2.addScaledVector(P2P3, coefficient);
 
let tabP = new Array(4);  
let tabP1 = new Array(4);

for (let i = 0; i < tabP.length; i++){
 tabP[i] = new THREE.Vector3(0,0,0);
}
for (let i = 0; i < tabP1.length; i++){
 tabP1[i] = new THREE.Vector3(0,0,0);
}

tabP[0].copy(Pt0);  
tabP[1].copy(Pt1);
tabP[2].copy(Pt2);
tabP[3].copy(Pt3);
tabP1[0].copy(M0);
tabP1[1].copy(M1);
tabP1[2].copy(M2);
tabP1[3].copy(M3);



function init(){
 var stats = initStats();
    // creation de rendu et de la taille
 rendu = new THREE.WebGLRenderer({ antialias: true });
 rendu.shadowMap.enabled = true;
 scene = new THREE.Scene();   
 camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
 
 rendu.shadowMap.enabled = true;
 rendu.setClearColor(new THREE.Color(0xe3e3e3));
 rendu.setSize(window.innerWidth*.9, window.innerHeight*.835);
 cameraLumiere(scene,camera);
 lumiere(scene);
 //repere(scene);
 let controls = new THREE.OrbitControls( camera , rendu.domElement );
 controls.update();
    //repere(scene)

 //********
 //
 //  P A R T I E     G E O M E T R I Q U E
 //
 //********
 let MaterialPhong = new THREE.MeshPhongMaterial({
  color: "#FFFFFF",
  emissive: "#bebebe",
  opacity: 1,
  transparent: false,
  wireframe: false,
  side: THREE.DoubleSide,
 });
 let planGeometry = new THREE.PlaneGeometry(6, 30, 1, 1);
 let planPhong = new THREE.Mesh(planGeometry, MaterialPhong);
 planPhong.castShadow = true;
 planPhong.receiveShadow = true;
 // ajout des primitives dans la scene
 scene.add( planPhong );
 
 maison(scene, -11);
 maison(scene, 12);

 seg(scene, 30, 0.015, 0x0000ff, 0, 0, -Math.PI / 2)
 seg(scene, 6, 0.015, 0x0000ff, 0, -13.5, 0)
 seg(scene, 6, 0.015, 0x0000ff, 0, -11, 0)
 seg(scene, 6, 0.015, 0x0000ff, 0, 12, 0)
 seg(scene, 6, 0.015, 0x0000ff, 0, 14.5, 0)

 seg(scene, 6, 0.3, 0xff0000, 0, -6.5, 0)
 seg(scene, 6, 0.3, 0xff0000, 0, 7.5, 0)

 balais1 = balais(0.1, 7.5, 1);
 //balais1 = balais(-3, -3, 1);
 scene.add(balais1);

 let curve1 = BezierCurve(Pt0, Pt1, Pt2, Pt3, 100, "#000000", 10);
 scene.add(curve1);
 let curve2 = BezierCurve(M0, M1, M2, M3, 100, "#000000", 10);
 scene.add(curve2);
 
 let pierresEquipe1 = new Array();
 let pierre1 = pierre(0XFF0000, 0XFFFFFF);
 pierre1.position.y = 8.5;
 pierre1.position.x = -1.5;
 pierresEquipe1.push(pierre1);
 scene.add(pierre1);
 let pierre2 = pierre(0XFF0000, 0XFFFFFF);
 scene.add(pierre2);
 pierre2.position.y = 9.5;
 pierre2.position.x = -1;
 pierresEquipe1.push(pierre2);
 let pierre3 = pierre(0XFF0000, 0XFFFFFF);
 scene.add(pierre3);
 pierre3.position.y = 9.5;
 pierre3.position.x = -2;
 pierresEquipe1.push(pierre3);
 let pierre4 = pierre(0XFF0000, 0XFFFFFF);
 scene.add(pierre4);
 pierre4.position.y = 10.5;
 pierre4.position.x = -1;
 pierresEquipe1.push(pierre4);
 let pierre5 = pierre(0XFF0000, 0XFFFFFF);
 scene.add(pierre5);
 pierre5.position.y = 10.5;
 pierre5.position.x = -2;
 pierresEquipe1.push(pierre5);

 //console.log(pierresEquipe1);
 let pierresEquipe2 = new Array();
 let pierre6 = pierre(0X000FF, 0XFFFFFF);
 scene.add(pierre6);
 pierre6.position.y=8.5;
 pierre6.position.x=1.5;
 pierresEquipe2.push(pierre6);
 let pierre7 = pierre(0X000FF, 0XFFFFFF);
 scene.add(pierre7);
 pierre7.position.y=9.5;
 pierre7.position.x=1;
 pierresEquipe2.push(pierre7);
 let pierre8 = pierre(0X000FF, 0XFFFFFF);
 scene.add(pierre8);
 pierre8.position.y=9.5;
 pierre8.position.x=2;
 pierresEquipe2.push(pierre8);
 let pierre9 = pierre(0X000FF, 0XFFFFFF);
 scene.add(pierre9);
 pierre9.position.y=10.5;
 pierre9.position.x=1;
 pierresEquipe2.push(pierre9);
 let pierre10 = pierre(0X000FF, 0XFFFFFF);
 scene.add(pierre10);
 pierre10.position.y=10.5;
 pierre10.position.x=2;
 pierresEquipe2.push(pierre10);
 //fin pierre

  let myCurve1 = new THREE.CubicBezierCurve(Pt0, Pt1, Pt2, Pt3);
  let myCurve2 = new THREE.CubicBezierCurve(M0, M1, M2, M3);
  let pC1 = tracePt(scene, Pt1, "#000000", 0.05, true);
  let pC2 = tracePt(scene, Pt2, "#000000", 0.05, true);
  let pM1 = tracePt(scene, M1, "#000000", 0.05, true);
  let pM2 = tracePt(scene, M2, "#000000", 0.05, true);
  let Cp = new THREE.Vector3(0, 0, 0);
  let Cr = new THREE.Vector3(0, 0, 0);
  let Mp = new THREE.Vector3(0, 0, 0);
  let Mr = new THREE.Vector3(0, 0, 0);
  Cr.addVectors(Cr, Pt2);
  Cp.addVectors(Cp, Pt1);
  Mr.addVectors(Mr, M2);
  Mp.addVectors(Mp, M1);

  let gui=new dat.GUI();
  let menuGUI = new function(){
    this.ptsControle1=0;
    this.ptsControle2=0;
    this.Pierre=0;
    this.ptsControleS=-8.5;
    this.ptsControleSY=-8.5;
    this.ptsControleSX=0;
    this.Lancer = function() {
      reAffichagePierre(pierre1);
    };//fin this.actualisation
  };

//Courbe 1
  let guiptsControle1 = gui.addFolder("Courbe de Bézier 1");
  guiptsControle1.add(menuGUI,"ptsControle1",-4,4).onChange(function(){
    Pt1.copy(origine);
    Cp.setX(menuGUI.ptsControle1);
    Pt1.addVectors(Pt1, Cp);
    
    scene.remove(curve1);
    if(pC1) {
      scene.remove(pC1);
    }
    pC1 = tracePt(scene, Pt1, "#000000",0.05,true);
    curve1 = BezierCurve(Pt0, Pt1, Pt2, Pt3, 100, "#000000", 10);
    scene.add(curve1);
  });

  guiptsControle1.add(menuGUI,"ptsControle2",-4,4).onChange(function(){
    Pt2.copy(origine);
    Cr.setX(menuGUI.ptsControle2);
    Pt2.addVectors(Pt2, Cr);

    scene.remove(curve1);
    if(pC2) scene.remove(pC2);
    pC2=tracePt(scene, Pt2, "#000000",0.05,true);
    //scene.add(pC2);
    curve1 = BezierCurve(Pt0, Pt1, Pt2, Pt3, 100, "#000000", 10);
    scene.add(curve1);
  });


  let guiptsControle2=gui.addFolder("Courbe de Bézier 2");
  guiptsControle2.add(menuGUI,"ptsControle1",-4,4).onChange(function(){
    M1.copy(origine);
    Mp.setX(menuGUI.ptsControle1);
    M1.addVectors(M1,Mp);
    scene.remove(curve2);
    if(pM1) {
      scene.remove(pM1);
    }
    pM1 = tracePt(scene, M1, "#000000",0.05,true);
    scene.add(pM1);
    curve2 = BezierCurve(M0, M1, M2, M3, 100, "#000000", 10);
    scene.add(curve2);
  });

  guiptsControle2.add(menuGUI,"ptsControle2",-4,4).onChange(function(){
    M2.copy(origine);
    Mr.setX(menuGUI.ptsControle2);
    M2.addVectors(M2, Mr);

    scene.remove(curve2);
    if(pM2) {
      scene.remove(pM2);
    }
    pM2 = tracePt(scene, M2, "#000000", 0.05, true);
    scene.add(pM2);
    curve2 = BezierCurve(M0, M1, M2, M3, 100, "#000000", 10);
    scene.add(curve2);
  });

  let guiptsControle3=gui.addFolder("Sommets");
  guiptsControle3.add(menuGUI,"ptsControleSY",-14,0).onChange(function(){
    M3.setY(menuGUI.ptsControleSY);


    scene.remove(curve2);
    scene.remove(M3);

    
    curve2=BezierCurve(M0, M1, M2, M3,100, "#000000",10);
    scene.add(curve2);

  });
  guiptsControle3.add(menuGUI,"ptsControleSX",-4,4).onChange(function(){
    
    M3.setX(menuGUI.ptsControleSX);
    scene.remove(curve2);
    scene.remove(M3);
    curve2=BezierCurve(M0, M1, M2, M3,100,"#000000",10);
    scene.add(curve2);

  });
  

  
  /*
  let guiptsControle4 = gui.addFolder("Lancer");
  guiptsControle4.add(menuGUI, "Pierre",-4,4).onChange(function(){
    menuGUI.Lancer(); 
  });
  */
  
  //gui.add(menuGUI, "Lancer");
  //gui.add(menuGUI, "actualisation");


 renduAnim();
 
 
 document.getElementById("webgl").appendChild(rendu.domElement);
 rendu.render(scene, camera);
  
 
 function reAffichage(posX, posY) {
  setTimeout(function () {

    if(balais1) {
      scene.remove(balais1);
      balais1 = new balais(posX, posY, 1);
      scene.add(balais1);
    }
  }, 2);
  rendu.render(scene, camera);
 }


 let pos = 0;
 let pos1 = 0;

 function reAffichagePierre(Pierre) {
  setTimeout(function () {
    let pts1 = myCurve1.getPoints(15);
    let pts2 = myCurve2.getPoints(15);
      if(pos < 11){
        if(Pierre) {
          scene.remove(Pierre);
        }
        Pierre.position.set(pts1[pos].x - 1.5, pts1[pos].y, 0.2);
        pos++;
        scene.add(Pierre);
        reAffichagePierre(Pierre);}
        else if(pos1 < 16) {
          if(Pierre){
            scene.remove(Pierre);
          }
          Pierre.position.set(pts2[pos1].x - 1.5, pts2[pos1].y, 0.2);
          pos1++;
          scene.add(Pierre);
          reAffichagePierre(Pierre);
        };
  }, 200);
  rendu.render(scene, camera);
 }
 
 let i = 0;
 let j = 0;

  positX = 0.5;
  positY = 6.5;
  //document.getElementById("ScoreEquipe1").innerHTML = "";
  //document.getElementById("ScoreEquipe2").innerHTML = "";

  window.addEventListener('keydown', (event) => {
    if(event.key == 'n') {
      if(pos=401){
        pos=0;
      }
      if(pos1=401){
        pos1=0;
      }
      reAffichagePierre(pierresEquipe1[i]);
      //let positionXFinalePierre = pierresEquipe1[i].position.x;
      //let positionYFinalePierre = pierresEquipe1[i].position.y;
      //scoreEquipe1 = 1;
      //document.getElementById("ScoreEquipe1").innerHTML = scoreEquipe1;
      i++;
    }
    if(event.key == 'v') {
      if(pos=401){
        pos=0;
      }
      if(pos1=401){
        pos1=0;
      }
      reAffichagePierre(pierresEquipe2[j]);
      j++; 
    }
    //animation balais
    if(event.key == 'b') {
      reAffichage(positX, positY);
      if(positX === 0.5) {
        positX = -0.5;
      } else if(positX === -0.5) {
        positX = 0.5;
      }
      if(positY != -6) {
        positY -= 0.5;
      } else if(positY === -6) {
        reAffichage(0.1, 7.5);
        positX = 0.5;
        positY = 6.5;
      }
    }
  })
 
  function renduAnim() {
    stats.update();
    // render avec requestAnimationFrame
    requestAnimationFrame(renduAnim);
    controls.update();
// ajoute le rendu dans l'element HTML
    rendu.render(scene, camera);
  }
 
} // fin fonction init()

function maison(scene, posY) {
  let cercle1 = new THREE.CircleGeometry( 2.5, 128 );
  let material1 = new THREE.MeshPhongMaterial( { 
    color : 0x0004ff,
    emissive: "#000000",
    opacity: 1,
  } );
  let circle1 = new THREE.Mesh( cercle1, material1 );
  circle1.position.z = 0.014;
  circle1.position.y = posY;
  scene.add( circle1 );
  
  let cercle2 = new THREE.CircleGeometry( 1.75, 128 );
  let material2 = new THREE.MeshPhongMaterial( { 
    color: 0xffffff,
    emissive: "#000000",
    opacity: 1,
  } );
  let circle2 = new THREE.Mesh( cercle2, material2 );
  circle2.position.z = 0.015;
  circle2.position.y = posY;
  scene.add( circle2 );
  
  let cercle3 = new THREE.CircleGeometry( 1, 128 );
  let material3 = new THREE.MeshPhongMaterial( { 
    color: 0xff0000,
    emissive: "#000000",
    opacity: 1,
  } );
  let circle3 = new THREE.Mesh( cercle3, material3 );
  circle3.position.z = 0.016;
  circle3.position.y = posY;
  scene.add( circle3 );

  let cercle4 = new THREE.CircleGeometry( 0.40, 128 );
  let material4 = new THREE.MeshPhongMaterial( { 
    color: 0xffffff,
    emissive: "#000000",
    opacity: 1,
  } );
  let circle4 = new THREE.Mesh( cercle4, material4 );
  circle4.position.z = 0.017;
  circle4.position.y = posY;
  scene.add( circle4 );
}

function balais(positX, positY, positZ) {
  let groupe = new THREE.Group();
  let cylindre = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 25, 1, false, 0,  6.3);
  let materialPhong3 = new THREE.MeshPhongMaterial( {
    color: 0x000000,
    opacity: 1,
    transparent: false,
    wireframe: false,
  } );
  batton = new THREE.Mesh( cylindre, materialPhong3 );
  batton.rotation.x = Math.PI / 2;
  batton.position.x = positX;
  batton.position.y = positY;
  batton.position.z = positZ;
  groupe.add( batton );
  //scene.add( batton );

  let box1 = new THREE.BoxGeometry( .2, .5, .2 );
  let materialPhong4 = new THREE.MeshPhongMaterial( {
    color: 0x000000,
    opacity: 1,
    transparent: false,
    wireframe: false,
    side: THREE.DoubleSide,
   } );
  parallelogram = new THREE.Mesh( box1, materialPhong4 );
  parallelogram.position.y = positY;
  parallelogram.position.x = positX;
  parallelogram.position.z = positZ - 0.7;
  groupe.add( parallelogram );
  //scene.add( parallelogram );

  for(i = 0; i <= 14; i++) {
    for(j = 0; j <= 6; j++) {
      //posX = (positX - 0.005) - (j * Math.pow(10, -1.5));
      //posY = (positY - 0.22) + (i * Math.pow(10, -1.5));
      posX = (positX + 0.09) - (j * Math.pow(10, -1.5));
      posY = (positY - 0.235) + (i * Math.pow(10, -1.5));
      let cone1 = new THREE.CylinderGeometry( 0.009, 0, 0.3, 25, 1, false, 0,  6.3 );
      let materialPhong5 = new THREE.MeshPhongMaterial( {
        color: 0x000000,
        opacity: 1,
        transparent: false,
        wireframe: false,
        side: THREE.DoubleSide,
      } );
      coneRev = new THREE.Mesh( cone1, materialPhong5 );
      coneRev.rotation.x = - Math.PI / 2;
      coneRev.position.x = posX;
      coneRev.position.y = posY;
      coneRev.position.z = 0.2;
      groupe.add( coneRev );
      //scene.add(coneRev);
    }
  }
  return groupe;
}


function seg(scene, length, width, coulHexa, posX, posY, rotZ) {
  let geometry = new THREE.PlaneGeometry( length, width );
  let material = new THREE.MeshPhongMaterial( {
    color: coulHexa, 
    side: THREE.DoubleSide} );
  let plane = new THREE.Mesh( geometry, material );
  plane.rotation.z = rotZ;
  plane.position.x = posX;
  plane.position.y = posY;
  plane.position.z = 0.02;
  scene.add( plane );
}

function BezierCurve(P0, P1, P2, P3, nbrePts, couleur, epai){
  let courbeBezier = new THREE.CubicBezierCurve3(P0, P1, P2, P3);
  let courbeGeometry = new THREE.Geometry();
  courbeGeometry.vertices = courbeBezier.getPoints(nbrePts);
  let material = new THREE.LineBasicMaterial(
    { color : couleur,
      linewidth: epai  
    } );
  let Bezier = new THREE.Line( courbeGeometry, material );
  Bezier.position.z = -1.9;
  Bezier.position.x = -1.5;
  
  return Bezier;
}  // fin fonction THREE.CubicBezierCurve



function pierre(CoulHexa1, CoulHexa2) {
  let coef = 1;
  let P0 = new THREE.Vector3(0, 0.141, 0);
  let P1 = new THREE.Vector3(0.16, 0.141, 0);
  let P2 = new THREE.Vector3(0.33, 0.2005, 0);
  let P3 = new THREE.Vector3(0.33, 0.0730, 0);
  let M0 = new THREE.Vector3(P3.x, P3.y, 0);
  let M1 = new THREE.Vector3(0, 0, 0);
  let M2 = new THREE.Vector3(0.33, 0.1389, 0);
  let M3 = new THREE.Vector3(0.33, 0.0200, 0);
  let I0 = new THREE.Vector3(M3.x, M3.y, 0);
  let I1 = new THREE.Vector3(0, 0, 0);
  let I2 = new THREE.Vector3(0, -0.1, 0);
  let I3 = new THREE.Vector3(0, -0.125, 0);
  let vP2P3 = new THREE.Vector3(0, 0, 0);
  let vTan2 = new THREE.Vector3(0, 0, 0);

  vP2P3.subVectors(P3, P2);//P3-P2
  vTan2.addScaledVector(vP2P3, coef);
  M1.addVectors(M0, vTan2);

  vP2P3.subVectors(M3, M2);//M3-M2
  vTan2.addScaledVector(vP2P3, coef);
  I1.addVectors(I0, vTan2);

  let nb = 100;//nmbre de pts par courbe
  let epai = 4;//epaisseur de la courbe
  let nbPtCB = 50;//nombre de points sur la courbe de Bezier
  let nbePtRot = 150;// nbe de points sur les cercles

  let lathe1 = latheBez3(nbPtCB, nbePtRot, P0, P1, P2, P3, CoulHexa1, 0.95, false);
  let lathe2 = latheBez3(nbPtCB, nbePtRot, M0, M1, M2, M3, CoulHexa2, 0.95, false);
  let lathe3 = latheBez3(nbPtCB, nbePtRot, I0, I1, I2, I3, CoulHexa1, 0.95, false);


  var pierre = new THREE.Object3D();
  pierre.add(lathe1, lathe2, lathe3)

  pierre.rotateX(Math.PI / 2);
  pierre.position.z = 0.125;

  return pierre;
  }

 function pierres(coul, posX, posY) {
  const latheGroupe = new THREE.Group();
  let latheGeometry;
  let lathe1;
  let lathe2;

  let scale = .05;
  let p1 = new THREE.Vector3(1.5 * scale, 3 * scale, 0);
  let p2 = new THREE.Vector3(6 * scale, 3 * scale, 0);
  let p3 = new THREE.Vector3(6 * scale, 1 * scale, 0);
  let p4 = new THREE.Vector3(6 * scale, 0 * scale, 0);

  let q1 = new THREE.Vector3(p4.x, p4.y, 0);
  let q2 = new THREE.Vector3(6 * scale, -2 * scale, 0);
  let q3 = new THREE.Vector3(6 * scale, -3 * scale, 0);
  let q4 = new THREE.Vector3(0 * scale, -3 * scale, 0);
  let courbe = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
  let pts = courbe.getPoints(50);
  let geometry = new THREE.BufferGeometry().setFromPoints(pts);
  let material = new THREE.LineBasicMaterial({
      color: 0xff0000
  });
  curveBezier1 = new THREE.Line(geometry, material);
  pts = courbe.getPoints(100);
  latheGeometry = new THREE.LatheGeometry(pts, 150, 0, 2 * Math.PI);
  let materialPhong = new THREE.MeshPhongMaterial({
      color: coul,
      side: THREE.DoubleSide,
  });
  lathe1 = new THREE.Mesh(latheGeometry, materialPhong);
  latheGroupe.add(lathe1);

  courbe = new THREE.CubicBezierCurve3(q1, q2, q3, q4);
  pts = courbe.getPoints(50);
  geometry = new THREE.BufferGeometry().setFromPoints(pts);
  material = new THREE.LineBasicMaterial({
      color: "#000066"
  });
  curvaBezier2 = new THREE.Line(geometry, material);
  pts = courbe.getPoints(100);
  latheGeometry = new THREE.LatheGeometry(pts, 150, 0, 2 * Math.PI);
  materialPhong  = new THREE.MeshPhongMaterial({
      color: "#000000",
      side: THREE.DoubleSide,
  });
  lathe2 = new THREE.Mesh(latheGeometry, materialPhong);
  latheGroupe.add(lathe2);

  latheGroupe.rotation.x = Math.PI / 2;
  latheGroupe.position.x = posX;
  latheGroupe.position.y = posY;
  latheGroupe.position.z = 0.2;
  latheGroupe.rotation.y = -Math.PI / 2;
  return latheGroupe;
}

function latheBez3(nbePtCbe, nbePtRot, P0, P1, P2, P3, coul, opacite, bolTranspa) {
  //let geometry = new THREE.Geometry();
  let p0 = new THREE.Vector2(P0.x, P0.y);
  let p1 = new THREE.Vector2(P1.x, P1.y);
  let p2 = new THREE.Vector2(P2.x, P2.y);
  let p3 = new THREE.Vector2(P3.x, P3.y);
  let Cbe3 = new THREE.CubicBezierCurve(p0, p1, p2, p3);
  let points = Cbe3.getPoints(nbePtCbe);
  let latheGeometry = new THREE.LatheGeometry(points, nbePtRot, 0, 2 * Math.PI);
  let lathe = surfPhong(latheGeometry, coul, opacite, bolTranspa, "#223322");
  return lathe;
  }

  function surfPhong(geom,coulD,transpa,bolTrans,coulSpe){ 
    let Material = new THREE.MeshPhongMaterial({
      color: coulD,
      opacity: transpa,
      transparent: bolTrans,
      //     wireframe: false,
      specular:coulSpe, 
      flatShading: true,
      side: THREE.DoubleSide,
    });
    let maillage = new THREE.Mesh(geom,Material);
    return maillage;
   }//fin fonction surfPhong

function tracePt(MaScene, P, CoulHexa, dimPt, bol){    
  let sphereGeometry = new THREE.SphereGeometry(dimPt,12,24);
  let  sphereMaterial = new THREE.MeshBasicMaterial({
    color: CoulHexa 
  });
  let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(P.x, P.y, P.z);
  if (bol) {
    MaScene.add(sphere);
  }
  return sphere;
}



/*

function drawPath() {
  var vertices = path.getSpacedPoints(10);

  // Change 2D points to 3D points
  for (var i = 0; i < vertices.length; i++) {
    point = vertices[i]
    vertices[i] = new THREE.Vector3(point.x, point.y, 0);
  }
  var lineGeometry = new THREE.BufferGeometry().setFromPoints( vertices );
  var lineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000
  });
  var line = new THREE.Line(lineGeometry, lineMaterial)
  scene.add(line);
}
function drawPath() {
  let curve1 = BezierCurve(1, 50, "#000000", 1);
  let curve2 = BezierCurve(2, 50, "#000000", 1);
  scene.add(curve1);
  scene.add(curve2);
}


function BezierCurve(choix, nbrePts, couleur, epai){
  let courbeBezier;
  if(choix == 1) {
    courbeBezier = new THREE.CubicicBezierCurve3(Pt0, Pt1, Pt2, Pt3);
  } else {
    courbeBezier = new THREE.CubicicBezierCurve3(M0, M1, M2, M3);
  }

  let courbeGeometry = new THREE.Geometry();
  courbeGeometry.vertices = courbeBezier.getPoints(nbrePts);
  let material = new THREE.LineBasicMaterial(
    { color : couleur,
      linewidth: epai  
    } );
  let Bezier = new THREE.Line( courbeGeometry, material );
  Bezier.position.z = -1.9;
  Bezier.position.x = -1.5;
  
  return Bezier;
}  // fin fonction THREE.CubicBezierCurve
 */


/*
 aleat = Math.floor(Math.random() * (3 - 1 + 1) + 1);
 //aleat = 1;
 //aleat = 2;
 if(aleat == 1) {
   path = new THREE.Path([
     Pt0rec, 
     Pt1rec,
     Pt3rec
    ]);
   drawPath(1, 100);
   drawPath(2, 100);
   previousPoint = path.getPointAt( position );
 } else if(aleat == 2) {
  path = new THREE.Path([
    orig = new THREE.Vector3(-0.5, 7.5, 2),
    Pt0v, 
    Pt1v = new THREE.Vector3(0, 3, 2),
    Pt3v
  ]);
  drawPath(3, 100);
  previousPoint = path.getPointAt( position );
 } else if(aleat == 3) {
  path = new THREE.Path([
    Pt0, 
    Pt1 = new THREE.Vector3(-0.2, 3, 2),
    Pt3, 
    M0, 
    M1 = new THREE.Vector3(-0.15, -3, 2), 
    M3
   ]);
 }


 function move(mesh) {
  
  position += 0.009;

  // get the point at position
  let point = path.getPointAt(position);
  mesh.position.x = point.x;
  mesh.position.y = point.y;
  //mesh.rotation.x = - Math.PI / 2;
  
  // set the quaternion

  previousPoint = point;
  
}

function render() {
  rendu.render(scene, camera);
}
  
  // animate
function animate() {
  move(pierre1);
  requestAnimationFrame(animate);
  render();
}

let Pt0v = new THREE.Vector3(0, 5.5, 2);
let Pt1v = new THREE.Vector3(-1, 3, 2);
let Pt2v = new THREE.Vector3(-0.5, 2, 2);
let Pt3v = new THREE.Vector3(-1, -12, 2);


let Pt0rec = new THREE.Vector3(0, 7.5, 2);
let Pt1rec= new THREE.Vector3(0, 0, 2);
let Pt2rec = new THREE.Vector3(0, -10, 2);

let P0 = new THREE.Vector3(0, 1.7, 0);
let P1 = new THREE.Vector3(0.5, 2, 0);
let P2 = new THREE.Vector3(0.5, 1, 0);
let P3 = new THREE.Vector3(0, 1.2,0);

let ptBez1 = new THREE.Vector2(0, 7, 2);
let ptBez2 = new THREE.Vector2(0, 3, 2);
*/