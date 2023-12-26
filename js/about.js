function getHomepageDataFromSessionStorage() {
	const HomePagedata = sessionStorage.getItem("homepageData");
	return JSON.parse(HomePagedata);
}

async function populatePage() {
	const HomePagedata = getHomepageDataFromSessionStorage();

	if (HomePagedata && HomePagedata.aboutUsCaption) {
		const aboutUsCaption = document.getElementById("aboutUsCaption");
		aboutUsCaption.textContent = HomePagedata.aboutUsCaption;
	}

	if (HomePagedata && HomePagedata.aboutUsCaption2) {
		const aboutUsCaption2 = document.getElementById("aboutUsCaption2");
		aboutUsCaption2.textContent = HomePagedata.aboutUsCaption2;
	}

	if (HomePagedata && HomePagedata.aboutUsHeader) {
		const aboutUsHeader = document.getElementById("aboutUsHeader");
		aboutUsHeader.textContent = HomePagedata.aboutUsHeader;
	}

	if (HomePagedata && HomePagedata.aboutUsFooter) {
		const aboutUsFooter = document.getElementById("aboutUsFooter");
		aboutUsFooter.textContent = HomePagedata.aboutUsFooter;
	}
	const aboutUsImage = document.getElementById("aboutUsImage");
	const aboutUsPageImageUrl = HomePagedata.aboutUsPageimageurl;

	if (aboutUsPageImageUrl) {
		aboutUsImage.src = aboutUsPageImageUrl;
	} else {
		aboutUsImage.style.display = "none";
	}

	if (HomePagedata && HomePagedata.aboutUsPoints && Array.isArray(HomePagedata.aboutUsPoints)) {
		const aboutUsPoints = document.getElementById("aboutUsPoints");
		if (aboutUsPoints) {
			HomePagedata.aboutUsPoints.forEach((point, index) => {
				const col = document.createElement("div");
				col.className = "col-12 wow zoomIn";
				col.setAttribute("data-wow-delay", 0.2 * (index + 1) + "s");
	
				const pointElement = document.createElement("div"); // Use a div instead of h5
				pointElement.className = "mb-3 d-flex align-items-start"; // Add d-flex and align-items-start classes
	
				// Add the icon to the pointElement using addIconToElement function
				addIconToElement(pointElement)
					.then((message) => {
						// Icon added successfully
					})
					.catch((error) => {
						console.error(error);
					});
	
				const textContainer = document.createElement("div");
				textContainer.style.flexGrow = 1; // Make textContainer take up remaining space
				textContainer.textContent = point;
	
				pointElement.appendChild(textContainer);
				col.appendChild(pointElement);
				aboutUsPoints.appendChild(col);
			});
		}
	}
}
const addIconToElement = (pointElement) => {
	return new Promise((resolve, reject) => {
		const icon = document.createElement("i");
		icon.classList.add("fas", "fa-check", "text-primary", "me-3");

		icon.style.marginTop = "auto"; // Align the icon to the middle vertically
        icon.style.marginBottom = "auto"; 

		setTimeout(() => {
			pointElement.insertBefore(icon, pointElement.firstChild);
			resolve("Icon successfully appended to pointElement");
		}, 1000);
	});
};

populatePage();

const teamContainer = document.getElementById("teamContainer");
const TeamSection = document.getElementById("TeamSection");
function populateFoundersTable() {
	const foundersData = JSON.parse(sessionStorage.getItem("foundersData"));

	if (foundersData) {
		foundersData.forEach((founder, index) => {
			const colDelay = (index + 1) * 0.3;
			const colElement = document.createElement("div");
			colElement.classList.add("col-12", "wow", "slideInUp");
			colElement.setAttribute("data-wow-delay", `${colDelay}s`);

			const teamItem = document.createElement("div");
			teamItem.classList.add(
				"team-item",
				"bg-light",
				"rounded",
				"overflow-hidden"
			);

			const teamImg = document.createElement("div");
			teamImg.classList.add("team-img", "position-relative", "overflow-hidden", "d-flex", "justify-content-center", "align-items-center");

			const imgElement = document.createElement("img");
			imgElement.classList.add("img-fluid", "w-100");
			imgElement.style.maxWidth = "250px"; // Adjust this value as needed
            imgElement.style.height = "auto";
			imgElement.src = founder.picUrl;
			imgElement.alt = founder.founderName;
			teamImg.appendChild(imgElement);

			const teamSocial = document.createElement("div");
			teamSocial.classList.add("team-social");
			teamSocial.style.display = "none";

			const socialIcons = [
				"fa fa-globe",
				"fab fa-facebook-f",
				"fab fa-instagram",
				"fab fa-linkedin-in",
			];

			socialIcons.forEach((iconClass) => {
				const icon = document.createElement("i");
				icon.setAttribute(
					"class",
					`btn btn-lg btn-primary btn-lg-square rounded ${iconClass} fw-normal`
				);
				teamSocial.appendChild(icon);
			});

			teamImg.appendChild(teamSocial);
			teamItem.appendChild(teamImg);
			teamImg.addEventListener("mouseover", () => {
				teamSocial.style.display = "none";
			});

			teamImg.addEventListener("mouseout", () => {
				teamSocial.style.display = "none";
			});

			const textCenter = document.createElement("div");
			textCenter.classList.add("text-center", "py-4");

			const nameElement = document.createElement("h4");
			nameElement.classList.add("text-primary");
			nameElement.textContent = founder.founderName;
			textCenter.appendChild(nameElement);

			const designationElement = document.createElement("p");
			designationElement.classList.add("text-uppercase", "m-0");
			designationElement.textContent = founder.founderDesignation;
			textCenter.appendChild(designationElement);

			const descriptionElement = document.createElement("p");
			descriptionElement.classList.add("text-muted", "mt-3");
			descriptionElement.textContent = founder.founderDescription;
			textCenter.appendChild(descriptionElement);

			const descriptionContainer = document.createElement("div");
			descriptionContainer.classList.add("row");
			const descriptionCol = document.createElement("div");
			descriptionCol.classList.add("col-12");
			descriptionContainer.appendChild(descriptionCol);

			teamItem.appendChild(textCenter);
			teamItem.appendChild(descriptionContainer);
			colElement.appendChild(teamItem);
			teamContainer.appendChild(colElement);
		});
		TeamSection.style.display = "block";
	} else {
		console.log("No founders data present in session storage");
	}
}

populateFoundersTable();
