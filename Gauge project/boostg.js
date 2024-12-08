function boostgg(boost) {
    if (boost > 20 || boost < 0) {
        return;
    }

    const canvas = document.getElementById("boostgauge");
    const c = canvas.getContext("2d");
    
    const grad=c.createLinearGradient(0,0, 350,0);
    grad.addColorStop(0, "lightgrey");
    grad.addColorStop(1, "darkgrey");
    
    // const grad1=c.createLinearGradient(0,0, 350,0);
    // grad1.addColorStop(0, "blue");
    // grad1.addColorStop(1, "darkgrey"); 

    // const grad2=c.createLinearGradient(0,0, 350,0);
    // grad2.addColorStop(0, "lightblue");
    // grad2.addColorStop(1, "darkblue");

    canvas.width = 350;
    canvas.height = 350;
   
    var snail = Number(boost);
    var maxValue = 20;
    var Angle = (snail/ maxValue) * (3/4 * Math.PI);
    var arrowAngleIncrement = (3/4 * Math.PI) / 20;
    var centerX = canvas.width / 2;
    var centerY = canvas.height /2;
    var radius = 150;

    c.clearRect(0, 0, canvas.width, canvas.height); // chisti mete 

    //krug siv
    c.beginPath();
    c.strokeStyle = grad;
    c.lineWidth = 25;
    c.arc(centerX, centerY, radius + 12, 0, Math.PI * 2, true);
    c.stroke()
   
    // krug cheren
    c.beginPath();
    c.shadowColor = "black";
    c.shadowBlur = 20;
    c.shadowOffsetX = 2;
    c.shadowOffsetY = 2;
    c.strokeStyle = "#272727";
    c.lineWidth = 10;
    c.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    c.stroke();
    
    // Reset shadow properties
    c.shadowColor = "transparent";
    c.shadowBlur = 0;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0; 
    
    //sqnka
    c.beginPath();
    c.shadowColor = "black";
    c.shadowBlur = 20;
    c.shadowOffsetX = 2;
    c.shadowOffsetY = 2;
    c.strokeStyle = "#272727";
    c.lineWidth = 10;
    c.arc(centerX, centerY, radius-30, 0, Math.PI * 2, true);
    c.stroke();

    // Reset shadow properties
    c.shadowColor = "transparent";
    c.shadowBlur = 0;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    
    // resetShadow();

    c.fillStyle = "#434343";
    c.arc(centerX, centerY, radius , 0, Math.PI * 2, true);
    c.fill()

    // golemi cherti 
    c.beginPath();
    c.font = "20px Montserrat";
    c.fillStyle ="white";
    c.strokeStyle = "white";
    c.lineWidth = 5;
    var stepCount = 4;
    var startAngle = (1/2) * Math.PI; // Start angle (90 degrees in radians)
    var angleIncrement = 270 * Math.PI / 180 / stepCount; // Angle increment from 90 to 270 degrees
    for (let i = 0; i <= stepCount; i++) {
        var angle = startAngle + (i * angleIncrement);
        var x1 = centerX + (radius-10) * Math.cos(angle);
        var y1 = centerY + (radius-10) * Math.sin(angle);
        var x2 = centerX + (radius - 35) * Math.cos(angle);
        var y2 = centerY + (radius - 35) * Math.sin(angle);
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        var value = i * 5 ;
        var x = (centerX-10) + (radius -60) * Math.cos(angle);
        var y = (centerY +4)+ (radius -60) * Math.sin(angle);
        
        
        c.fillText(value.toString(), x, y);
        c.fillStyle ="white";
        c.stroke();
    }
    c.beginPath();  
    c.font = "15px Montserrat";
    c.fillText("PSI",centerX+115,centerY+25);
    c.font = "italic 20px Montserrat";
    c.beginPath();
    c.fillText("Boost",centerX+60,centerY+65);
    // malki cherti
    c.beginPath();
    c.strokeStyle = "white";
    c.lineWidth = 1;
    var stepCount = 40
    var angleIncrement = 270 * Math.PI / 180 / stepCount;
    for (let i = 0; i <= stepCount; i++) {
        if (i % 2 == 0) {
            var angle = (1/2) * Math.PI + (i * angleIncrement);
            var x1 = centerX + (radius-20) * Math.cos(angle);
            var y1 = centerY +(radius-20) * Math.sin(angle);
            var x2 = centerX + (radius - 35) * Math.cos(angle);
            var y2 = centerY + (radius - 35) * Math.sin(angle);
            c.moveTo(x1, y1);
            c.lineTo(x2, y2);
            c.stroke();
        }
    }

    //strelka   
    c.save(); 
    c.translate(centerX, centerY); 
    c.rotate(Angle*2); 
    c.beginPath();
    // c.shadowColor = "black";
    // c.shadowBlur = 10;
    // c.shadowOffsetX = 2;
    // c.shadowOffsetY = 2;
    c.shadowColor = "red";
    c.shadowBlur = 10;
    c.strokeStyle = "#fc0505";
    c.lineWidth = 7;
    c.moveTo(0, 0);
    c.lineTo(0, 135);
    c.moveTo(0, 0);
    c.lineTo(0, -40);
    c.stroke();
    c.restore(); 
    
    // strelka
    c.beginPath();
    c.shadowColor = "black";
    c.shadowBlur = 10;
    c.shadowOffsetX = 2;
    c.shadowOffsetY = 2;
    c.fillStyle = "#272727";
    c.lineWidth = 10;
    c.arc(centerX, centerY, 30, 0, Math.PI * 2, true);
    c.fill();
}
    var bs = 0;
    var dbs = 1;
    var duration = 1000;
    var startTime = null;

    function animate(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }
        var elapsedTime = timestamp - startTime;
        var progress = elapsedTime / duration;
        var easedProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        bs = easedProgress * 20;
        if (elapsedTime < duration * 2) {
            requestAnimationFrame(animate);
        } else {
            startTime = null;
            bs = 0;
        }
        boostgg(bs);
    }
    var currentTemp = 0;

    // Define the animation function
    function animate2() {
        // Calculate the difference between current and target temperature
        var difference = targetTemp - currentTemp;
        // Define the step for the animation (adjust the speed here)
        var step = difference > 0 ? 1 : -1; // If difference is positive, increment, else decrement
        // Update the current temperature gradually
        currentTemp += step;
        
        // Clear the canvas before drawing
        c.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the gauge with the current temperature
        drawGauge(currentTemp);

        // Continue the animation until current temperature reaches the target temperature
        if ((step > 0 && currentTemp < targetTemp) || (step < 0 && currentTemp > targetTemp)) {
            requestAnimationFrame(animate);
        }
    }
    
// Start the animation
requestAnimationFrame(animate);

