var btnClickChangeColor = document.getElementById("submitButton");

btnClickChangeColor.addEventListener("mousedown", function (e) {
  btnClickChangeColor.classList.add("changeBgAndColor");
});

btnClickChangeColor.addEventListener("mouseup", function (s) {
  btnClickChangeColor.classList.remove("changeBgAndColor");
});

// --------------------------------------------------------------------------------------------------------
var bookmarkName = document.getElementById("siteName");
var bookmarkURL = document.getElementById("siteURL");

var NameAndURLArr = [];

NameAndURLArr = JSON.parse(localStorage.getItem("NameAndUrl")) || [];
display();
// ---------------------------------------------------- Collect Values Function ----------------------------------------------------
var nameRegex = /[a-z]{3,}/;
var urlRegex = /^(http:\/\/|https:\/\/)[a-z]{3,100}(.com)$/;

// Check if input is Valid or not

var form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  var NameAndURLBox = {
    siteName: bookmarkName.value,
    siteURL: bookmarkURL.value,
  };
  e.preventDefault();
  if (nameRegex.test(bookmarkName.value) == false) {
    alert("Please enter a valid site name with at least 3 characters.");
  }
  if (urlRegex.test(bookmarkURL.value) == false) {
    alert(
      "Please enter a valid URL starting with http:// or https:// followed by a valid domain."
    );
  }
  if (
    nameRegex.test(bookmarkName.value) == true &&
    urlRegex.test(bookmarkURL.value) == true
  ) {
    NameAndURLArr.unshift(NameAndURLBox);
    localStorage.setItem("NameAndUrl", JSON.stringify(NameAndURLArr));
    display();
    clear();
  }
});

function clear() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
  bookmarkName.style.boxShadow = "";
  bookmarkURL.style.boxShadow = "";
  bookmarkName.style.borderColor = "";
  bookmarkURL.style.borderColor = "";
}

// ---------------------------------------------------- Display Function ----------------------------------------------------

function display() {
  console.log(NameAndURLArr);
  var trRow = "";
  for (var i = 0; i < NameAndURLArr.length; i++) {
    trRow += `<tr>
          <td class = "td-center">${i + 1}</td>
          <td class = "td-center">${NameAndURLArr[i].siteName}</td>
          <td class = "td-center">
            <a href="${
              NameAndURLArr[i].siteURL
            }" target = "_blank"><button class="btn text-white visit btn-outline-success btn-click" id="btn-click"><i class="fa-regular fa-eye"></i> Visit </button></a>
          </td>
          <td class = "td-center">
            <button class="btn text-white delete btn-danger btn-click" onclick = "deleteItem(${i})">
              <i class="fa-regular fa-trash-can"></i> Delete
            </button>
          </td>
        </tr>`;
  }
  document.getElementById("tableContainer").innerHTML = trRow;
}

// ---------------------------------------------------- Delete Function ----------------------------------------------------
function deleteItem(index) {
  NameAndURLArr.splice(index, 1);
  localStorage.setItem("NameAndUrl", JSON.stringify(NameAndURLArr));
  display();
}

bookmarkName.addEventListener("input", function () {
  if (nameRegex.test(bookmarkName.value)) {
    bookmarkName.style.boxShadow =
      "rgba(0, 255, 123, 0.25) 0px 0px 0px 0.25rem";
    bookmarkName.style.borderColor = "rgb(0, 255, 123)";
  } else {
    bookmarkName.style.boxShadow = "0 0 0 .25rem rgb(253 13 162 / 25%)";
    bookmarkName.style.borderColor = "rgb(227 138 147)";
  }
});

bookmarkURL.addEventListener("input", function () {
  if (urlRegex.test(bookmarkURL.value)) {
    bookmarkURL.style.boxShadow = "rgba(0, 255, 123, 0.25) 0px 0px 0px 0.25rem";
    bookmarkURL.style.borderColor = "rgb(0, 255, 123)";
  } else {
    bookmarkURL.style.boxShadow = "0 0 0 .25rem rgb(253 13 162 / 25%)";
    bookmarkURL.style.borderColor = "rgb(227 138 147)";
  }
});
