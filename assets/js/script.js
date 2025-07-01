var siteName = document.getElementById("site-name");
var siteUrl = document.getElementById("site-url");
var errorMsg = document.getElementById("error-msg");
var table_container = document.getElementById("table-container");

var sites = [];

(function () {
  loadFromLocalStorage();
  displayTable(sites);
})();

function onSubmitClicked() {
  var isEmpty = validateEmptyValue();
  var isNameValid = isValidSiteName(siteName);
  var isUrlValid = isValidSiteUrl(siteUrl);

  if (isEmpty) {
    errorMsg.innerHTML = "Please fill in both site name and URL.";
    return;
  }

  if (!isNameValid || !isUrlValid) {
    errorMsg.innerHTML = "Please enter a valid site name or a valid URL.";
    return;
  }
  errorMsg.innerHTML = "";

  var siteObj = {
    site_name: siteName.value,
    site_url: siteUrl.value,
  };
  sites.push(siteObj);
  storeToLocalStorage();
  displayTable(sites);

  siteName.value = "";
  siteUrl.value = "";

  //   siteName.classList.remove("is-valid", "is-invalid");
  //   siteUrl.classList.remove("is-valid", "is-invalid");
}
function displayTable(sites) {
  var tableBody = "";
  for (var i = 0; i < sites.length; i++) {
    tableBody += `<tr>
              <td class="fw-normal">${i + 1}</td>
              <td class="fw-normal ">
              <div class="d-flex align-items-center justify-content-center gap-2 ">
              <img src="https://www.google.com/s2/favicons?sz=32&domain_url=${
                sites[i].site_url
              }" width="20" height="20" alt="favicon">
                ${sites[i].site_name}
              </div>
              </td>
              <td class="fw-normal">
                <a href="${
                  sites[i].site_url
                }" target="_blank" class="btn btn-success">Visit</a>
              </td>
              <td class="fw-normal">
                <button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button>
              </td>
            </tr>`;
  }
  table_container.innerHTML = tableBody;
}
function deleteSite(i) {
  sites.splice(i, 1);
  storeToLocalStorage();
  displayTable(sites);
}
function loadFromLocalStorage() {
  storedSites = localStorage.getItem("allSites");
  sites = JSON.parse(storedSites) || [];
}
function storeToLocalStorage() {
  localStorage.setItem("allSites", JSON.stringify(sites));
}
function validateEmptyValue() {
  return siteName.value.trim() === "" || siteUrl.value.trim() === "";
}
function isValidSiteName(inputElement) {
  var value = inputElement.value.trim();
  var siteNameRegex = /^[A-Za-z\s]{3,}$/;
  var isValid = siteNameRegex.test(value);

  inputElement.classList.remove("is-valid", "is-invalid");
  if (value === "") return; // don't show anything if empty

  inputElement.classList.add(isValid ? "is-valid" : "is-invalid");
  return isValid;
}
function isValidSiteUrl(inputElement) {
  var value = inputElement.value.trim();
  var urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\S*)?$/;
  var isValid = urlRegex.test(value);

  inputElement.classList.remove("is-valid", "is-invalid");
  if (value === "") return;

  inputElement.classList.add(isValid ? "is-valid" : "is-invalid");
  return isValid;
}
