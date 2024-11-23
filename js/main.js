var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var siteNamePattern = /^([a-zA-Z0-9]{2,}[ _-]?[a-zA-Z0-9]{1,})$/;
var siteUrlPattern = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(\/[^\s]*)?$/;

var count = 0;
var bookMarkList = [];

if (localStorage.getItem("bookMarkContainer")) {
  bookMarkList = JSON.parse(localStorage.getItem("bookMarkContainer"));
  displayBookMark();
}
function addtData() {
  siteNameInput.value = siteNameInput.value.trim();
  siteUrlInput.value = siteUrlInput.value.trim();

  if (siteNamePattern.test(siteNameInput.value) && siteUrlPattern.test(siteUrlInput.value)) {
    for (var i = 0; i < bookMarkList.length; i++) {
      if (siteNameInput.value === bookMarkList[i].siteName) {
        count++;
      }
    }
    if (count === 0) {
      var bookMark = {
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value,
      };
      bookMarkList.push(bookMark);
      localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkList));
      displayBookMark();
      clearData();
    } else {
      document.getElementById("popupWindow").classList.remove("d-none");
      count = 0;
    }
  } else document.getElementById("popupWindow").classList.remove("d-none");
}
function closePopup() {
  document.getElementById("popupWindow").classList.add("d-none");
}
function clearData() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}
function displayBookMark() {
  var cartona = "";
  for (var i = 0; i < bookMarkList.length; i++) {
    cartona += `
           <tr>
                <td>${i + 1}</td>
                <td>${bookMarkList[i].siteName}</td>
                <td><a href="https://${
                  bookMarkList[i].siteUrl
                }" target="_blank"><button class="visit-btn"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                <td><button onclick="deleteBookMark(${i})" class="delete-btn"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
        `;
  }
  document.getElementById("tBody").innerHTML = cartona;
}
function deleteBookMark(index) {
  bookMarkList.splice(index, 1);
  displayBookMark();
  localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkList));
}
function siteNameValidation() {
  var term = siteNameInput.value;
  if (siteNamePattern.test(term)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
  }
}
function siteUrlValidation() {
  var term = siteUrlInput.value;
  if (siteUrlPattern.test(term)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
  }
}
