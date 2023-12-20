import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

import { firestore } from "../js/firebase-config.js";

const totfd = collection(firestore, "totfd");
const notificationsRef = doc(totfd, "notifications");

var notificationErrorElement = document.getElementById("notificationError");
var saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", function () {
	var notificationTextElement = document.getElementById("notificationText");
	var notificationText = notificationTextElement.value;

	if (notificationText.trim() === "") {
		notificationErrorElement.style.display = "block";
	} else {
		notificationErrorElement.style.display = "none";
		saveNotification(notificationText);
	}
});

async function saveNotification(notificationText) {
	const docSnap = await getDoc(notificationsRef);

	if (docSnap.exists()) {
		await updateDoc(notificationsRef, {
			notifications: arrayUnion(notificationText),
		});
		displayMessage("Notification Added Successfully");
		document.getElementById("notificationText").value = "";
	} else {
		await setDoc(notificationsRef, {
			notifications: [notificationText],
		});
		displayMessage("Notification Added Successfully");
		populateTable();
		document.getElementById("notificationText").value = "";
	}
}

function displayMessage(message) {
	const messageElement = document.getElementById("message");
	messageElement.textContent = message;
	messageElement.style.display = "block";
}

async function populateTable() {
	const notificationsRef = doc(totfd, "notifications");
	const docSnap = await getDoc(notificationsRef);
	var tableBody = document.getElementById("notificationsBody");
	tableBody.innerHTML = "";

	if (docSnap.exists()) {
		var notifications = docSnap.data().notifications;

		notifications.forEach(function (notification, index) {
			var newRow = tableBody.insertRow(tableBody.rows.length);
			var cell1 = newRow.insertCell(0);
			var cell2 = newRow.insertCell(1);

			cell1.innerHTML = notification;
			cell2.innerHTML =
				'<button data-index="' +
				index +
				'" class="editButton" style="background-color: blue; color: white; margin-right: 10px;">Edit</button>' +
				'<button data-index="' +
				index +
				'" class="deleteButton" style="background-color: red; color: white; ">Delete</button>';
		});
	}

	document.querySelectorAll(".editButton").forEach(function (button) {
		button.addEventListener("click", function () {
			openEditModal(parseInt(this.getAttribute("data-index")), notifications);
		});
	});

	document.querySelectorAll(".deleteButton").forEach(function (button) {
		button.addEventListener("click", function () {
			var index = parseInt(this.getAttribute("data-index"));
			confirmDelete(index);
		});
	});
}

function confirmDelete(index) {
	var confirmation = confirm(
		"Are you sure you want to delete this notification?"
	);
	if (confirmation) {
		deleteNotification(index);
	}
}

function deleteNotification(index) {
	const notificationsRef = doc(totfd, "notifications");

	getDoc(notificationsRef).then((docSnap) => {
		if (docSnap.exists()) {
			var notifications = docSnap.data().notifications;
			notifications.splice(index, 1);
			updateDoc(notificationsRef, { notifications: notifications }).then(() => {
				populateTable();
			});
			displayMessage("Notification Deleted Successfully");
		}
	});
}

function openEditModal(index, notifications) {
	const notificationToEdit = notifications[index];

	document.getElementById("editNotification").value = notificationToEdit;

	$("#editModal").modal("show");
	document.getElementById("submitEdit").addEventListener("click", function () {
		const updatedNotification =
			document.getElementById("editNotification").value;

		notifications[index] = updatedNotification;

		updateDoc(notificationsRef, { notifications: notifications }).then(() => {
			$("#editModal").modal("hide");
			populateTable();
		});
		displayMessage("Notification Updated Successfully");
	});

	document
		.getElementById("closeModalButton1")
		.addEventListener("click", function () {
			$("#editModal").modal("hide");
		});

	document
		.getElementById("closeModalButton2")
		.addEventListener("click", function () {
			$("#editModal").modal("hide");
		});
}

var table = document.getElementById("notificationsBody");
table.style.border = "2px solid #3498db";
table.style.boxShadow = "0 0 10px rgba(0, 0, 255, 0.3)";

document.addEventListener("DOMContentLoaded", async function () {
	populateTable();
})