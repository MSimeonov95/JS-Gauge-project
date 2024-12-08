
function coGauge(targetCO) {
    if (targetCO > 2650 || targetCO < 0) {
        return;
    }
    const canvas = document.getElementById("co2Gauge");
    const c = canvas.getContext("2d");

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var currentCO = 0;

    // Define the animation function
    function animate() {
        // Calculate the difference between current and target CO
        var difference = targetCO - currentCO;
        // Define the step for the animation (adjust the speed here)
        var step = difference > 0 ? 10 : -10; // If difference is positive, increment, else decrement
        // Update the current CO gradually
        currentCO += step;
        
        // Clear the canvas before drawing
        c.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the gauge with the current CO
        drawGauge(currentCO);

        // Continue the animation until current CO reaches the target CO
        if ((step > 0 && currentCO < targetCO) || (step < 0 && currentCO > targetCO)) {
            requestAnimationFrame(animate);
        }
    }

    // Function to draw the gauge with the given CO
    function drawGauge(co) {
        // Text
        c.beginPath();
        c.font = "24px Arial"; 
        c.fillStyle = "black";
        c.textAlign = "center";
        c.fillText(co.toString() + ", ppm", centerX, centerY - 125);

        // CO meter outline
        c.beginPath();
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.moveTo(25, centerY - 5);
        c.lineTo(325, centerY - 5);
        
        c.moveTo(25, centerY + 5);
        c.lineTo(325, centerY + 5);
        c.stroke();

        // value lines
        c.beginPath();
        var xIncrement = 300 / 10;
        c.lineWidth = 2;
        for (let i = 0; i <= 10; i++) {
            c.moveTo(25 + xIncrement * i, centerY - 5);
            c.lineTo(25 + xIncrement * i, centerY - 12);
            c.moveTo(25 + xIncrement * i, centerY + 5);
            c.lineTo(25 + xIncrement * i, centerY + 12);
            c.stroke();
        }

        // Value
        var step = 300 / 2650;
        c.beginPath();
        c.lineWidth = 10;
        c.strokeStyle = "#9fca47";
        c.moveTo(25, centerY);
        c.lineTo(25 + step * co, centerY);
        c.stroke();
    }

    // Start the animation
    animate();
}

// Example usage:
coGauge(1290); // Call the function with the target CO
