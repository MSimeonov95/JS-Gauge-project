function tempGauge(targetTemp) {
    if (targetTemp > 100 || targetTemp < 0) {
        return;
    } 
    const canvas = document.getElementById("temperatureGauge");
    const c = canvas.getContext("2d");

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var currentTemp = 0;

    // Define the animation function
    function animate() {
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

    // Function to draw the gauge with the given temperature
    function drawGauge(temp) {
        // Text
        c.beginPath();
        c.font = "24px Arial";
        c.fillStyle = "black";
        c.textAlign = "center";
        c.fillText('Temperature: '+temp.toString() + "°C", centerX, centerY - 70); // Adjust text position
        
        var filled = (temp / 5).toFixed(0);
        
        for (let i = 0; i < filled; i++ ) {
            // Calculate gradient color
            var gradient = c.createLinearGradient(20 + i * 16, centerY - 30, 30 + i * 16, centerY + 30);
            gradient.addColorStop(0, "#ff4b47"); // Start color
            gradient.addColorStop(1, "#ffaf40"); // End color
            c.fillStyle = gradient;

            c.fillRect(20 + i * 16, centerY - 30, 10, 60);
            c.strokeStyle = "#ff0101";
            c.lineWidth = 0.5;
            c.strokeRect(20 + i * 16, centerY - 30, 10, 60);
        }

        for (let i = filled; i < 20; i++ ) {
            c.strokeStyle = "#ff0101";
            c.lineWidth = 0.5;
            c.strokeRect(20 + i * 16, centerY - 30, 10, 60);
        }
    }

    // Start the animation
    animate();
}

// Example usage:
tempGauge(80); // Call the function with the target temperature
