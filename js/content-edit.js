import {
	arrayRemove,
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import {
	ref,
	uploadBytesResumable,
	uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";
import {
    getDownloadURL,
    listAll,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";
import { firestore } from "../js/firebase-config.js";
import { storage } from "../js/firebase-config.js";

const totfdCollection = collection(firestore, "totfd");
const homepageDocRef = doc(totfdCollection, "Homepage");
const productsAndServicesDocRef = doc(totfdCollection, "ProductsAndServices");

const messageElement = document.getElementById("message");

const websiteContentForm = document.getElementById("website-content-form");
const webAppNameInput = document.getElementById("webAppName1");
const homePageWelcomeInput = document.getElementById("homePageWelcome");
const homePageCaptionInput = document.getElementById("homePageCaption");
const footerMessageInput = document.getElementById("footerMessageInput");
const webAppNameError = document.getElementById("webAppName-error");
const homePageWelcomeError = document.getElementById("homePageWelcome-error");
const homePageCaptionError = document.getElementById("homePageCaption-error");
const footerMessageError = document.getElementById("footerMessage-error");

websiteContentForm.addEventListener("submit", (e) => {
	e.preventDefault(); // Prevent the form from submitting and reloading the page

	// Reset error messages
	webAppNameError.style.display = "none";
	homePageWelcomeError.style.display = "none";
	homePageCaptionError.style.display = "none";
	footerMessageError.style.display = "none";

	// Capture user inputs
	const webAppName = webAppNameInput.value;
	const homePageWelcome = homePageWelcomeInput.value;
	const homePageCaption = homePageCaptionInput.value;
	const footerMessage = footerMessageInput.value;

	// Basic form validation
	let isValid = true;

	if (!webAppName) {
		webAppNameError.textContent = "Enter WebApp Name";
		webAppNameError.style.display = "block";
		isValid = false;
	}

	if (!homePageWelcome) {
		homePageWelcomeError.textContent = "Enter Home Page Welcome";
		homePageWelcomeError.style.display = "block";
		isValid = false;
	}

	if (!homePageCaption) {
		homePageCaptionError.textContent = "Enter Home Page Caption";
		homePageCaptionError.style.display = "block";
		isValid = false;
	}
	if (!footerMessage) {
		footerMessageError.textContent = "Enter Footer Message";
		console.log("a");
		footerMessageError.style.display = "block";
		isValid = false;
	}

	if (!isValid) {
		return;
	}

	const newData = {
		webAppName: webAppName,
		homePageWelcome: homePageWelcome,
		homePageCaption: homePageCaption,
		footerMessage: footerMessage,
	};
	updateDoc(homepageDocRef, newData)
		.then(() => {
			console.log("Data updated successfully!");
			messageElement.textContent =
				"Home Page Data updated successfully!Go to Home Page and Refresh to see the changes.";
			messageElement.style.color = "green";
			messageElement.style.display = "block";
			window.scrollTo(0, 0);
		})
		.catch((error) => {
			console.error("Error updating data: ", error);
			messageElement.textContent = "Error updating data. Please try again.";
			messageElement.style.color = "red";
			messageElement.style.display = "block";
			window.scrollTo(0, 0);
		});
});

const aboutUsCaptionInput = document.getElementById("aboutUsCaption");
const aboutUsCaptionInput2 = document.getElementById("aboutUsCaption2");
const aboutUsHeaderInput = document.getElementById("aboutUsHeader");
const aboutUsFooterInput = document.getElementById("aboutUsFooter");
const aboutUsPointsContainer = document.getElementById("aboutUsPoints");
const addAboutUsPointButton = document.getElementById("addAboutUsPoint");

async function checkToggleData() {
	getDoc(homepageDocRef).then((docSnapshot) => {
		if (docSnapshot.exists) {
			const data = docSnapshot.data();
			const isAboutUsSectionVisible = data.showAboutUsSection || false;
			const isProductSectionVisible = data.showProductSection || false;
			const isServiceSectionVisible = data.showServiceSection || false;

			document.getElementById("toggleAboutUs").checked =
				isAboutUsSectionVisible;
			document.getElementById("toggleService").checked =
				isServiceSectionVisible;
			document.getElementById("toggleProduct").checked =
				isProductSectionVisible;

			toggleAboutUsFormVisibility(isAboutUsSectionVisible);
			toggleProductFormVisibility(isProductSectionVisible);
			toggleServiceFormVisibility(isServiceSectionVisible);
		}
	});
}

checkToggleData();

document
	.getElementById("toggleAboutUs")
	.addEventListener("change", function () {
		const form = document.getElementById("aboutus-content-form");
		const isVisible = this.checked;
		form.style.display = isVisible ? "block" : "none";

		updateDoc(homepageDocRef, {
			showAboutUsSection: isVisible,
		});
	});

document
	.getElementById("toggleProduct")
	.addEventListener("change", function () {
		const form = document.getElementById("products-content-form");
		const isVisible = this.checked;
		form.style.display = isVisible ? "block" : "none";

		updateDoc(homepageDocRef, {
			showProductSection: isVisible,
		});
	});

document
	.getElementById("toggleService")
	.addEventListener("change", function () {
		const form = document.getElementById("service-content-form");
		const isVisible = this.checked;
		form.style.display = isVisible ? "block" : "none";

		updateDoc(homepageDocRef, {
			showServiceSection: isVisible,
		});
	});

function toggleAboutUsFormVisibility(isVisible) {
	const form = document.getElementById("aboutus-content-form");
	form.style.display = isVisible ? "block" : "none";
}
function toggleProductFormVisibility(isVisible) {
	const form = document.getElementById("products-content-form");
	form.style.display = isVisible ? "block" : "none";
}
function toggleServiceFormVisibility(isVisible) {
	const form = document.getElementById("service-content-form");
	form.style.display = isVisible ? "block" : "none";
}

toggleAboutUsFormVisibility();
toggleProductFormVisibility();
toggleServiceFormVisibility();

function saveAboutUsData() {
	const aboutUsData = collectFormData();

	updateDoc(homepageDocRef, aboutUsData)
		.then(() => {
			console.log("About Us data saved successfully!");
			console.log("Data updated successfully!");
			messageElement.textContent =
				"About Us Data updated successfully!Go to Home Page and Refresh to see the changes.";
			messageElement.style.color = "green";
			messageElement.style.display = "block";
			window.scrollTo(0, 0);
		})
		.catch((error) => {
			console.error("Error saving data: ", error);
			messageElement.textContent = "Error updating data. Please try again.";
			messageElement.style.color = "red";
			messageElement.style.display = "block";
			window.scrollTo(0, 0);
		});
}
function collectFormData() {
	const aboutUsData = {
		aboutUsCaption: aboutUsCaptionInput.value,
		aboutUsCaption2: aboutUsCaptionInput2.value,
		aboutUsHeader: aboutUsHeaderInput.value,
		aboutUsFooter: aboutUsFooterInput.value,
		aboutUsPoints: [], // Initialize with an empty array
	};
	const pointInputs = aboutUsPointsContainer.querySelectorAll(
		".about-us-point input[type='text']"
	);
	pointInputs.forEach((pointInput) => {
		const pointValue = pointInput.value.trim();
		if (pointValue !== "") {
			aboutUsData.aboutUsPoints.push(pointValue);
		}
	});

	return aboutUsData;
}

const aboutUsForm = document.getElementById("aboutus-content-form");
aboutUsForm.addEventListener("submit", function (e) {
	e.preventDefault();
	saveAboutUsData();
});

function populateAboutUsForm(docSnapshot) {
	if (docSnapshot.exists()) {
		const aboutUsData = docSnapshot.data();
		aboutUsCaptionInput.value = aboutUsData.aboutUsCaption || "";
		aboutUsCaptionInput2.value = aboutUsData.aboutUsCaption2 || "";
		aboutUsHeaderInput.value = aboutUsData.aboutUsHeader || "";
		aboutUsFooterInput.value = aboutUsData.aboutUsFooter || "";

		aboutUsData.aboutUsPoints.forEach((pointText) => {
			createPointDiv(pointText);
		});
	}
}
async function deletePointFromAboutUsDocRef(pointText) {
	try {
		const fieldValue = arrayRemove(pointText);
		await updateDoc(homepageDocRef, { aboutUsPoints: fieldValue });
		console.log("Point deleted from Firestore successfully!");
	} catch (error) {
		console.error("Error deleting point from Firestore: ", error);
	}
}

function createPointDiv(pointText) {
	const pointDiv = document.createElement("div");
	pointDiv.classList.add("about-us-point");
	pointDiv.innerHTML = `
    Point: <input type="text" class="form-control border border-primary" value="${pointText}" />
    <input type="button" class="btn btn-primary delete-point" value="Delete" />`;

	const deleteButton = pointDiv.querySelector(".delete-point");
	deleteButton.addEventListener("click", async () => {
		const pointText = pointDiv.querySelector("input[type='text']").value.trim();
		await deletePointFromAboutUsDocRef(pointText);
		pointDiv.remove();
		messageElement.textContent =
			"About Us Point Deleted successfully!Go to Home Page and Refresh to see the changes.";
		messageElement.style.color = "green";
		0;
		messageElement.style.display = "block";
		window.scrollTo(0, 0);
		console.log("Point deleted from UI successfully!");
	});

	aboutUsPointsContainer.appendChild(pointDiv);
}

addAboutUsPointButton.addEventListener("click", () => {
	const newPointDiv = document.createElement("div");
	newPointDiv.classList.add("about-us-point");
	const pointInput = document.createElement("input");
	pointInput.type = "text";
	pointInput.classList.add("form-control", "border", "border-primary");
	const deleteButton = document.createElement("input");
	deleteButton.type = "button";
	deleteButton.classList.add("btn", "btn-primary", "delete-point");
	deleteButton.value = "Delete";

	deleteButton.addEventListener("click", async () => {
		const pointText = newPointDiv
			.querySelector("input[type='text']")
			.value.trim();
		await deletePointFromAboutUsDocRef(pointText);
		aboutUsPointsContainer.removeChild(newPointDiv);
	});

	newPointDiv.appendChild(document.createTextNode("Point: "));
	newPointDiv.appendChild(pointInput);
	newPointDiv.appendChild(deleteButton);

	aboutUsPointsContainer.appendChild(newPointDiv);
});



const productsContentForm = document.getElementById("products-content-form");
const ourProductsCaption = document.getElementById("ourProductsCaption");
const ourProductsCaptionError = document.getElementById("ourProductsCaption-error");
const addProduct =  document.getElementById("addProduct");
const allOurProduct =  document.getElementById("allourProducts");
const allourProductsError = document.getElementById("allourProducts-error");
const saveData = document.getElementById("productSubmit");

addProduct.addEventListener("click" , async (e) => {
	e.preventDefault();
	const newProductDiv = document.createElement("div");
	newProductDiv.classList.add("products");

	const titleInput = document.createElement("input");
	titleInput.type = "text";
	titleInput.classList.add(
	"form-control",
	"border-2",
	"border",
	"border-primary"
	);
	titleInput.placeholder = "Product title";

	const descriptionInput = document.createElement("input");
	descriptionInput.type = "text";
	descriptionInput.classList.add(
	"form-control",
	"border-2",
	"border",
	"border-primary"
	);
    descriptionInput.placeholder = "Product description";

	const imagePreview = document.createElement("div");
	imagePreview.classList.add("image-preview");
	imagePreview.style.height = "3cm";
	imagePreview.style.width = "3cm";
	imagePreview.style.marginBottom = "10px";

	const imageInput = document.createElement("input");
	imageInput.type = "file";
	imageInput.classList.add(
		"form-control",
		"border-2",
		"border",
		"border-primary"
	);

	imageInput.addEventListener("change", (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			const imageUrl = event.target.result;
			const imageElement = document.createElement("img");
			imageElement.src = imageUrl;
			imageElement.classList.add("preview-image");
			imageElement.style.width = "100%";
			imageElement.style.height = "100%";
			imagePreview.innerHTML = "";
			imagePreview.appendChild(imageElement);
		};
		reader.readAsDataURL(file);
	});


	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.classList.add(
		"btn",
		"btn-primary",
		"delete-product",
		"red-button"
	);

	deleteButton.addEventListener("click", (e) => {
		e.preventDefault();
		const productTitle = titleInput.value;
		deleteProduct(newProductDiv, productTitle);
		e.stopPropagation();
	});




	newProductDiv.appendChild(document.createTextNode("Product Title: "));
	newProductDiv.appendChild(titleInput);
	newProductDiv.appendChild(document.createTextNode("Product Description: "));
	newProductDiv.appendChild(descriptionInput);
	newProductDiv.appendChild(document.createTextNode("Product Image: "));
	newProductDiv.appendChild(imagePreview);
	newProductDiv.appendChild(imageInput);

	const deleteButtonContainer = document.createElement("div");
	deleteButtonContainer.appendChild(deleteButton);
	newProductDiv.appendChild(deleteButtonContainer);
	allOurProduct.appendChild(newProductDiv);

});


  async function uploadImageToFirebaseStorage(imageFile) {
	const storageRef = ref(storage, "totfd/products/" + imageFile.name);
	try {
		await uploadBytes(storageRef, imageFile);
		const imageUrl = await getDownloadURL(storageRef);
		return imageUrl;
	} catch (error) {
		console.error("Error uploading image:", error);
		return null;
	}
}


saveData.addEventListener("click", (e) =>{
	e.preventDefault();
    saveProductsData();
});

async function saveProductsData() {
    const productData = await collectProductFormData();

    if (productData.products.length > 0) {
        try {
            // Fetch existing data from Firestore
            const existingData = await getDoc(productsAndServicesDocRef);
            const existingProducts = existingData.exists() ? existingData.data().products : [];

            // Identify new products by checking for duplicate titles
            const newProducts = productData.products.filter(newProduct => {
                return !existingProducts.some(existingProduct => existingProduct.title === newProduct.title);
            });

            // Merge existing data with new data (only new products)
            const mergedProducts = existingProducts.concat(newProducts);

            // Update the document with the combined data
            await updateDoc(productsAndServicesDocRef, { products: mergedProducts });

            console.log("Data saved successfully");
            messageElement.textContent =
                "Product Data updated successfully! Go to the Home Page and Refresh to see the changes.";
            messageElement.style.color = "green";
            messageElement.style.display = "block";
            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Error saving data: ", error);
            messageElement.textContent = "Error updating data. Please try again.";
            messageElement.style.color = "red";
            messageElement.style.display = "block";
            window.scrollTo(0, 0);
        }
    }
}


async function collectProductFormData() {
	console.log("1");
    const productsData = {
        productCaption: document.getElementById("ourProductsCaption").value,
        products: [],
    };

    const productElements = document.querySelectorAll(".products");

    await Promise.all(Array.from(productElements).map(async (productElement) => {
		console.log("3");
        const productTitleInput = productElement.querySelector("input[placeholder='Product title']");
        const productDescInput = productElement.querySelector("input[placeholder='Product description']");
        const imageInput = productElement.querySelector("input[type='file']");
        const imagePreview = productElement.querySelector(".image-preview");
        const imageUrl = productElement.querySelector(".preview-image")?.src || "";
		console.log("4");


        if (productDescInput !== null && productTitleInput !== null) {
			console.log("6");
            let imageUrl;

            if (imageInput.style.display !== "none" && imageInput.files[0]) {
                imageUrl = await uploadImageToFirebaseStorage(imageInput.files[0]);
            } else if (imageUrl) {
                imageUrl = imageUrl;
            }

            const product = {
                title: productTitleInput.value,
                description: productDescInput.value,
                imageUrl: imageUrl || "", // Default to an empty string if imageUrl is not defined
            };

            productsData.products.push(product);
			console.log(product)
        }
    }));

    return productsData;
}



// Function to fetch all product data from Firestore
async function getAllProductData() {
    try {
        const snapshot = await getDoc(productsAndServicesDocRef); // Replace 'your_collection_name' with the actual name of your Firestore collection
		const allData = snapshot.data();
		let productCaption = document.getElementById("ourProductsCaption");
        productCaption.value = allData.productCaption;

        return snapshot.data();
    } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
    }
}

// Function to display product data in the HTML
async function displayAllProducts() {
    const allProductData = await getAllProductData();
	const data = allProductData;
	const productData = allProductData ? allProductData.products : [];
	console.log(productData);
    const productsContainer = document.getElementById('allourProducts'); // Replace with your actual container ID
     
	

    // // Clear existing content in the container
    // productsContainer.innerHTML = '';

    // Iterate through the product data and create HTML elements for each product
    productData.forEach(product => {
        const newProductDiv = document.createElement("div");
        newProductDiv.classList.add("products");

        // const productDiv = document.createElement('div');
        // productDiv.classList.add('products', 
	    //  "py-2", "my-2"  );

        const titleElement = document.createElement('input');
		titleElement.type = "text";
		titleElement.classList.add(
		"form-control",
        "border-2",
	    "border",
	    "border-primary"
		);
		titleElement.placeholder = "Product title";
        titleElement.value = product.title;

        const descriptionElement = document.createElement('input');
		descriptionElement.type = "text";
		descriptionElement.classList.add(
			"form-control",
			"border-2",
			"border",
			"border-primary"
		);
		descriptionElement.placeholder = "Product description";
        descriptionElement.value = product.description;

	
        // Image Preview
        const imagePreviewDiv = document.createElement('div');
        imagePreviewDiv.classList.add('image-preview');
		imagePreviewDiv.style.height = "3cm";
	    imagePreviewDiv.style.width = "3cm";
	    imagePreviewDiv.style.marginBottom = "10px";
        if (product.imageUrl) {
            const imageElement = document.createElement('img');
            imageElement.src = product.imageUrl;
            imageElement.classList.add('preview-image');
            imageElement.style.width = '100%';
            imageElement.style.height = '100%';
            imagePreviewDiv.appendChild(imageElement);
        }

		const imageInput = document.createElement('input');
	    imageInput.type = "file";
	    imageInput.classList.add(
		"form-control",
		"border-2",
		"border",
		"border-primary"
	);


	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.classList.add(
		"btn",
		"btn-primary",
		"delete-product",
		"red-button"
	);

	deleteButton.addEventListener("click", (e) => {
		e.preventDefault();
		const productTitle = titleElement.value;
		console.log(productTitle);
		deleteProduct(newProductDiv, productTitle);
		e.stopPropagation();
	});



    newProductDiv.appendChild(document.createTextNode("Product Title: "));
	newProductDiv.appendChild(titleElement);
	newProductDiv.appendChild(document.createTextNode("Product Description: "));
	newProductDiv.appendChild(descriptionElement);
	newProductDiv.appendChild(document.createTextNode("Product Image: "));
	newProductDiv.appendChild(imagePreviewDiv);
	newProductDiv.appendChild(imageInput);

	const deleteButtonContainer = document.createElement("div");
	deleteButtonContainer.appendChild(deleteButton);
	newProductDiv.appendChild(deleteButtonContainer);
	

	productsContainer.appendChild(newProductDiv);
	


	// function createPointsAboutProduct(newProductDiv) {
	// 	const newProductPointsDiv = document.createElement("div");
	// 	newProductPointsDiv.classList.add("product");
	  
	// 	const productPoint = document.createElement("input");
	// 	productPoint.type = "text";
	// 	productPoint.placeholder = "Sample Product Point"; // You can set the content as needed
	// 	productPoint.classList.add("form-control", "border", "border-primary");

	// 	const deleteButton = document.createElement("input");
	//     deleteButton.type = "button";
	//     deleteButton.classList.add("btn", "btn-primary", "delete-point");
	//     deleteButton.value = "Delete";
	  
	// 	newProductPointsDiv.appendChild(productPoint);
	// 	newProductPointsDiv.appendChild(deleteButton);
	  
	// 	 newProductDiv.appendChild(newProductPointsDiv);
	// 	// productsContainer.appendChild(newProductDiv);
	//   }


      
		
    });

	
	  

}

async function deleteProduct(productDiv, productTitle) {
    try {
        // Get the current products data from Firestore
        const productsData = await getDoc(productsAndServicesDocRef);
        const currentProducts = productsData.exists() ? productsData.data().products : [];

        // Find the product in the array based on productTitle
        const productIndex = currentProducts.findIndex(product => product.title === productTitle);

        if (productIndex !== -1) {
            // Remove the product from the array
            currentProducts.splice(productIndex, 1);

            // Update the document in Firestore with the modified products array
            await updateDoc(productsAndServicesDocRef, { products: currentProducts });

            console.log("Product deleted from Firestore successfully!");
			messageElement.textContent =
			"Product Data deleted successfully! Go to the Home Page and Refresh to see the changes.";
		messageElement.style.color = "green";
		messageElement.style.display = "block";
		window.scrollTo(0, 0);
        } else {
            console.error("Product not found in Firestore.");
        }

        // Remove the productDiv from the HTML
        productDiv.remove();
    } catch (error) {
        console.error("Error deleting product from Firestore: ", error);
    }
}


// async function deletePointfromProductsPoints(productTitle, pointText) {
//     try {
//         // Fetch the document from Firestore
//         const productsData = await getDoc(productsAndServicesDocRef);
        
//         // Check if the document exists
//         if (productsData.exists()) {
//             // Find the product in the array based on productTitle
//             const productIndex = productsData.data().products.findIndex(product => product.title === productTitle);

//             if (productIndex !== -1) {
//                 // Remove the specific point from the product's points array
//                 const updatedPoints = productsData.data().products[productIndex].points.filter(point => point !== pointText);
                
//                 // Update the document in Firestore with the modified points array
//                 await updateDoc(productsAndServicesDocRef, {
//                     products: [
//                         ...productsData.data().products.slice(0, productIndex),
//                         {
//                             ...productsData.data().products[productIndex],
//                             points: updatedPoints
//                         },
//                         ...productsData.data().products.slice(productIndex + 1)
//                     ]
//                 });

//                 console.log(`Point "${pointText}" deleted successfully from product "${productTitle}".`);
//             } else {
//                 console.error(`Product "${productTitle}" not found in Firestore.`);
//             }
//         } else {
//             console.error("Document not found in Firestore.");
//         }
//     } catch (error) {
//         console.error("Error deleting point from Firestore: ", error);
//     }
// }


// Call the display function to populate the HTML
displayAllProducts();

















const serviceContentForm = document.getElementById("service-content-form");
const serviceCaptionInput = document.getElementById("ourServicesCaption");
const allOurServices = document.getElementById("allOurServices");
const addServiceButton = document.getElementById("addService");

function saveServicesData() {
	const ServicesData = collectServicesFormData();

	// Save the data to Firebase
	updateDoc(productsAndServicesDocRef, ServicesData)
		.then(() => {
			console.log("Services data saved successfully!");
			console.log("Data updated successfully!");
			messageElement.textContent =
				"Service Data updated successfully!Go to Home Page and Refresh to see the changes.";
			messageElement.style.color = "green";
			messageElement.style.display = "block";
			window.scrollTo(0, 0);
		})
		.catch((error) => {
			console.error("Error saving data: ", error);
			messageElement.textContent = "Error updating data. Please try again.";
			messageElement.style.color = "red";
			messageElement.style.display = "block";
			window.scrollTo(0, 0);
		});
}
function collectServicesFormData() {
	const servicesData = {
		servicesCaption: document.getElementById("ourServicesCaption").value,
		services: [], // Initialize with an empty array
	};
	var i = 0;
	const serviceElements = document.querySelectorAll(".service");
	serviceElements.forEach((serviceElement) => {
		const serviceTitleInput = serviceElement.querySelector(
			"input[placeholder='Service Title']"
		);
		const serviceDescInput = serviceElement.querySelector(
			"input[placeholder='Service Description']"
		);

		//console.log(serviceTitleInput);
		//console.log(serviceDescInput);
		const service = {
			title: serviceTitleInput.value,
			description: serviceDescInput.value,
		};

		servicesData.services.push(service);
	});
	return servicesData;
}

serviceContentForm.addEventListener("submit", function (e) {
	e.preventDefault();
	saveServicesData();
});

function populateServicesForm(docSnapshot) {
	if (docSnapshot.exists()) {
		const servicesData = docSnapshot.data();
		serviceCaptionInput.value = servicesData.servicesCaption || "";

		// Clear existing services
		allOurServices.innerHTML = "";

		servicesData.services.forEach((service) => {
			createServiceDiv(service.title, service.description);
			//console.log(service.title, service.description);
		});
	}
}

async function deleteServiceFromFirestore(title, description) {
	try {
		const serviceToRemove = {
			title: title,
			description: description,
		};
		await updateDoc(productsAndServicesDocRef, {
			services: arrayRemove(serviceToRemove),
		});

		console.log(
			"Service deleted from Firestore successfully!Go to Home Page and Refresh to see the changes."
		);
	} catch (error) {
		console.error("Error deleting service from Firestore: ", error);
	}
}

function createServiceDiv(title, description) {
	const serviceDiv = document.createElement("div");
	serviceDiv.classList.add("service");

	serviceDiv.innerHTML = `
	<p>Service Title: <input type="text" placeholder="Service Title" class="form-control border-2 border border-primary" value="${
		title || ""
	}" /></p>
	  Service Description: <input type="text" placeholder="Service Description" class="form-control border-2 border border-primary" value="${
			description || ""
		}" />
	  <input type="button" class="btn btn-primary delete-service" value="Delete" />
	`;

	//console.log(description);
	const deleteButton = serviceDiv.querySelector(".delete-service");
	deleteButton.addEventListener("click", async () => {
		const titleInput = serviceDiv.querySelector(
			"input[placeholder='Service Title']"
		);
		const descriptionInput = serviceDiv.querySelector(
			"input[placeholder='Service Description']"
		);
		//location.reload();
		//console.log(titleInput);
		//console.log(descriptionInput);
		await deleteServiceFromFirestore(titleInput.value, descriptionInput.value);
		serviceDiv.remove();
		messageElement.textContent =
			"Service Deleted successfully!Go to Home Page and Refresh to see the changes.";
		messageElement.style.color = "green";
		messageElement.style.display = "block";
		window.scrollTo(0, 0);
	});
	allOurServices.appendChild(serviceDiv);
}
// Add a click event listener to the button
addServiceButton.addEventListener("click", () => {
	// Create a new div for the service
	const newServiceDiv = document.createElement("div");
	newServiceDiv.classList.add("service");

	// Create input elements for the service title and description
	const titleInput = document.createElement("input");
	titleInput.type = "text";
	titleInput.classList.add(
		"form-control",
		"border-2",
		"border",
		"border-primary"
	);
	titleInput.placeholder = "Service Title";

	const descriptionInput = document.createElement("input");
	descriptionInput.type = "text";
	descriptionInput.classList.add(
		"form-control",
		"border-2",
		"border",
		"border-primary"
	);
	descriptionInput.placeholder = "Service Description";

	// Create a delete button
	const deleteButton = document.createElement("input");
	deleteButton.type = "button";
	deleteButton.classList.add(
		"btn",
		"btn-primary",
		"delete-service",
	);
	deleteButton.value = "Delete";

	const deleteButtonContainer = document.createElement("div");
	deleteButtonContainer.appendChild(deleteButton);

	// Add a click event listener to the delete button
	deleteButton.addEventListener("click", async () => {
		const titleInput = newServiceDiv
			.querySelector("input[placeholder='Service Title']")
			.value.trim();
		const descriptionInput = newServiceDiv
			.querySelector("input[placeholder='Service Description']")
			.value.trim();
		await deleteServiceFromFirestore(titleInput.value, descriptionInput.value);
		allOurServices.removeChild(newServiceDiv);
		messageElement.textContent =
			"Service Data Deleted successfully!Go to Home Page and Refresh to see the changes.";
		messageElement.style.color = "green";
		messageElement.style.display = "block";
		window.scrollTo(0, 0);
	});

	// Append the input elements and delete button to the service div
	newServiceDiv.appendChild(document.createTextNode("Service Title: "));
	newServiceDiv.appendChild(titleInput);
	newServiceDiv.appendChild(document.createTextNode("Service Description: "));
	newServiceDiv.appendChild(descriptionInput);
	newServiceDiv.appendChild(deleteButtonContainer);

	// Append the new service div to the container
	allOurServices.appendChild(newServiceDiv);
});




// const productContentForm = document.getElementById("products-content-form");
// const productCaptionInput = document.getElementById("ourProductsCaption");
// const allOurProducts = document.getElementById("allourProducts");
// const addProductsButton = document.getElementById("addProduct");

// function saveProductsData() {
// 	const ProductData = collectProductsFormData();

// 	// Save the data to Firebase
// 	updateDoc(productsAndServicesDocRef, ProductData)
// 		.then(() => {
// 			console.log(
// 				"Products data saved successfully!Go to Home Page and Refresh to see the changes."
// 			);
// 			console.log(ProductData);
// 			messageElement.textContent = "Product Data updated successfully!";
// 			messageElement.style.color = "green";
// 			messageElement.style.display = "block";
// 			window.scrollTo(0, 0);
// 		})
// 		.catch((error) => {
// 			console.error("Error saving data: ", error);
// 			messageElement.textContent = "Error updating data. Please try again.";
// 			messageElement.style.color = "red";
// 			messageElement.style.display = "block";
// 			window.scrollTo(0, 0);
// 		});
// }
// function collectProductsFormData() {
// 	const productsData = {
// 		productCaption: document.getElementById("ourProductsCaption").value,
// 		products: [], // Initialize with an empty array
// 	};
// 	const productElements = document.querySelectorAll(".product");
//   productElements.forEach((productElement) => {
//     const productTitleInput = productElement.querySelector("input[placeholder='Product Title']");
//     const productDescInput = productElement.querySelector("input[placeholder='Product Description']");
//     const productImageInput = productElement.querySelector("input[placeholder='Product Image']");
//     const productPointsInputs = productElement.querySelectorAll("input[placeholder='Product Point']");

//     const product = {
//       title: productTitleInput.value,
//       description: productDescInput.value,
//       image: productImageInput.value,
//       points: Array.from(productPointsInputs).map(pointInput => pointInput.value),
//     };

// 		productsData.products.push(product);
// 	});
// 	return productsData;
// }

// productContentForm.addEventListener("submit", function (e) {
// 	e.preventDefault(); // Prevent the default form submission
// 	saveProductsData(); // Call the function to save data
// });

// function populateProductsForm(docSnapshot) {
// 	if (docSnapshot.exists()) {
// 		const productData = docSnapshot.data();
// 		productCaptionInput.value = productData.productCaption || "";

// 		allOurProducts.innerHTML = "";
// 		if (productData.products && Array.isArray(productData.products)) {
// 			productData.products.forEach((product) => {
// 				createProductDiv(product.title, product.description);
// 			});
// 		}
// 	}
// }

// async function deleteProductFromFirestore(title, description) {
// 	try {
// 		const productToRemove = {
// 			title: title,
// 			description: description,
// 		};
// 		console.log(productToRemove);

// 		await updateDoc(productsAndServicesDocRef, {
// 			products: arrayRemove(productToRemove),
// 		});

// 		console.log(
// 			"Product deleted from Firestore successfully!Go to Home Page and Refresh to see the changes."
// 		);
// 	} catch (error) {
// 		console.error("Error deleting Product from Firestore: ", error);
// 	}
// }

// function createProductDiv(title, description, image, points) {
// 	const productDiv = document.createElement("div");
// 	productDiv.classList.add("product");
  
// 	productDiv.innerHTML = `
// 	  <p>Product Title: <input type="text" placeholder="Product Title" class="form-control border-2 border border-primary" value="${title || ""}" /></p>
// 	  <p>Product Description: <input type="text" placeholder="Product Description" class="form-control border-2 border border-primary" value="${description || ""}" /></p>
// 	  <p>Product Image: <input type="text" placeholder="Product Image" class="form-control border-2 border border-primary" value="${image || ""}" /></p>
// 	  <p>Product Points:</p>
// 	  <ul class="product-points"></ul>
// 	  <input type="button" class="btn btn-primary delete-product" value="Delete" />
// 	`;
  

// 	const deleteButton = productDiv.querySelector(".delete-product");
// 	deleteButton.addEventListener("click", async () => {
// 		const titleInput = productDiv.querySelector(
// 			"input[placeholder='Product Title']"
// 		);
// 		const descriptionInput = productDiv.querySelector(
// 			"input[placeholder='Product Description']"
// 		);
// 		//location.reload();
// 		console.log(titleInput);
// 		console.log(descriptionInput);
// 		await deleteProductFromFirestore(titleInput.value, descriptionInput.value);

// 		productDiv.remove();
// 		messageElement.textContent =
// 			"Product Deleted successfully!Go to Home Page and Refresh to see the changes.";
// 		messageElement.style.color = "green";
// 		messageElement.style.display = "block";
// 		window.scrollTo(0, 0);
// 	});

// 	const pointsList = productDiv.querySelector(".product-points");
// 	points.forEach(point => {
// 	  const li = document.createElement("li");
// 	  li.textContent = point;
// 	  pointsList.appendChild(li);
// 	});

// 	allOurProducts.appendChild(productDiv);
// }
// // Add a click event listener to the button
// addProductsButton.addEventListener("click", () => {
// 	// Create a new div for the service
// 	const newProductDiv = document.createElement("div");
// 	newProductDiv.classList.add("product");

// 	// Create input elements for the service title and description
// 	const titleInput = document.createElement("input");
// 	titleInput.type = "text";
// 	titleInput.classList.add(
// 		"form-control",
// 		"border-2",
// 		"border",
// 		"border-primary"
// 	);
// 	titleInput.placeholder = "Product Title";

// 	const descriptionInput = document.createElement("input");
// 	descriptionInput.type = "text";
// 	descriptionInput.classList.add(
// 		"form-control",
// 		"border-2",
// 		"border",
// 		"border-primary"
// 	);
// 	descriptionInput.placeholder = "Product Description";

// 	const imageInput = document.createElement("input");
// 	imageInput.type = "text";
// 	imageInput.classList.add("form-control", "border-2", "border", "border-primary");
// 	imageInput.placeholder = "Product Image";
  
// 	const pointsInput = document.createElement("input");
// 	pointsInput.type = "text";
// 	pointsInput.classList.add("form-control", "border-2", "border", "border-primary");
// 	pointsInput.placeholder = "Product Point";

// 	const addPointButton = document.createElement("button");
// 	addPointButton.textContent = "Add Point";
// 	addPointButton.addEventListener("click", () => {
// 	  const pointValue = pointsInput.value.trim();
// 	  if (pointValue !== "") {
// 		const li = document.createElement("li");
// 		li.textContent = pointValue;
// 		pointsList.appendChild(li);
// 		pointsInput.value = "";
// 	  }
// 	});

// 	// Create a delete button
// 	const deleteButton = document.createElement("input");
// 	deleteButton.type = "button";
// 	deleteButton.classList.add(
// 		"btn",
// 		"btn-primary",
// 		"delete-product",
// 		"red-button"
// 	);
// 	deleteButton.value = "Delete";

// 	// Add a click event listener to the delete button
// 	deleteButton.addEventListener("click", async () => {
// 		const titleInput = newProductDiv
// 			.querySelector("input[placeholder='Product Title']")
// 			.value.trim();
// 		const descriptionInput = newProductDiv
// 			.querySelector("input[placeholder='Product Description']")
// 			.value.trim();
// 		await deleteProductFromFirestore(titleInput.value, descriptionInput.value);
// 		allOurProducts.removeChild(newProductDiv);
// 		messageElement.textContent =
// 			"Product Data Deleted successfully!Go to Home Page and Refresh to see the changes.";
// 		messageElement.style.color = "green";
// 		messageElement.style.display = "block";
// 		window.scrollTo(0, 0);
// 	});

// 	newProductDiv.appendChild(document.createTextNode("Product Title: "));
// 	newProductDiv.appendChild(titleInput);
// 	newProductDiv.appendChild(document.createTextNode("Product Description: "));
// 	newProductDiv.appendChild(descriptionInput);
// 	newProductDiv.appendChild(document.createTextNode("Product Image: "));
// 	newProductDiv.appendChild(imageInput);
// 	newProductDiv.appendChild(document.createTextNode("Product Points: "));
// 	newProductDiv.appendChild(pointsInput);
// 	newProductDiv.appendChild(addPointButton);
// 	newProductDiv.appendChild(deleteButton);

// 	allOurProducts.appendChild(newProductDiv);
// });

function populateFormFields() {
	getDoc(homepageDocRef)
		.then((docSnapshot) => {
			if (docSnapshot.exists()) {
				const data = docSnapshot.data();
				webAppNameInput.value = data.webAppName || "";
				homePageWelcomeInput.value = data.homePageWelcome || "";
				homePageCaptionInput.value = data.homePageCaption || "";
				footerMessageInput.value = data.footerMessage || "";
				populateAboutUsForm(docSnapshot);
			}
		})
		.catch((error) => {
			console.error("Error retrieving data: ", error);
		});
	getDoc(productsAndServicesDocRef)
		.then((docSnapshot) => {
			if (docSnapshot.exists()) {
				populateServicesForm(docSnapshot);
				//populateProductsForm(docSnapshot);
			}
		})
		.catch((error) => {
			console.error("Error retrieving services data: ", error);
		});
}

var fontFamilyDropdown = document.getElementById("fontFamily");
fontFamilyDropdown.addEventListener("change", function () {
	var selectedFont = fontFamilyDropdown.value;
	var fontPreview = document.getElementById("fontPreview");
	fontPreview.style.fontFamily = selectedFont;
});

const applyButton = document.getElementById("applyButton");
const fontFamilyError = document.getElementById("fontFamily-error");

applyButton.addEventListener("click", async (event) => {
	event.preventDefault();
	event.stopPropagation();

	const selectedFont = document.getElementById("fontFamily").value;
	const selectedFontSize = document.getElementById("fontSize").value;

	if (!selectedFont) {
		fontFamilyError.style.display = "block";
		return;
	} else {
		fontFamilyError.style.display = "none";
	}

	try {
		await updateDoc(homepageDocRef, {
			font: selectedFont,
			fontSize: selectedFontSize || null,
		});
		messageElement.textContent =
			"Font Applied successfully, Go to Home Page and Refresh to see the changes.";
		messageElement.style.color = "green";
		messageElement.style.display = "block";
		console.log("Font updated successfully in Firebase.");
		window.scrollTo(0, 0);
	} catch (error) {
		console.error("Error updating font and preview in Firebase:", error);
	}
});

document.addEventListener("DOMContentLoaded", async function () {
	try {
		populateFormFields();
		try {
			const doc = await getDoc(homepageDocRef);
			const font = doc.data().font;
			const fontSize = doc.data().fontSize;

			if (font) {
				document.getElementById("fontFamily").value = font;
			}

			if (fontSize) {
				document.getElementById("fontSize").value = fontSize;
			}
		} catch (error) {
			console.error("Error getting font details from the database:", error);
		}
	} catch (error) {
		console.error("Error:", error);
	}
});
