

const game =document.getElementById("game1");     // alt + shift + pfeil nach unten      dupliziert zeile
const game2 =document.getElementById("game2");     // alt + shift + pfeil nach unten      dupliziert zeile
console.log(`die spiel höhe ist ${game.offsetHeight}`);
console.log(`die spiel höhe ist ${game.offsetWidth}`);
const eis_pw =document.querySelector("#special-button .overlay");
let Eispower = 0


class figur{
  

   constructor(position,id){
      this.html = document.getElementById(id);
      this.id = id;
      this.position=[position[0],position[1]];
      this.html.style.top= position[0] +"px";
      this.html.style.left= position[1] + "px";
      this.html.style.width = game.offsetWidth/20 +"px";
      this.html.style.height = this.html.style.width;
      this.max_left = game.offsetWidth - document.getElementById(id).offsetWidth -30;
      this.max_top = game.offsetHeight - document.getElementById(id).offsetHeight -30;
      this.tim_speed = game.offsetHeight/427 *5
      
      
      //console.log(`die maximale width ist ${this.max_left} und die höhe ist ${this.max_top}`);
   };


   figures_collide_check(pos_figure){ //in dieser form übergeben [top  ,  left,  width  ,   height]
      let [h1,d1,l1,r1] = [this.position[0] , this.position[0] + document.getElementById(this.id).offsetHeight, this.position[1], this.position[1] + document.getElementById(this.id).offsetWidth];
      let [h2,d2,l2,r2] =[pos_figure[0],pos_figure[0] + pos_figure[3],pos_figure[1],pos_figure[1] + pos_figure[2]]
      if (
         h1 < d2 && d1 > h2 && // vertikal überlappt
         l1 < r2 && r1 > l2    // horizontal überlappt
         ){return true}

   }

   Wall_collide_check(hypothetical_position){  // in siwae form übergeben [h1,d1,l1,r1]

      let Figur_schmählern = 20
               
     let [h1,d1,l1,r1] = [hypothetical_position[0] , hypothetical_position[0] + document.getElementById(this.id).offsetHeight, hypothetical_position[1], hypothetical_position[1] + document.getElementById(this.id).offsetWidth];
     h1 += Figur_schmählern;
      d1 -= Figur_schmählern;
      l1 += Figur_schmählern;
      r1 -= Figur_schmählern;

     //console.log(`der Spieler ist ${document.getElementById(this.id).offsetHeight} hoch und ${document.getElementById(this.id).offsetWidth} breit`);
     //console.log(`der Spieler sollte hier sein ${[h1,d1,l1,r1]}`);
     //console.log(`der Spieler ISI hier ${this.position}`);

      
      for(let pos of Positions){
         //Koordinaten=[ [Positions[0],Positions[1]],[Positions[0],Positions[1]+Positions[2]],[Positions[0]+Positions[3],Positions[1]],[Positions[0]+Positions[3],Positions[1]+Positions[2] ]];
         let [h2,d2,l2,r2] =[pos[0],pos[0] + pos[3],pos[1],pos[1] + pos[2]]   // man könnte rechen kraft sparen wenn man das außerhalb der funktion speichert
         //console.log(`eine Wande ist hier ${[h2,d2,l2,r2]}`);
         //console.log(`eine Position ist hier ${pos}`);
         let Collide = false;
         let Collide_top = false;
         
         if( h1< h2){ 
            if(d1<h2){ Collide_top = false}
            else {Collide_top= true}
         }
         else if(h1>h2){
            if(h1>d2){ Collide_top= false}
            else {Collide_top= true}
         }
         else{Collide_top= true}

         
         if( r1> r2){ 
            if(r1>l2){ Collide = false}
            else {Collide= true}
         }
         else if(r1<r2){
            if(l1<r2){ Collide= false}
            else {Collide= true}
         }
         else{Collide= true};

         //console.log(`collide: ${Collide} and ${Collide_top}`);

         //if (Collide == true && Collide_top == true){ return true};

         if (
         h1 < d2 && d1 > h2 && // vertikal überlappt
         l1 < r2 && r1 > l2    // horizontal überlappt
         ){console.log("you shall not pass") ;return true}

         
         
                  
      }
      
   }

        

   position_check(){
      if (this.position[0] > this.max_top){this.position[0] = this.max_top - 60 }
      if (this.position[0] < 0){this.position[0] =  60 }
      if (this.position[1] > this.max_left){this.position[1] = this.max_left - 60 }
      if (this.position[1] < 0){this.position[1] =  60 }
   };
   
   move_down(){
    if (this.position[0] > this.max_top){this.position[0] = this.max_top}
    else if(this.Wall_collide_check([this.position[0]+ this.tim_speed, this.position[1]])){console.log("STOPPP");this.position[0]=this.position[0];total_stop1= true}
    else{this.position[0]+= this.tim_speed;};
    //this.html.style.top = this.position[0] + "px";
    
   }
   move_up() {
  if (this.position[0] < 0) {
    this.position[0] = 0;
  } 
  else if (this.Wall_collide_check([this.position[0] - this.tim_speed, this.position[1]])) {
    console.log("STOPPP");
    this.position[0] = this.position[0]; // eigentlich redundant
    total_stop2 = true;
  } 
  else {
    this.position[0] -= this.tim_speed;
  }
  // this.html.style.top = this.position[0] + "px";
}

move_left() {
  if (this.position[1] < 0) {
    this.position[1] = 0;
  } 
  else if (this.Wall_collide_check([this.position[0], this.position[1] - this.tim_speed])) {
    console.log("STOPPP");
    this.position[1] = this.position[1]; // hier musst du Y fixen, nicht X
    total_stop3 = true;
  } 
  else {
    this.position[1] -= this.tim_speed;
  }
  // this.html.style.left = this.position[1] + "px";
}

move_right() {
  if (this.position[1] > this.max_left) {
    this.position[1] = this.max_left;
  } 
  else if (this.Wall_collide_check([this.position[0], this.position[1] + this.tim_speed])) {
    console.log("STOPPP");
    this.position[1] = this.position[1]; // auch hier Y fixen
    total_stop4 = true;
  } 
  else {
    this.position[1] += this.tim_speed;
  }
  // this.html.style.left = this.position[1] + "px";
}
   random_move(){
      let rand_move = Math.random()-0.5;

      if(this.Wall_collide_check(this.position[0]+rand_move,this.position[1]+rand_move)){ }
      else{
      this.position[0] += rand_move;
      this.position[1] += rand_move;
      this.position_check();}
      
      //this.html.style.top = this.position[0] + "px";
      //this.html.style.left = this.position[1] + "px";
   };
   follow_tim(tim){
      let pos_now = [...this.position]
      
         if(this.Wall_collide_check(pos_now)){Pac_move *= 0.2}

         if(tim.position[0]>this.position[0]){this.position[0]+=Pac_move;} //this.html.style.top = this.position[0] +"px"};
         if(tim.position[0]<this.position[0]){this.position[0]-=Pac_move; } //this.html.style.top = this.position[0] +"px"};
//
         if(tim.position[1]>this.position[1]){this.position[1]+=Pac_move; } //this.html.style.left = this.position[1] +"px"};
         if(tim.position[1]<this.position[1]){this.position[1]-=Pac_move; } //this.html.style.left = this.position[1] +"px"};
      
         
   }

   
   dog_follow_tim(tim){

      if(tim.position[0]>this.position[0]){this.position[0]+=dog_move;} //this.html.style.top = this.position[0] +"px"};
      if(tim.position[0]<this.position[0]){this.position[0]-=dog_move; } //this.html.style.top = this.position[0] +"px"};
      if(tim.position[1]>this.position[1]){this.position[1]+=dog_move; } //this.html.style.left = this.position[1] +"px"};
      if(tim.position[1]<this.position[1]){this.position[1]-=dog_move; } //this.html.style.left = this.position[1] +"px"};
      
         
   }

   

   heal(){
    let coordinates = [
        parseFloat(game2.offsetTop),
        parseFloat(game2.offsetLeft),  // Korrigiert von style.top
        parseFloat(game2.offsetWidth), 
        parseFloat(game2.offsetHeight) // Korrigiert von offsetWidth
    ];
    
    //console.log("Koordinaten:", coordinates);
    //console.log(`Top: ${coordinates[0]}, Left: ${coordinates[1]}, Width: ${coordinates[2]}, Height: ${coordinates[3]}`);
    
    if(this.figures_collide_check(coordinates)){
         if (HP<100){HP +=0.1};
         document.getElementById("hp-fill").style.width = HP +"%";
         Pac_move= 0;
    }
   else{Pac_move=Pac_move_start}};

   hurt(damage){
      HP -= damage;
      if (HP <=0){this.sterben()}
      document.getElementById("hp-fill").style.width = HP +"%";

   }
   
   sterben(){
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";  // Dunkles halbtransparentes Overlay
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";  // Flexbox in Spaltenrichtung
    overlay.style.justifyContent = "center"; // Zentrieren der Kinder (Nachricht und Button)
    overlay.style.alignItems = "center";     // Horizontal zentrieren
    overlay.style.zIndex = "1000";  // Sicherstellen, dass das Overlay oben ist

    // Erstelle das h1-Element mit der Todesnachricht
    const deathMessage = document.createElement("h1");
    deathMessage.textContent = "You died !!!";
    deathMessage.style.fontSize = "50px";
    deathMessage.style.color = "white";
    deathMessage.style.textAlign = "center";
    deathMessage.style.fontFamily = "Arial, sans-serif";
    deathMessage.style.marginTop = "20px";

    const reviveButton = document.createElement("button")
    reviveButton.textContent = "Try again";
    reviveButton.style.fontSize = "20px";
    reviveButton.style.padding = "10px 20px";
    reviveButton.style.marginTop = "30px";
    reviveButton.style.cursor = "pointer";
    reviveButton.style.backgroundColor = "#4CAF50";  // Grüner Button
    reviveButton.style.color = "white";
    reviveButton.style.border = "none";
    reviveButton.style.borderRadius = "5px";

    overlay.appendChild(deathMessage);
    overlay.appendChild(reviveButton);
    document.body.appendChild(overlay);
    tim.position[0]=100000

    addEventListener("click",(event)=>{document.body.removeChild(overlay);location.reload();})

    
    
   }


}


class item_producer{
    constructor(level){
        //this.type = type;
        this.Anzahl = level + 4;
        this.xp_zahl = level
        
    }

    rand_wall(){
        let Anzahl = 7; // später abh vom level
        for( let i =0 ; i<Anzahl; i++){
            let wall =document.createElement("div");
            wall.style.position = "absolute" ;
            if(Math.random()> 0.5){
                wall.style.width = Math.trunc(Math.random()*200 + 50) + "px"
                wall.style.height =  "12px"}
            else{
                wall.style.height = Math.trunc(Math.random()*200 + 50) + "px"
                wall.style.width =  "12px"};
            wall.style.zIndex= "2";
            wall.style.backgroundImage= "url('images/wall.png')";
            wall.style.top = Math.trunc(Math.random()*game.offsetHeight/Anzahl * (7-i) + 50) + "px"    // die position bestimmt immer die postion der oberen linke ecke eines elements
            wall.style.left = Math.trunc(Math.random()*game.offsetWidth/Anzahl  * i + 50) + "px"


            game.appendChild(wall)
            console.log("eine Wand erstellt")
            }

        }

    xp(){
        let Anzahl =this.xp_zahl
        for( let i = 0; i<Anzahl; i++){
            //XP = Math.trunc(Math.random()*10)
            let xp_bild =document.createElement("div");
            xp_bild.style.position ="absolute"

            xp_bild.style.backgroundImage="url('images/xp.png')";
            xp_bild.style.backgroundSize="contain";
            xp_bild.style.borderRadius= "50%";
            xp_bild.style.height= game.offsetWidth/30 +"px";
            xp_bild.style.width= xp_bild.style.height;
            xp_bild.style.zIndex= "2";
            xp_bild.style.top= Math.trunc(Math.random()*(game.offsetHeight - xp_bild.offsetHeight - 50)) + "px" ;
            xp_bild.style.left= Math.trunc(Math.random()*(game.offsetWidth - xp_bild.offsetWidth - 50 )) + "px" ;

            let top,left;
            if(typeof xp_bild.style.top == 'undefined' || xp_bild.style.top ==""){top = "0px"} else{top = xp_bild.style.top};
            if(typeof xp_bild.style.left == 'undefined' || xp_bild.style.left ==""){left = "0px"} else{left = xp_bild.style.left};

            let position =[parseFloat(top), parseFloat(left), parseFloat(xp_bild.style.width), parseFloat(xp_bild.style.height)];        

         

            XP_Positions.push([position, xp_bild])


            game.appendChild(xp_bild)
        }
        
    }
    
   Rand_Wall(){
      let Anzahl =20
      let wall_höhe = game.offsetHeight/ 5
      let Zahl = [1,2,3,4,5]
      // bsp position : [ top, left. width, height  ]
      
      while(Anzahl>0){
         Anzahl--;
         let rand = Math.random();
        
         
         let wall = document.createElement("div")
         wall.style.position = "absolute" ;
         wall.style.backgroundImage= "url('images/darkwall.jpg')";
         wall.style.backgroundSize="contain";

         if (Anzahl % 2 ==0){
            wall.style.width= "20px";
            wall.style.height= wall_höhe + "px";
            if(rand<0.33){wall.style.top= game.offsetHeight - wall_höhe  - 50+ "px"}
            else if(rand>0.33 && rand <0.66){wall.style.top= game.offsetHeight - wall_höhe  -50 - Math.trunc(Math.random()*5)*50 + "px"}
            else{wall.style.top=0};
            wall.style.left= game.offsetWidth/ 6 *Zahl[Math.trunc(Math.random()*5)]  +"px";
         }
         else{
            wall.style.width= wall_höhe + "px";
            wall.style.height= "20px";
            if(rand<0.33){wall.style.left= game.offsetWidth - wall_höhe  - 50+ "px"}
            else if(rand>0.33 && rand <0.66){wall.style.left= game.offsetWidth/ 6 *Zahl[Math.trunc(Math.random()*5)] + "px"}
            else{wall.style.top=0};
            wall.style.top= game.offsetHeight/ 4 *Zahl[Math.trunc(Math.random()*3)]  +"px";


         }
         game.appendChild(wall);
         Wall_object_list.push(wall);


         let top,left;
         if(typeof wall.style.top == 'undefined' || wall.style.top ==""){top = "0px"} else{top = wall.style.top};
         if(typeof wall.style.left == 'undefined' || wall.style.left ==""){left = "0px"} else{left = wall.style.left};

         //let position =[top, left, wall.style.width, wall.style.height];
         let position1 =[parseFloat(top), parseFloat(left), parseFloat(wall.style.width), parseFloat(wall.style.height)];        
         Positions.push(position1)


      }

   }
   }

function next_lvl(){

   Pac_move_start*=1.08
   for(let wall of Wall_object_list){wall.remove()};
   for(let xp of XP_Positions){xp[1].remove()};
   Positions= [];
   XP_Positions =[];
   if(Level == 2){pac2.position = [game.offsetHeight-100,game.offsetWidth-100];
      //pac2.style.top = game.offsetHeight + "px";
      //pac2.style.left = game.offsetWidth + "px";

      };
   detonationszeit = detonationszeit * 0.9

   if(Level %3 ==0){
      dog_hit=0
      dog_canvas.style.visibility ="visible"
      boss_fight = true;
      pac.position=[10000,0]
      pac2.position=[10000,0]
      Pac_move = 0
      game2.style.visibility="hidden"
      game.style.backgroundImage = "url(images/hell.jpg)";
      dog.html.style.display= "block";
      dog.follow_tim(tim)
      dog.position=[game.offsetHeight*(39/100),game.offsetWidth*(45/100)]
      
      

   }
   else{
   dog_canvas.style.visibility ="hidden"
   dog.position=[-10000000,-1000000]
   wall_maker.Rand_Wall();
   xp_maker.xp();
   dog.html.style.display = "none"
   boss_fight = false;
   pac.position=[0,0]
   pac2.position=[game.offsetHeight-100,game.offsetWidth-100]
   Pac_move = Pac_move_start
   game2.style.visibility="visible"
   game.style.backgroundImage = "url(images/background2.png)";
   }

   }











    // Spiel Start
let Level = 1
let Positions = []
let XP_Positions = []
let XP = 0;
let XP_for_last_lvl = 20/1.6
let Wall_object_list =[]
let total_stop1, total_stop2,total_stop3,total_stop4
let boss_fight


const tim = new figur([game.offsetHeight*(39/100),game.offsetWidth*(45/100)],"tim");
const pac = new figur([0,0], "pac");
const pac2 =new figur ([-5000,200],"pac2")
const dog = new figur([-1000,-1000],"dog");
console.log(dog)
console.log(tim)


console.log(`tim ist ${document.getElementById("tim").offsetWidth} breit`);
console.log(`tim ist ${document.getElementById("tim").offsetHeight} hoch`);

const wall_maker =new item_producer(4);
const xp_maker =new item_producer(5);
let HP= 100
let Pac_move_start= game.offsetHeight/427/2
let Pac_move = Pac_move_start
let dog_move_start = game.offsetHeight/427 *0.95
let dog_move = dog_move_start


const dog_bar = document.getElementById("dog_bar")
const dog_canvas = document.getElementById("dogus")

xp_maker.xp()
wall_maker.Rand_Wall()


// animation

const explosion = document.getElementById("explosion");
explosion.width = game.offsetHeight /5;
explosion.height = explosion.width ;
explosion.style.position ="absolute";
explosion.style.zIndex = 10


const ctx = explosion.getContext('2d');
ctx.fillStyle = "red";
const expl_image =new Image();
expl_image.src = "images/explosion.png"


function drawing(seitlich,vertikal){ // 764 * 845
   spirit_width= 764/6;
   spirit_height= 845/7;
ctx.clearRect(0,0,explosion.width,explosion.height);
ctx.drawImage(expl_image,spirit_width * seitlich ,spirit_height * vertikal ,spirit_height,spirit_width,0,0,explosion.width,explosion.height);
if(tim.figures_collide_check([parseFloat(explosion.style.top),parseFloat(explosion.style.left),explosion.width,explosion.height])){tim.hurt(1)}}
let seitlich= 0;
let runter= 0;


const main_character =document.getElementById("main_character");
main_character.width = game.offsetWidth/22;
main_character.height = main_character.width ;
main_character.style.position ="absolute";
main_character.style.zIndex = 10;
//main_character.style.top = tim.offsetTop ;
//main_character.style.left = tim.offsetLeft ;


const ctx2 = main_character.getContext('2d');
//ctx2.fillStyle = "red";
const main_image =new Image();
main_image.src = "images/main_character.png"


function drawing_main(right,nach_links_laufen){ // 764 * 845
   spirit_width= 365/6;
   spirit_height= 78;
ctx2.clearRect(0,0,main_character.width,main_character.height);
//if(nach_links_laufen){ctx2.scale(-1, 1) }// horizontal spiegeln
ctx2.drawImage(main_image,spirit_width*rechts ,0 ,spirit_width,spirit_height,0,0,main_character.width,main_character.height);
}
let rechts =0;


// Endgegner Hund animieren
const Hund =document.getElementById("dogus");
Hund.width = game.offsetWidth/8.5;
Hund.height = Hund.width ;
Hund.style.position ="absolute";
Hund.style.zIndex = 10;
//main_character.style.top = tim.offsetTop ;
//main_character.style.left = tim.offsetLeft ;


const ctx4 = Hund.getContext('2d');
//ctx2.fillStyle = "red";
const dog_image =new Image();
dog_image.src = "images/shadow_dog.png"


function drawing_dog(rechts_dog,dog_bewegung){ // 764 * 845
   spirit_width= 6876/12;
   spirit_height= 5230/10;
ctx4.clearRect(0,0,Hund.width,Hund.height);
//if(nach_links_laufen){ctx2.scale(-1, 1) }// horizontal spiegeln
ctx4.drawImage(dog_image,spirit_width*rechts_dog,spirit_height *dog_bewegung,spirit_width,spirit_height,0,0,Hund.width,Hund.height);
}
let rechts_dog =0;
let dog_bewegung= 0  // 0 wenn sitz, 3 wenn lauf


const bullet =document.getElementById("bullet");
bullet.width = game.offsetWidth/20;
bullet.height = bullet.width ;
//bullet.style.width = "50px";
//bullet.style.height = "50px";
bullet.style.position ="absolute";
bullet.style.zIndex = 15;

//main_character.style.top = tim.offsetTop ;
//main_character.style.left = tim.offsetLeft ;


const ctx3 = bullet.getContext('2d');
ctx3.fillStyle = "red";
const bullet_image =new Image();
bullet_image.src = "images/shadow_dog.png"


function drawBullet(rechts_bullet){ // 6876 *5230
   spirit_width= 6876/12;
   spirit_height= 5230/10;
ctx3.clearRect(0,0,bullet.width,bullet.height);
ctx3.drawImage(bullet_image,spirit_width*rechts_bullet,spirit_height *6,spirit_width,spirit_height,0,0,bullet.width,bullet.height);
}
let rechts_bullet =0;
let flug_left
let flug_top 



   



let tim_move= false
let nach_links_laufen
let bullet_speed = 7
let Eisclick
const Eisbutton = document.getElementById("special-button")
let Eisbool
let elapsed_bossfight

Eisbutton.addEventListener("click",()=>{
   console.log(`hier das Eis: ${parseInt(getComputedStyle(eis_pw).height)}`)
   if(parseInt(getComputedStyle(eis_pw).height) == 0){
      document.getElementById("fullscreen-overlay").style.opacity = "0.5";
      Eisbool = true
   }
   })


document.addEventListener("keydown", event => {
   event.preventDefault();
   tim_move = true;
   //healingInterval();
   //console.log(`tim ist hier ${tim.html.style.top}`);
   //console.log(`tim ist hier links ${tim.html.style.left}`);
   //if(total_stop1&& total_stop2&&total_stop3&&total_stop4)
     // {[total_stop1, total_stop2,total_stop3,total_stop4]=[false,false,false,false]; [tim.html.style.top,tim.html.style.top] =[game.offsetHeight*(39/100),game.offsetWidth*(45/100)]};
    random_numb = Math.trunc(Math.random()*100);
   //if(random_numb >40){pac.follow_tim(tim)};

   Eispower += 0.1;

   
   
   switch (event.key){
      
      case "ArrowUp":
         tim.move_up();
         break;
      case "ArrowDown":
         tim.move_down();
         break;
      case "ArrowLeft":
         tim.move_left();
         nach_links_laufen= true;
         break;
      case "ArrowRight":
         tim.move_right();
         nach_links_laufen= false;
         break;
      
     
   };

   if(!Schuss_momentan){switch(event.key){
        case "s":
         tim_shoot=true;
         flug_left= bullet_speed *-1;
         flug_top=0
         break;
      case "d":
         tim_shoot=true;
         flug_left= bullet_speed
         flug_top = 0;
         break;
      case "e":
         tim_shoot=true;
         flug_left= 0
         flug_top= bullet_speed *-1
         break;
      case "x":
         tim_shoot=true;
         flug_left= 0
         flug_top= bullet_speed
         break;
      case "r":
         tim_shoot=true;
         flug_left= bullet_speed;
         flug_top= bullet_speed*-1
         break;
      case "w":
         tim_shoot=true;
         flug_left= bullet_speed*-1;
         flug_top= bullet_speed*-1
         break;
      case "y":
         tim_shoot=true;
         flug_left= bullet_speed*-1;
         flug_top= bullet_speed
         break;
      case "c":
         tim_shoot=true;
         flug_left= bullet_speed;
         flug_top= bullet_speed
         break;
   }}
   
});

document.addEventListener("keyup", event => {tim_move = false})

let figures = [tim,pac,pac2]
let XP_to_nxt_lvl= XP_for_last_lvl * 1.6
let dog_hit = 0


function update(){
   pac.follow_tim(tim);
   pac2.follow_tim(tim);

   
}















function render(){


   //dogbar
   
   dog_bar.style.top =dog.position[0] +5 +"px";
   dog_bar.style.height = game.offsetHeight/90 + "px";
   dog_bar.style.width = game.offsetHeight/8.5 + "px";
   dog_bar.style.left = dog.position[1] + game.offsetHeight/10 +"px";

   eis_pw.style.height = 100 - Eispower +"%"
   

   for (let fig of figures){

   fig.html.style.top = fig.position[0] + "px";
   fig.html.style.left = fig.position[1] + "px";
   };

   tim.heal();

   if(Math.abs(tim.position[0]-pac.position[0]) < 50 && Math.abs(tim.position[1]-pac.position[1]) < 50 ){tim.hurt(0.7); console.log("hab dich")};
   if(Math.abs(tim.position[0]-pac2.position[0]) < 50 && Math.abs(tim.position[1]-pac2.position[1]) < 50 ){tim.hurt(0.7); console.log("hab dich")};
   if(Math.abs(tim.position[0]-dog.position[0]) < 50 && Math.abs(tim.position[1]-dog.position[1]) < 50 ){tim.hurt(1.1); console.log("hab dich")};
   if(Math.abs(parseInt(bullet.style.top)-dog.position[0]) < dog.html.offsetHeight && Math.abs(parseInt(bullet.style.left)-dog.position[1]) < dog.html.offsetWidth ){
      dog_hit +=1; console.log("dog abgeschossen");
      };
   //console.log(`Die Kugel ist hier ${parseInt(bullet.style.top)} und hier ${parseInt(bullet.style.left)} `)
   //console.log(`Und der Hund hier: ${dog.position} `)
   
   document.getElementById("dog-health-fill").style.width = 100 - (dog_hit/Level *4) +"%"
   if(parseInt(document.getElementById("dog-health-fill").style.width)<2){
      document.getElementById("dog-health-fill").style.width = 100 +"%";
      Level +=1; 
      document.getElementById("Level").textContent = "Level: " + Level;
      next_lvl()}
   

   
   for (let i = XP_Positions.length - 1; i >= 0; i--)
      { if(!boss_fight){
         let pos = XP_Positions[i];
         if(tim.figures_collide_check(pos[0]))
            {XP += XP_to_nxt_lvl/4;
            pos[1].remove(); 
            XP_Positions.splice(i, 1);
            if(XP_Positions.length == 0){xp_maker.xp()}
            // jetzt die xps updaten
            document.getElementById("xp-fill").style.width = XP / XP_to_nxt_lvl *100 + "%";
            if (XP >= XP_to_nxt_lvl) 
               {Level +=1; XP -= XP_to_nxt_lvl;
               document.getElementById("Level").textContent = "Level: " + Level;
               XP_for_last_lvl = XP_to_nxt_lvl;
               document.getElementById("xp-fill").style.width = XP / XP_to_nxt_lvl *100 + "%";
               next_lvl()
            }}
   }}

   

}


let start = null
let boom = 5000;
let boom_bef = 2500;
let exploding=false;
let detonationszeit = 3000 
const bomb = document.getElementById("bomb")
let tim_shoot
let shoot_start
let Schuss_momentan
let running= 30
let Eisstart
let runtime=200
const cycle = 8000;
const sitTime = 2000;
let dog_freeze
let elapsed_bossfight_no_shiver




function loop(timestamp){
   

   if(!start){start =timestamp};
   elapsed = timestamp -start;



   update();
   render();

   if(boom_bef -elapsed<2000){ boom_bef = elapsed + 4000 + detonationszeit;
      bomb.style.display ="block"
      bomb.style.top = Math.random()*game.offsetHeight + "px";
      bomb.style.left = Math.random()*game.offsetWidth + "px";
      bomb.height = game.offsetHeight /7;
      bomb.width = bomb.height / 1.5;
      bomb.style.position ="absolute";
      bomb.style.zIndex = 10
   }


   if(boom -elapsed<0){boom = elapsed+ 2000 + detonationszeit; exploding =true;
      bomb.style.display = "none"
      explosion.style.top = bomb.style.top;
      explosion.style.left = bomb.style.left;
      expl_image.src = "images/explosion.png"
      
   }
   
   if(exploding){
   drawing(seitlich,runter);
   seitlich++;
   if(seitlich == 5 && runter!= 7){runter++; seitlich=0;}
   if(runter==7 && seitlich ==5){runter =0; seitlich =0;exploding=false}
   
   };

   if(tim_move){
      //console.log(`tim ist gerade hier ${tim.position[0]}`)
      main_character.style.top=tim.position[0] +"px";
      main_character.style.left=tim.position[1] +"px";
      if(elapsed>running){
         running+=200
         drawing_main(rechts,nach_links_laufen);
         rechts ++;
         if (rechts ==5){rechts =0}
      }
   }
   //}else{main_character.display ="none"}

   if(tim_shoot){
      console.log(`Die Kugel ist hier ${parseInt(bullet.style.top)} und hier ${parseInt(bullet.style.left)} `)
      console.log(`Und der Hund hier: ${dog.position} `)
      console.log(`Abstand Höhe: ${parseInt(bullet.style.top)-dog.position[0]}`)
      console.log(`Abstand Breite: ${parseInt(bullet.style.left)-dog.position[1]}`)
      if(!Schuss_momentan){
         bullet.style.top=tim.position[0]+ flug_top +"px";
         bullet.style.left=tim.position[1]  +"px";
      }
      Schuss_momentan=true
      bullet.style.visibility ="visible";
      
      if(!shoot_start){
         shoot_start = timestamp;
         bullet.style.top=tim.position[0] +"px";
         bullet.style.left=tim.position[1]  +"px";
      }
      
      shoot_start=timestamp
      bullet.style.top=parseInt(bullet.style.top) + flug_top +"px";
      bullet.style.left=parseInt(bullet.style.left) + flug_left +"px";
      drawBullet(rechts_bullet);
      rechts_bullet ++;
      if (rechts_bullet ==5){rechts_bullet =0}
      
      
      
   }
   

   if(parseInt(bullet.style.top) +50< 0 || parseInt(bullet.style.top) > game.offsetHeight || parseInt(bullet.style.left) < 0 || parseInt(bullet.style.left) > game.offsetWidth -50){
      flug_left = 0;
      tim_shoot = false;
      
      bullet.style.visibility ="hidden"
      Schuss_momentan=false
   }

   if(boss_fight){
      
      drawing_dog(rechts_dog,dog_bewegung);
      Hund.style.top= dog.position[0] + "px";
      Hund.style.left= dog.position[1] + "px";

      

      // stehen bleiben und sitz machen

      if(!elapsed_bossfight){elapsed_bossfight = timestamp; runtime= timestamp}
      else{elapsed_bossfight_no_shiver= (timestamp - elapsed_bossfight) % cycle;
         
      }; 

      if(timestamp-runtime>150){rechts_dog++; runtime = timestamp;
         if(dog_freeze){rechts_dog--}
      }  // animation verlangsamen

      //laufen
      if(elapsed_bossfight_no_shiver > sitTime){
         if(dog_freeze){dog_move=0} else{dog_move=dog_move_start*(1.1**(Level/3))}
         ;dog.dog_follow_tim(tim); dog_bewegung = 3;
         if (rechts_dog ==8){rechts_dog =0}
      }
      //sitz
      else{dog_move=0; dog_bewegung = 0;
         if (rechts_dog ==6){rechts_dog =0;}  // sitz hat nur 7 bilder
      }

   }

   if(Eisbool){Eisstart = timestamp; Eisbool = false; Eispower = 0;}
   if (timestamp-Eisstart>4000){document.getElementById("fullscreen-overlay").style.opacity = "0"; Eisstart = null, dog_freeze = false}  // wenn der eisbutton gedrückt ist koomt die eisschcit
   else if (timestamp - Eisstart<4000){Pac_move= 0, dog_freeze= true}
      
   
 
   
      
   
   
      

   requestAnimationFrame(loop)
}

requestAnimationFrame(loop);

