const contactInput = document.querySelector(".contact-input");
const contactButton = document.querySelector(".contact-button");
const contactList = document.querySelector(".contact-list");
const filterOption = document.querySelector(".filter-contact");

document.addEventListener("DOMContentLoaded", getContacts);
contactButton.addEventListener("click", addContact);
contactList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterContact);

function addContact(event) {
    event.preventDefault();
    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact");
    const newContact = document.createElement("li");
    newContact.innerText = contactInput.value;
    newContact.classList.add("contact-item");
    contactDiv.appendChild(newContact);

    saveLocalContacts(contactInput.value);
    
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    contactDiv.appendChild(completeButton);
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    contactDiv.appendChild(trashButton);
    contactList.appendChild(contactDiv);
    contactInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        const contact = item.parentElement;
        contact.classList.add("fall");
        removeLocalContacts(contact);
        contact.addEventListener("transitionend", function () {
            contact.remove();   
        });
    }

    if (item.classList[0] === "complete-btn") {
        const contact = item.parentElement;
        contact.classList.toggle("completed");
    }
}

function filterContact(e) {
    const contacts = contactList.childNodes;
    contacts.forEach(function (contact) {
        switch (e.target.value) {
            case "all":
                contact.style.display = "flex";
                break;
            case "completed":
                if (contact.classList.contains("completed")) {
                    contact.style.display = "flex";
                } else {
                    contact.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!contact.classList.contains("completed")) {
                    contact.style.display = "flex";
                } else {
                    contact.style.display = "none";
                }
                break;
        } 

    });
}

function saveLocalContacts(contact) {
    let contacts;
    if (localStorage.getItem("contacts") === null) {
        contacts = [];
    } else {
        contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function getContacts(){
    let contacts;
    if (localStorage.getItem("contacts") === null) {
        contacts = [];
    } else {
        contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    contacts.forEach(function(contact) {
    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact");
    const newContact = document.createElement("li");
    newContact.innerText = contact;
    newContact.classList.add("contact-item");
    contactDiv.appendChild(newContact);
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    contactDiv.appendChild(completeButton);
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    contactDiv.appendChild(trashButton);
    contactList.appendChild(contactDiv);
    });
}

function removeLocalContacts(contact) {
    let contacts;
    if (localStorage.getItem("contacts") === null) {
        contacts = [];
    } else {
        contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    const contactIndex = contact.children[0].innerText;
    contacts.splice(contacts.indexOf(contactIndex), 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}