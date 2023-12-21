function fetchProductsDataFromLocalStorage() {
    const productsData = JSON.parse(sessionStorage.getItem("productsAndServicesData"));
    return productsData;
}

async function populateProductsContainer() {
    const productsData = fetchProductsDataFromLocalStorage();
    console.log(productsData);
    console.log(productsData.productCaption);
   

    if (!productsData || !productsData.products) {
        console.log("No product data available.");
        return;
    }

    const productsCaption = document.getElementById("ourProductsCaption");
    productsCaption.textContent = productsData.productCaption;

    const allProductContainer = document.getElementById("productContainer");
    //allProductContainer.innerHTML = "";

    productsData.products.forEach((product, index) => {
        console.log(product.points);
        const productBox = document.createElement("div");
        productBox.classList.add("container-fluid", "wow", "py-5", "fadeInUp", "product-border");
        productBox.dataset.wowDelay = `${0.3 * (index + 1)}s`;

        const productContainer = document.createElement("div");
        productContainer.classList.add("container", "py-2");

        const productRow = document.createElement("div");
        productRow.classList.add("row", "g-5");

        const productColumn = document.createElement("div");
        productColumn.classList.add("col-lg-7");

        const productTitle = document.createElement("h4");
        productTitle.classList.add("fw-bold", "text-primary", "text-uppercase");
        productTitle.textContent = product.title;

        const productDesp = document.createElement("p");
        productDesp.classList.add("font-weight-bold");
        productDesp.textContent = product.description;
        productTitle.style.overflow = "hidden";

        // ... (existing code)

// ... (existing code)

// const pointsDiv = document.createElement("div");
// pointsDiv.style.display = "flex";
// pointsDiv.style.flexWrap = "wrap"; // Allow points to wrap to the next line
// pointsDiv.style.wordBreak = "break-word"; // Allow breaking words to wrap onto the next line

// product.points.forEach(pointext => {
//     const icon = document.createElement("img");
//     icon.src = "https://img.icons8.com/bubbles/50/gas-station.png";
//     icon.alt = "gas-station";
    
//     const pointStart = document.createElement("div");
//     pointStart.style.display = "flex";
//     pointStart.style.alignItems = "flex-start";
//     pointStart.style.width = "100%"; // Set width to 100%
//     const points = document.createElement("p");
//     points.textContent = pointext;
//     points.style.margin = "0";

//     const pointContainer = document.createElement("div");
//     pointContainer.style.display = "flex";
//     pointContainer.style.alignItems = "center";
//     pointContainer.appendChild(icon);
//     pointStart.appendChild(points);
//     pointContainer.appendChild(pointStart);

//     pointsDiv.appendChild(pointContainer);
// });


        productColumn.appendChild(productTitle);
        productColumn.appendChild(productDesp);
        // productColumn.appendChild(pointsDiv);

        productRow.appendChild(productColumn);

        productContainer.appendChild(productRow);
        productBox.appendChild(productContainer);
        allProductContainer.appendChild(productBox);


        const imageColumn = document.createElement("div");
        imageColumn.classList.add("col-lg-5");

        const imageBox = document.createElement("div");
        imageBox.classList.add("position-relative", "w-100", "h-100");

        const image = document.createElement("img");
        image.src = product.imageUrl;
        image.style.maxWidth = "100%";
        image.style.height = "100%";
        image.style.padding = "0 10px 10px 10px";
        image.style.borderRadius = "10px";
        image.alt = "image";
        imageBox.appendChild(image);
        imageColumn.appendChild(imageBox);
        productRow.appendChild(imageColumn);

        productContainer.appendChild(productRow);
        productBox.appendChild(productContainer);
        allProductContainer.appendChild(productBox);

        });



    //     const cardBody = document.createElement("div");
    //     cardBody.classList.add("product-item", "bg-light", "rounded", "d-flex", "flex-column", "align-items-center", "justify-content-center", "text-center");

    //     // Product Icon
    //     const productIcon = document.createElement("div");
    //     productIcon.className = "product-icon";
	// 				const icon = document.createElement("i");
	// 				icon.className = product.icon;
	// 				icon.classList.add("text-white");
	// 				icon.textContent = product.title.charAt(0);
	// 				icon.style.fontSize = "24px";
	// 				icon.style.fontWeight = "bold";
	// 				productIcon.appendChild(icon);

    //     cardBody.appendChild(productIcon);

    //     // Product Title
    //     const productTitle1 = document.createElement("h4");
    //     productTitle.classList.add("mb-3");
    //     productTitle.textContent = product.title;

    //     cardBody.appendChild(productTitle);

    //     // Product Description
    //     const productDescription = document.createElement("p");
    //     productDescription.classList.add("m-0");
    //     productDescription.textContent = product.description;

    //     cardBody.appendChild(productDescription);

    //     // Product Link (hidden by default)
    //     const productLink = document.createElement("a");
    //     productLink.className = "btn btn-lg btn-primary rounded";
    //     productLink.setAttribute("href", "./contact.html");
    //     const linkIcon = document.createElement("i");
    //     linkIcon.className = "bi bi-arrow-right";
    //     productLink.appendChild(linkIcon);
    //     productLink.style.display = "none"; // Hide the link by default

    //     cardBody.appendChild(productLink);

    //     // Add event listeners for hover behavior
    //     cardBody.addEventListener("mouseenter", function () {
    //         productLink.style.display = "block";
    //     });

    //     cardBody.addEventListener("mouseleave", function () {
    //         productLink.style.display = "none";
    //     });

    //     productCard.appendChild(cardBody);

    //     productContainer.appendChild(productCard);
    // });
}

populateProductsContainer();
new WOW().init();
