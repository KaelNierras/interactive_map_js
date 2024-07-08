const activeCountries = [
  { name: "Philippines", description: "Description for Philippines", companyName: "Company in Philippines" },
  { name: "Canada", description: "Description for Canada", companyName: "Company in Canada" },
  { name: "Spain", description: "Description for Spain", companyName: "Company in Spain" },
  { name: "Australia", description: "Description for Australia", companyName: "Company in Australia" },
  { name: "Russia", description: "Description for Russia", companyName: "Company in Russia" },
  { name: "Morocco", description: "Description for Morocco", companyName: "Company in Morocco" },
  { name: "Madagascar", description: "Description for Madagascar", companyName: "Company in Madagascar" },
];

//Name and Pin Image of Selected Countries
document.addEventListener("DOMContentLoaded", function () {
  //Selected Active Country
  const fillColor = "#51abd7";
  activeCountries.forEach((countryName) => {
    // Select all paths for the country using class selector
    const paths = document.querySelectorAll(`svg path.${countryName.name}`);
    paths.forEach((path) => {
      // Fill each country path
      path.setAttribute("fill", fillColor);

      // Adding the country name and image of first path only
      if (path === paths[0]) {
        const bbox = path.getBBox();
        const x = bbox.x + bbox.width / 2;
        let y = bbox.y + bbox.height / 2;

        // Adjust y position for the text
        y -= 110;

        // Estimate the size of the background based on the text length
        const padding = 10; // Padding around the text
        const textLength = countryName.companyName.length;
        const fontSize = 16; // Assuming a font size of 16px for the text
        const rectWidth = textLength * fontSize * 0.6; // Estimate width based on text length and font size
        const rectHeight = fontSize * 1.5; // Height based on font size
        const borderRadius = 5; // Set the border radius

        // Create a new rect element for the background
        const rectElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rectElement.setAttribute("x", x - rectWidth / 2 - padding / 2); // Center the rect behind the text
        rectElement.setAttribute("y", y - rectHeight / 2 - padding / 2); // Adjust y position
        rectElement.setAttribute("width", rectWidth + padding); // Add padding to the width
        rectElement.setAttribute("height", rectHeight + padding); // Add padding to the height
        rectElement.setAttribute("fill", "white"); // Set background color to white
        rectElement.setAttribute("stroke", "#397796"); // Set outline color
        rectElement.setAttribute("stroke-width", "1"); // Set outline width
        rectElement.setAttribute("rx", borderRadius); // Set the x-axis radius for rounded corners
        rectElement.setAttribute("ry", borderRadius); // Set the y-axis radius for rounded corners

        // Append the rect element to the SVG before the text element
        path.parentNode.appendChild(rectElement);

        // Create a new text element
        const textElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        textElement.setAttribute("x", x);
        textElement.setAttribute("y", y);
        textElement.setAttribute("fill", "#397796"); // Set text color
        textElement.setAttribute("text-anchor", "middle"); // Center the text horizontally
        textElement.setAttribute("dominant-baseline", "central"); // Center the text vertically
        textElement.setAttribute("stroke", "#397796"); // Set outline color
        textElement.setAttribute("stroke-width", "1"); // Set outline width
        textElement.textContent = countryName.companyName; // Set the country name

        // Append the text element to the SVG
        path.parentNode.appendChild(textElement);

        // Adjust y for the image pin  to be below the text
        y += 15;

        // Create a new image element
        const imageElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "image"
        );
        imageElement.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "href",
          "images/pin_img.png"
        );
        imageElement.setAttribute("x", x - 15); // Adjust x to center the image, assuming image width is 30
        imageElement.setAttribute("y", y);
        imageElement.setAttribute("width", "30"); // Set image width
        imageElement.setAttribute("height", "90"); // Set image height

        // Append the image element to the SVG
        path.parentNode.appendChild(imageElement);
      }
    });
  });

  //Country name on Mouse hover
  document.querySelectorAll("svg path").forEach((path) => {
    path.addEventListener("mouseenter", function (e) {
      const countryName = path.id.replace(/-/g, " ");
      const countryDescription =
        activeCountries.find(
          (country) => country.name.replace(/ /g, "-") === path.id
        )?.description || "No description available";
      const popupText = countryName + ": " + countryDescription; // Concatenation with description
      const popup = document.getElementById("countryPopup");
      popup.innerText = popupText; // Set the country name and description in the popup
      popup.style.display = "block"; // Show the popup
      updatePopupPosition(e); // Position the popup at the mouse location
    });

    path.addEventListener("mousemove", updatePopupPosition); // Update position with mouse movement

    path.addEventListener("mouseleave", function () {
      document.getElementById("countryPopup").style.display = "none"; // Hide the popup
    });
  });

  function updatePopupPosition(e) {
    const popup = document.getElementById("countryPopup");
    const x = e.clientX;
    const y = e.clientY;
    popup.style.left = `${x + 10}px`; // Offset by 10px to not overlap the mouse pointer
    popup.style.top = `${y - 35}px`;
  }
});
