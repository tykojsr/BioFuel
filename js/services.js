function fetchServicesDataFromLocalStorage() {
	const servicesData = JSON.parse(
		sessionStorage.getItem("productsAndServicesData")
	);
	console.log(servicesData);
	return servicesData;
}

async function populateServiceContainer() {
	const serviceData = fetchServicesDataFromLocalStorage();

	const serviceCaption = document.getElementById("ourServiceCaption");
	serviceCaption.textContent = serviceData.servicesCaption;

	const serviceContainer = document.getElementById("serviceContainer");
	serviceContainer.innerHTML = "";

	serviceData.services.forEach((service, index) => {
		const serviceCard = document.createElement("div");
		serviceCard.classList.add("col-lg-4", "col-md-6", "wow", "zoomIn");
		serviceCard.dataset.wowDelay = "0.3s";

		const cardBody = document.createElement("div");
		cardBody.classList.add(
			"service-item",
			"bg-light",
			"rounded",
			"d-flex",
			"flex-column",
			"align-items-center",
			"justify-content-center",
			"text-center"
		);


const icon = document.createElement("img");
icon.src = "https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/external-Education-education-and-learning-itim2101-lineal-color-itim2101-3.png";
icon.alt = "Service Icon"; 

cardBody.appendChild(icon);

		const serviceLink = document.createElement("a");

		serviceLink.className = "btn btn-lg btn-primary rounded";
		//serviceLink.setAttribute("href", "./contact.html");
		const linkIcon = document.createElement("i");
		linkIcon.className = "bi bi-arrow-right";
		serviceLink.appendChild(linkIcon);

		cardBody.appendChild(serviceLink);

		const serviceTitle = document.createElement("h4");
		serviceTitle.classList.add("mb-3");
		serviceTitle.textContent = service.title;

		// const serviceDescription = document.createElement("p");
		// serviceDescription.classList.add("m-0");
		// serviceDescription.textContent = service.description;

		cardBody.appendChild(serviceTitle);
		// cardBody.appendChild(serviceDescription);

		serviceCard.appendChild(cardBody);

		serviceContainer.appendChild(serviceCard);

		serviceCard.addEventListener("click", function () {
			const userResponse = confirm("Do you wish to know more information?");
			if (userResponse) {
			  // Instead of navigating to a new page, open the modal
			  openModal(service.description);
			}
		  });

		  function openModal( description) {
			const modal = document.getElementById("serviceModal");
			const modalText = document.getElementById("modalText");
		  
			// Set modal content
			modalText.textContent = `${description}`;
		  
			// Display the modal
			modal.style.display = "flex";
		  }

		  const down = document.getElementById("down");
		  down.addEventListener("click", closeModal);
		  
		  // Function to close the modal
		  function closeModal() {
			const modal = document.getElementById("serviceModal");
			modal.style.display = "none";
		  }
})
}

populateServiceContainer();
