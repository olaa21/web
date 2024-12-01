document.addEventListener("DOMContentLoaded", () => {
    // Fetch the CSV file
    fetch("content.csv")
        .then(response => response.text())
        .then(data => {
            // Parse the CSV
            const rows = data.split("\n").map(row => row.split(","));
            const headers = rows.shift(); // Extract the header row

            // Map CSV rows to objects
            const content = rows.map(row => {
                return headers.reduce((acc, header, i) => {
                    acc[header.trim()] = row[i]?.trim();
                    return acc;
                }, {});
            });

            // Update the page with content
            if (content.length > 0) {
                // Set title and description
                document.getElementById("page-title").textContent = content[0].title;
                document.getElementById("page-description").textContent = content[0].description;

                // Populate the gallery
                const gallery = document.getElementById("gallery");
                content.forEach(item => {
                    const figure = document.createElement("figure");
                    figure.innerHTML = `
                        <img src="${item.src}" alt="${item.alt}" onclick="openLightbox('${item.src}', '${item.caption}', '${item.detail}')">
                        <figcaption>${item.caption}</figcaption>
                    `;
                    gallery.appendChild(figure);
                });
            }
        })
        .catch(error => console.error("Error loading CSV:", error));
});

// Function to handle lightbox (example only)
function openLightbox(src, caption, detail) {
    alert(`Image: ${src}\nCaption: ${caption}\nDetail: ${detail}`);
}
