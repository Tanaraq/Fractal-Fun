window.addEventListener('load', function(){
  
 const canvas = document.getElementById('canvas1');
 const ctx = canvas.getContext ('2d');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 
 //  CANVAS STYLE
 ctx.lineWidth = 10;
 ctx.lineCap = "round";
 
 // EFFECTS
 const size = canvas.width*0.3;
 let maxLevel = 4;
 let branches = 3;
 let sides = 3;
 let scale = 0.5;
 let spread = 1.1;
 let hue = Math.ceil(Math.random()*360);
 let lightness = '50%';
 let color = 'hsl('+hue+', 100%, '+lightness+')';
 console.log(color);
 let double = false;
 let dots = false;
 
 //this function will draw 1 branch:
 function drawBranch(level){
  //first: recursion termination to prevent endless loop!:
    if (level>maxLevel) return; 
    //draw base line:
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(size,0);
    ctx.stroke();
   
    for (let i=0; i<branches; i++){
    //manipulate line and create branches on one side:
      ctx.save();
      ctx.translate(size-(size/branches)*i, 0);
      ctx.rotate(spread);
      ctx.scale(scale, scale);
      drawBranch(level+1); //call function in itself =recursion
      ctx.restore();
    
    //if double, make a branch on the other side:
      if(double){
        ctx.save();
        ctx.translate(size-(size/branches)*i, 0);
        ctx.rotate(-spread);
        ctx.scale(scale, scale);
        drawBranch(level + 1);
        //console.log(level);
        ctx.restore();
      }
      
      //let's add some dots!
      if(dots){
        lightness = '70%';
        let color = 'hsl('+hue+', 100%, '+lightness+')';
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(size*1.5,size*-0.5,size*0.07,0,Math.PI*2);
        ctx.fill();
      };
    };
  };

 //the MAIN FUNCTION draws a circular fractal with several branches:
 function drawFractal() {
    //clear, remove previous fractal:
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2 + 80);//=start (slightly below) center
    for (let i=0 ; i<sides ; i++) {
      //for each side, rotate proportionally:
      ctx.rotate((Math.PI*2)/sides);
      //then draw a branch:
      drawBranch(0);
    };
    ctx.restore();
 }
 drawFractal();
 
 function randomFractal(){
    sides = 2+(Math.floor(Math.random()*6));//=2 to 8
    scale = 0.4+(Math.random()*0.2);//=0.4 to 0.6
    spread = 0+(Math.random()*1.7);//0 to 1.7
    hue = Math.ceil(Math.random()*360)
    color = 'hsl('+hue+', 100%, 50%)';
    drawFractal();
  }
 
 // RANDOM-BUTTON: run randomFractal()
  document.getElementById("randomButton").addEventListener('click', () => {
   randomFractal();
  })
 
 // CONTROLS-BUTTON: show controls:
  document.getElementById('controlButton').addEventListener('click', () => {
    const panel =document.getElementById('controls');
    if (panel.style.display === 'none'){
     panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
    }
  });
 
 // CONTROLS:
  const sliderBranches = document.getElementById('branches');
  sliderBranches.addEventListener('change', (e) => {
    sides = e.target.value;
    drawFractal();
  });
  
  const sliderSpread = document.getElementById('spread');
  sliderSpread.addEventListener('change', (e) => {
    spread = e.target.value;
    drawFractal();
  });
  
  const sliderScale = document.getElementById('scale');
  sliderScale.addEventListener('change', (e) => {
    scale = e.target.value;
    drawFractal();
  });
  
  // Let's make a single or double option! To do this, I created a variable 'double' and adapted the function drawBranch a bit. Now for the buttons:
  const choice = document.getElementsByClassName('radio');
  //console.log(choice);//it's an array!
  for (let i = 0; i < 2; i++) {
    choice[i].addEventListener('change', () => {
      const selector = document.querySelector('input[name="selector"]:checked');
      if (selector.value === 'double') {
        double = true;
        branches = 2;
        //if double, no dots:
        dots = false;
        dotsCheck.disabled=true;
        dotsCheck.checked=false;
        document.getElementById('dotsLabel').style.textDecoration= 'line-through';
         document.getElementById('dotsLabel').style.color='grey';
      } else {
        double = false;
        branches = 3;
        //if single, dots optional:
        dotsCheck.disabled = false;
        document.getElementById('dotsLabel').style.textDecoration = 'none';
        document.getElementById('dotsLabel').style.color = 'white';
      };
      drawFractal();
    })
  };
  
  //I wanna make an option to add some dots. I created a variable dots, updated the drawBranch function again, and added a checkbox for input. 
   const dotsCheck = document.querySelector("input[name=dots]");
  
   dotsCheck.addEventListener('change', () => {
      if(dotsCheck.checked) {
        dots = true;
      } else {
        dots = false;
      }
      drawFractal();
   });
   
}) 
