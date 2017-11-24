var spriteBarraSopra;
var spriteBarraSotto;
var spriteSfondo;
var spriteIcone=[];


var incrementoRotazione=2;
var frizioneRotazione=0.01;
var frizione=0.05;
var velocitaY=.1;
var velocitaX=.01;
var icone=[];
var grandezzaIcone;
var shaked=false;
var altezzaBarraSotto;

function preload()
{
    spriteBarraSopra=loadImage("./assets/BarraSopra.png");
    spriteBarraSotto=loadImage("./assets/BarraSotto.png");
    spriteSfondo=loadImage("./assets/Sfondo.jpg");
    for(var i=1;i<=9;i++)
    spriteIcone.push(loadImage("./assets/Icona"+i+".png"));
}

function setup() {
    angleMode(DEGREES);
  createCanvas(windowWidth,windowHeight);
    grandezzaIcone=width/5;
    
    var conta=0;
    for(var i=0;i<3;i++)
        {
            for(var j=0;j<3;j++)
            {
                var myIcona=new Icona(spriteIcone[conta],width/8+(width/8)*i*2.1,height/8+grandezzaIcone*1.3*j,conta);
                icone.push(myIcona);
                conta++;
            }
        }

    altezzaBarraSotto=width*.283;
}

function draw() {
    
    velocitaY=map(rotationX,-180,180,-1,1);
    velocitaX=map(rotationY,-90,90,-1,1);
    //velocitaY=1;
    //shaked=true;
  
    image(spriteSfondo,0,0,width,height);
    
    image(spriteBarraSopra,0,0,width,width*(0.084));

    image(spriteBarraSotto,0,height-altezzaBarraSotto,width,altezzaBarraSotto);
    
    for(var i=0;i<icone.length;i++)
        {
            icone[i].display();
        }

    /*if(!shaked)
    {
        textSize(30);
        textAlign(CENTER);
        fill(255);
        text("SHAKE!",width/2,height/8+grandezzaIcone*1.3*4);
    }*/
    
}

function Icona(immagineIcona,x,y,id)
{
    
    this.id=id;
    this.x=x;
    this.y=y;
    
    this.velocitaY=0;
    this.velocitaX=0;
    
    this.velocitaRotazione=0;
    this.rotazione=0;
    
    this.randomModifier=random(0.8,1);
    
    
    
    
    this.immagineIcona=immagineIcona;
    
    this.display=function()
    {
        push();
        if(shaked)
        {
        this.velocitaY+=velocitaY;
        this.velocitaX+=velocitaX;
        }
        //CLAMP
        this.velocitaY=constrain(this.velocitaY,-7,7);
         this.velocitaX=constrain(this.velocitaX,-7,7);
        
        this.y+=this.velocitaY*this.randomModifier;
        this.x+=this.velocitaX*this.randomModifier;
        
        this.rotazione+=this.velocitaRotazione;
        
        //if(frameCount%5==0)
        /*for(var i=0;i<icone.length;i++)
		{
			if(i!=this.id)
			if(dist(this.x,this.y,icone[i].x,icone[i].y)<grandezzaIcone*1.3)
				{
					this.velocitaX*=-1;
					this.velocitaY*=-1;
				}
		}*/
        
        if(this.y+grandezzaIcone+altezzaBarraSotto>height)
            {
                this.velocitaY*=-1*this.randomModifier;
              //  this.velocitaRotazione=incrementoRotazione;

            }
        if(this.y+grandezzaIcone<0)
            {
                this.velocitaY*=-1*this.randomModifier;
                this.velocitaRotazione=incrementoRotazione;

            }
        
        if(this.x+grandezzaIcone>width)
            {
                this.velocitaX*=-1*this.randomModifier;
                this.velocitaRotazione=incrementoRotazione;

                
            }
        if(this.x<0)
            {
                this.velocitaX*=-1*this.randomModifier;
                this.velocitaRotazione=incrementoRotazione;
            }
        
        //this.x=constrain(0,width);
        //this.y=constrain(0,height);
        
        if(this.x<0)
            this.x=0;
        if(this.x+grandezzaIcone>width)
            this.x=width-grandezzaIcone;
        
        if(this.y<0)
            this.y=0;
        if(this.y+grandezzaIcone+altezzaBarraSotto>height)
            this.y=height-grandezzaIcone-altezzaBarraSotto;
        
        if(abs(velocitaX<.2))
            {
        if(this.velocitaX>0)
            this.velocitaX-=frizione;
        if(this.velocitaX<0)
            this.velocitaX+=frizione;
            }
        if(abs(velocitaY<.2))
            {
        if(this.velocitaY>0)
            this.velocitaY-=frizione;
        if(this.velocitaY<0)
            this.velocitaY+=frizione;
            }
        
        if(this.velocitaRotazione>0.2)
		this.velocitaRotazione-=frizioneRotazione;
        
        this.velocitaRotazione=constrain(this.velocitaRotazione,-1,1);
        
        translate(this.x+grandezzaIcone/2,this.y+grandezzaIcone/2);
        rotate(this.rotazione);
        image(immagineIcona,-grandezzaIcone/2,-grandezzaIcone/2,grandezzaIcone,grandezzaIcone);
        //textSize(30);
       // text(this.id,0,0);
        pop();
        
        
    }
    
    this.shake=function()
    {
        this.velocitaX+=random(-7,7);
        this.velocitaY+=random(-7,7);
        this.velocitaRotazione=random(-3,3);
    }
    
   
}

function deviceShaken()
{
   for(var i=0;i<icone.length;i++)
        {
            icone[i].shake();
        }
    if(!shaked)
    shaked=true;
    
}