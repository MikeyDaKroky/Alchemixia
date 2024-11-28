// Toggle the visibility of side navigation and overlay
function toggleNav() {
    var nav = document.getElementById("mySidenav");
    var overlay = document.getElementById("overlay");
    if (nav.style.width === "250px") {
        closeNav();
    } else {
        nav.style.width = "250px";
        overlay.style.display = "block"; // Show overlay
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay").style.display = "none"; // Hide overlay
}

// Show the default homepage content on page load
document.addEventListener("DOMContentLoaded", function() {
    toggleContent('homePage'); // Display the home content by default
});

// Function to toggle the visibility of content sections
function toggleContent(sectionId) {
    var section = document.getElementById(sectionId);
    if (section.style.display === "block") {
        section.style.display = "none"; // Hide if already visible
    } else {
        // Hide all other sections
        var sections = document.querySelectorAll('.content');
        sections.forEach(function(sec) {
            sec.style.display = "none";
        });

        section.style.display = "block"; // Show clicked section
    }
}

// Function to toggle the visibility of subfolders
function toggleSubfolder(subfolderId) {
    var subfolder = document.getElementById(subfolderId);
    if (subfolder.style.display === "block") {
        subfolder.style.display = "none";
    } else {
        subfolder.style.display = "block";
    }
}

// Dilution calculator function with added water calculation
function calculateDilution() {
    const cbefore = parseFloat(document.getElementById("cbefore").value);
    const vbefore = parseFloat(document.getElementById("vbefore").value);
    const cafter = parseFloat(document.getElementById("cafter").value);
    const vafterInput = document.getElementById("vafter").value;
    let vafter = parseFloat(vafterInput);

    let resultMessage = '';
    let waterMessage = ''; // This will hold the amount of water required, if applicable

    if (cbefore > 0 && vbefore > 0 && cafter > 0 && vafter > 0) {
        const result = cbefore * vbefore === cafter * vafter;
        resultMessage = `Result: ${result}`;
    } else if (cbefore > 0 && vbefore > 0 && cafter > 0) {
        vafter = (cbefore * vbefore) / cafter;
        resultMessage = `Volume after dilution: ${vafter.toFixed(4)} ml`;
        // Calculate water required
        if (vbefore < vafter) {
            const waterRequired = vafter - vbefore;
            waterMessage = `Amount of water to add: ${waterRequired.toFixed(4)} ml`;
        }
    } else if (cbefore > 0 && vbefore > 0 && vafter > 0) {
        const cafter = cbefore * vbefore / vafter;
        resultMessage = `Concentration After: ${cafter.toFixed(4)} M`;
    } else if (cbefore > 0 && cafter > 0 && vafter > 0) {
        const vbefore = cafter * vafter / cbefore;
        resultMessage = `Volume Before: ${vbefore.toFixed(4)} ml`;
    } else if (vbefore > 0 && cafter > 0 && vafter > 0) {
        const cbefore = cafter * vafter / vbefore;
        resultMessage = `Concentration Before: ${cbefore.toFixed(4)} M`;
    } else {
        resultMessage = "Please enter at least three valid input values";
    }

    // Display results
    document.getElementById("dilution-result").innerHTML = resultMessage;
    document.getElementById("water-required").innerHTML = waterMessage;
}

function calculateSolute() {
    const gramsSolute = parseFloat(document.getElementById("gramsSolute").value);
    const volumeSolute = parseFloat(document.getElementById("volumeSolute").value);
    const concentrationSolute = parseFloat(document.getElementById("concentrationSolute").value);
    const weightSolute = parseFloat(document.getElementById("weightSolute").value);
  
    let resultMessageSolute = '';
  
    if (gramsSolute === 0 || isNaN(gramsSolute)) {
      if (volumeSolute > 0 && concentrationSolute > 0 && weightSolute > 0) {
        const gramsSoluteCalc = volumeSolute * concentrationSolute * weightSolute;
        resultMessageSolute = `Grams to weigh: ${gramsSoluteCalc.toFixed(4)} g`;
      } else {
        resultMessageSolute = "Please enter volume, concentration, and formula weight";
      }
    } else if (volumeSolute === 0 || isNaN(volumeSolute)) {
      if (gramsSolute > 0 && concentrationSolute > 0 && weightSolute > 0) {
        const volumeSoluteCalc = gramsSolute / (concentrationSolute * weightSolute);
        resultMessageSolute = `Volume: ${volumeSoluteCalc.toFixed(4)} dm^-3`;
      } else {
        resultMessageSolute = "Please enter grams, concentration, and formula weight";
      }
    } else if (concentrationSolute === 0 || isNaN(concentrationSolute)) {
      if (gramsSolute > 0 && volumeSolute > 0 && weightSolute > 0) {
        const concentrationSoluteCalc = gramsSolute / (volumeSolute * weightSolute);
        resultMessageSolute = `Concentration: ${concentrationSoluteCalc.toFixed(4)} M`;
      } else {
        resultMessageSolute = "Please enter grams, volume, and formula weight";
      }
    } else if (weightSolute === 0 || isNaN(weightSolute)) {
      if (gramsSolute > 0 && volumeSolute > 0 && concentrationSolute > 0) {
        const weightSoluteCalc = gramsSolute / (volumeSolute * concentrationSolute);
        resultMessageSolute = `Formula weight: ${weightSoluteCalc.toFixed(4)} g/mol`;
      } else {
        resultMessageSolute = "Please enter grams, volume, and concentration";
      }
    } else {
      resultMessageSolute = "All values are already filled";
    }
  
    document.getElementById("solute-result").innerHTML = resultMessageSolute;
  }

// Search functionality for chemicals
function searchChemicals() {
    const input = document.getElementById('searchBar').value.toUpperCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardText = card.querySelector('h3').innerText.toUpperCase();
        if (cardText.indexOf(input) > -1) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}


// Function to flip card when clicked
function flipCard(card) {
    const front = card.querySelector('.card-front');
    const back = card.querySelector('.card-back');
    if (front.style.transform === 'rotateY(180deg)') {
        front.style.transform = 'rotateY(0deg)';
        back.style.transform = 'rotateY(180deg)';
    } else {
        front.style.transform = 'rotateY(180deg)';
        back.style.transform = 'rotateY(0deg)';
    }
}

function plotData() {
  // Clear existing plot
  d3.select("#plot").selectAll("*").remove();

  // Get user inputs
  const graphTitle = document.getElementById("graphTitle").value || "Calibration Curve";
  const xLabel = document.getElementById("xLabel").value || "X-axis";
  const yLabel = document.getElementById("yLabel").value || "Y-axis";
  const rawData = document.getElementById("dataInput").value.trim().split("\n");

  // Parse and filter data
  const data = rawData.map(line => {
      const [x, y] = line.split(",").map(Number);
      return { x, y };
  }).filter(d => !isNaN(d.x) && !isNaN(d.y));

  // Linear regression calculation
  const n = data.length;
  const sumX = d3.sum(data, d => d.x);
  const sumY = d3.sum(data, d => d.y);
  const sumXY = d3.sum(data, d => d.x * d.y);
  const sumX2 = d3.sum(data, d => d.x * d.x);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // R-squared calculation
  const meanY = sumY / n;
  const ssTot = d3.sum(data, d => (d.y - meanY) ** 2);
  const ssRes = d3.sum(data, d => (d.y - (slope * d.x + intercept)) ** 2);
  const rSquared = 1 - ssRes / ssTot;

  // SVG dimensions
  const margin = { top: 50, right: 30, bottom: 60, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

  // Append SVG with white background
  const svg = d3.select("#plot")
      .append("svg")
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom)
      .style("background-color", "white")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // Scales
  const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x) + 1])
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y) + 0.2])
      .range([height, 0]);

  // Add title
  svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(graphTitle);

  // Add axes with black color and black tick labels
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .call(g => g.selectAll(".tick line").attr("stroke", "black"))
    .call(g => g.selectAll("path").attr("stroke", "black"))
    .call(g => g.selectAll(".tick text").attr("fill", "black")) // Set tick labels to black
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.bottom - 20)
    .attr("fill", "black")
    .style("font-weight", "bold")
    .text(xLabel);

svg.append("g")
    .call(d3.axisLeft(y))
    .call(g => g.selectAll(".tick line").attr("stroke", "black"))
    .call(g => g.selectAll("path").attr("stroke", "black"))
    .call(g => g.selectAll(".tick text").attr("fill", "black")) // Set tick labels to black
    .append("text")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 20)
    .attr("fill", "black")
    .style("font-weight", "bold")
    .style("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text(yLabel);

  // Plot points
  svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", 5)
      .attr("fill", "#3498db");

  // Draw line of best fit
  const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(slope * d.x + intercept));

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3498db")
      .attr("stroke-width", 2)
      .attr("d", line);

  // Display equation and R-squared value
  svg.append("text")
      .attr("x", width - 150)
      .attr("y", height - 30)
      .style("font-size", "12px")
      .text(`y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`);
  
  svg.append("text")
      .attr("x", width - 150)
      .attr("y", height - 10)
      .style("font-size", "12px")
      .text(`R² = ${rSquared.toFixed(3)}`);
}

// Function to save plot as PNG
function savePlot() {
  const plotElement = document.querySelector("#plot svg");
  const graphTitle = document.getElementById("graphTitle").value || "calibration_curve"; // Default if title is empty

  html2canvas(plotElement, {
      backgroundColor: "white", // Ensure white background in saved image
  }).then(canvas => {
      const link = document.createElement("a");
      
      // Use the graph title as the filename, replacing spaces with underscores
      link.href = canvas.toDataURL("image/png");
      link.download = `${graphTitle.replace(/\s+/g, '_')}.png`;
      link.click();
  });
}
