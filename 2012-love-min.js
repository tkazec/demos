(function(){var y=this,z="equestAnimationFrame",d=y["r"+z]||y["webkitR"+z]||y["mozR"+z]||y["msR"+z]||y["oR"+z]||function(o){setTimeout(o,1E3/60)},e=Math,j=e.PI,k=e.floor,l=e.random,p=c.width=960,s=c.height=540,t=[],u=0;function v(){for(var o=130+k(701*l()),m=130+k(151*l()),b=5+k(16*l()),w=4+k(7*l()),g=70+k(40*l()),h=50+k(201*l()),f=k(180*l()),n=[],i="#"+"F20,F0F,F6B,C18,408,800".split(",")[k(6*l())];h--;){var q=2*j*l(),r=w*l();n.push({x:o,y:m,a:r*e.cos(q),b:r*e.sin(q),d:0.97+(g-100)/1E3,c:b+k(6*l()),e:i})}setTimeout(function(){t=t.concat(n);u--},f*(1E3/60))}(function x(){if(!t.length&&!u)for(var m=u=k(6*l());m--;)v();t.forEach(function(b,m){b.x+=b.a;b.y+=b.b;b.a*=b.d;b.b*=b.d;b.y+=1.1;a.fillStyle=!k(4*l())?"rgba(256,256,256,.8)":b.e;var g=b.x,h=b.y,f=b.c,n=0.48*f,i=0.24*f,f=0.336*f;a.beginPath();a.moveTo(g-n,h);a.lineTo(g,h+n);a.arc(g+i,h-i,f,0.25*j,1.25*j,!0);a.arc(g-i,h-i,f,1.75*j,0.75*j,!0);a.fill();0.1>(b.c*=b.d)&&t.splice(m,1)});a.fillStyle="rgba(0,0,0,.3)";a.fillRect(0,0,p,s);d(x)})()})()