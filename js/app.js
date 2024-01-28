$(document).ready(() => {
  $(".loading-screen").fadeOut(3000, () => {
    $("body").css("overflow", "auto");
  });
});

////////////Start Scroll Top In Page///////////
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 250) {
    $(".btn-up").fadeIn(1000);
  } else {
    $(".btn-up").fadeOut(1000);
  }
});

$(".btn-up").on("click", function () {
  $("body, html").animate(
    {
      scrollTop: 0,
    },
    2000
  );
});
////////////End Scroll Top In Page///////////

////////////// Start open Slide Navber////////////////////////////////////////
function openNav() {
  $(".nave-menu").animate({ left: 0 }, 1000);
  $(".open-icon").removeClass("fa-bars-staggered");
  $(".open-icon").addClass("fa-xmark");
  for (let i = 0; i < 5; i++) {
    $(".nav-links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 200);
  }
}
////////////// Start Close Slide Navber////////////////////////////////////////

////////////// Start Close Slide Navber////////////////////////////////////////
function closeNav() {
  let navOfWidth = $(".nav-tab").outerWidth();
  $(".nave-menu").animate({ left: `-${navOfWidth}` }, 1000);
  $(".open-icon").removeClass("fa-xmark");
  $(".open-icon").addClass("fa-bars-staggered");
  $(".nav-links > *").animate({ top: 300 }, 1000);
}
////////////// Start Close Slide Navber/////////////////////////////////////////

////////////// Start Open & Close Slide Navber When On Click Icon///////////////
$(".open-icon").on("click", function () {
  if ($(".nave-menu").css("left") !== "0px") {
    openNav();
  } else {
    closeNav();
  }
});
////////////// Start Open & Close Slide Navber When On Click Icon///////////////

////////////// Start Close Slide Navber When On Click For This Links////////////
$(".nav-links li").on("click", function () {
  closeNav();
});
////////////// End Close Slide Navber When On Click For This Links//////////////

////////////////Start Get Data From Api/////////////////////////////////////////
let result = "";
async function sta() {
  $(".row").html("");
  $(".loading-screen").fadeIn(200);
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  result = await data.json();
  result = result.meals;
  displayInHomePage(result);
  $(".loading-screen").fadeOut(200);
}
sta();
////////////////End Get Data From Api/////////////////////////////////////////////

////////////////Start Display Data From Api In Home Page//////////////////////////
function displayInHomePage(arr) {
  let showData = "";
  for (let i = 0; i < arr.length; i++) {
    showData += `
        <div class="col-md-4 col-lg-3 mb-3">
                <div onclick="idDataMeals(${arr[i].idMeal})"
                  class="image position-relative overflow-hidden rounded-3 c-pointer"
                >
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" />
                  <div class="img-info d-flex align-items-center p-2">
                    <h3 class="fw-bold">${arr[i].strMeal}</h3>
                  </div>
                </div>
              </div>
        `;
  }

  $(".row").html(showData);
}
////////////////End Display Data From Api In Home Page///////////////////////////////

////////////////Start Get Data From New Api/////////////////////////////////////////
let idata = "";
async function idDataMeals(imeal) {
  $(".row").html("");
  $(".loading-screen").fadeIn(200);
  let isdata = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${imeal}`
  );
  idata = await isdata.json();
  idata = idata.meals;
  displayidDataMeals(idata[0]);
  $(".loading-screen").fadeOut(200);
}
////////////////End Get Data From New Api///////////////////////////////////////////

////////////////Start Display New Data From New Api When Click On Imgs Item/////////
let axax = "";
function displayidDataMeals(mealid) {
  for (let i = 1; i <= 20; i++) {
    if (mealid[`strMeasure${i}`] && mealid[`strIngredient${i}`]) {
      axax += `<li class="alert alert-info m-2 p-1">${
        mealid[`strMeasure${i}`]
      } ${mealid[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = "";
  console.log(mealid.strTags);
  if (mealid.strTags) {
    let showTags = mealid.strTags.split(",");
    for (let i = 0; i < showTags.length; i++) {
      if (showTags[i]) {
        tags += `<li class="alert alert-danger m-2 p-1">${showTags[i]}</li>`;
      }
    }
  }

  let cartona = "";
  cartona = `
<div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${mealid.strMealThumb}"
                    alt="">
                    <h2>${mealid.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${mealid.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${mealid.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${mealid.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${axax}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tags}
                </ul>
                <a target="_blank" href="${mealid.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${mealid.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
            `;
  $(".row").html(cartona);
}
////////////////Start Display New Data From New Api When Click On Imgs Item/////////////////

///////////////
$(".nav-links li")
  .eq(0)
  .on("click", function () {
    let cartona = "";
    cartona = `
    <div class="col-lg-6 mb-3 p-3">
            <input
            onkeyup="getDataFromSearch(this.value || 0)"
              type="text"
              class="form-control"
              id="floatingPassword"
              placeholder="Search By Name"
            />
          </div>
          <div class="col-lg-6 p-3">
            <input
            onkeyup="getFirstName(this.value || 0)"
              type="text"
              maxlength="1"
              class="form-control"
              id="floatingPassword"
              placeholder="Search By First Letter"
            />
          </div>
    `;
    $("#searchContainer").html(cartona);
    $(".row").html("");
  });

//////////Start Get Data From Api Name  By Search On Input/////
let resultOfSearch = "";
async function getDataFromSearch(inputVal) {
  $(".row").html("");
  $(".loading-screen").fadeIn(200);
  let SearchAboutData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputVal}`
  );
  resultOfSearch = await SearchAboutData.json();
  resultOfSearch = resultOfSearch.meals;
  resultOfSearch ? displayInHomePage(resultOfSearch) : displayInHomePage([]);
  $(".loading-screen").fadeOut(200);
}
//////////End Get Data From Api Name  By Search On Input/////

//////////Start Get Data From Api By First Name  By Search On Input/////

async function getFirstName(firstValue) {
  $(".row").html("");
  $(".loading-screen").fadeIn(200);
  let firstName = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstValue}`
  );
  let response = await firstName.json();
  response = response.meals;
  firstValue ? displayInHomePage(response) : displayInHomePage([]);
  $(".loading-screen").fadeOut(200);
}
//////////End Get Data From Api By First Name  By Search On Input/////

//////////Start Get Data From Categories Of Api/////
async function getCategories() {
  $(".row").html("");
  $(".loading-screen").fadeIn(200);
  let Categories = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let rescategories = await Categories.json();
  rescategories = rescategories.categories;
  displayCategories(rescategories);
  $(".loading-screen").fadeOut(200);
}

$(".nav-links li")
  .eq(1)
  .on("click", function () {
    $("#searchContainer").html("");
    getCategories();
  });
//////////End Get Data From Categories Of Api/////

//////////Start Display Data From Categories Of Api In Page/////
function displayCategories(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-4 col-lg-3 mb-3">
                <div onclick="getCategoriesMeal('${arr[i].strCategory}')"
                  class="image position-relative overflow-hidden rounded-3 c-pointer"
                >
                  <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" />
                  <div class="img-info d-flex flex-column p-2">
                    <h3 class="fw-bold text-center">${arr[i].strCategory}</h3>
                    <p class="text-center">${arr[
                      i
                    ].strCategoryDescription.slice(0, 100)}</p>
                  </div>
                </div>
              </div>
        `;
  }
  $(".row").html(cartona);
}
//////////End Display Data From Categories Of Api In Page/////

//////////Start Get Data From CategoriesMeal Of Api In Page When Click on getCategories Funcition/////
async function getCategoriesMeal(meal) {
  $(".row").html("");
  $(".loading-screen").fadeIn(200);
  let Categories = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
  );
  let categoriesMeal = await Categories.json();
  categoriesMeal = categoriesMeal.meals;
  displayCategoriesMeal(categoriesMeal);
  $(".loading-screen").fadeOut(200);
}
//////////End Get Data From CategoriesMeal Of Api In Page When Click on getCategories Funcition/////

//////////Start Display Data From CategoriesMeal Of Api In Page When Click on getCategories Funcition/////
function displayCategoriesMeal(arr) {
  let showData = "";
  for (let i = 0; i < arr.length; i++) {
    showData += `
        <div class="col-md-4 col-lg-3 mb-3">
                <div onclick="idDataMeals(${arr[i].idMeal})"
                  class="image position-relative overflow-hidden rounded-3 c-pointer"
                >
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" />
                  <div class="img-info d-flex align-items-center p-2">
                    <h3 class="fw-bold">${arr[i].strMeal}</h3>
                  </div>
                </div>
              </div>
        `;
  }
  $(".row").html(showData);
}
//////////End Display Data From CategoriesMeal Of Api In Page When Click on getCategories Funcition/////

//////////Start Get Data From Area Of Api In Page/////
async function getArea() {
  $(".row").html("");
  $(".loading-screen").fadeIn(200);
  let repo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await repo.json();
  response = response.meals;
  displayArea(response);
  $(".loading-screen").fadeOut(200);
}

$(".nav-links li")
  .eq(2)
  .on("click", function () {
    $("#searchContainer").html("");
    getArea();
  });

//////////End Get Data From Area Of Api In Page/////

//////////Start Display Data From Area Of Api In Wehen On Click On This/////
function displayArea(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-4 col-lg-3 text-white text-center c-pointer mb-4"onclick="getMealOfAreea ('${arr[i].strArea}')" >
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h3 class="mt-2">${arr[i].strArea}</h3>
    </div>
    `;
    $(".row").html(cartona);
  }
}
//////////End Display Data From Area Of Api In Wehen On Click On This/////

//////////Start Get Data From Meal Area Of Api In Page  When Click on displayArea Funcition/////
async function getMealOfAreea(mealArea) {
  $(".row").html("");
  $(".loading-screen").fadeIn(200);
  let repotwo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealArea}`
  );
  let resultmealofarea = await repotwo.json();
  resultmealofarea = resultmealofarea.meals;
  displayInHomePage(resultmealofarea);
  $(".loading-screen").fadeOut(200);
}
//////////End Get Data From Meal Area Of Api In Page  When Click on displayArea Funcition/////

async function getIdIngredient() {
  $(".row").html("");
  $(".loading-screen").fadeIn(200);
  let repothree = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let resultingredient = await repothree.json();
  resultingredient = resultingredient.meals;
  displayIdIngredient(resultingredient);
  $(".loading-screen").fadeOut(200);
}

$(".nav-links li")
  .eq(3)
  .on("click", function () {
    $("#searchContainer").html("");
    getIdIngredient();
  });

function displayIdIngredient(arr) {
  let cartona = "";
  for (let i = 0; i < 24; i++) {
    cartona += `
      <div class="col-md-4 col-lg-3 text-center text-white c-pointer" onclick="getMealOfIdIngredient ('${
        arr[i].strIngredient
      }')">
            <i class="fa-solid fa-drumstick-bite fa-4x mb-2"></i>
            <h4 class= "idIngredient-name d-flex align-items-center justify-content-center">${
              arr[i].strIngredient
            }</h4>
            <p class="py-2 px-1">
             ${arr[i].strDescription.slice(0, 100)}
            </p>
          </div>
      `;
  }
  $(".row").html(cartona);
}

async function getMealOfIdIngredient(meal) {
  $(".row").html("");
  $(".loading-screen").fadeIn(200);
  let repofour = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`
  );
  let resultmealofidingredient = await repofour.json();
  resultmealofidingredient = resultmealofidingredient.meals;
  displayInHomePage(resultmealofidingredient);
  $(".loading-screen").fadeOut(200);
}

//////////////////////////////

function addConcatUs() {
  $(".row").html(`
  <div class="col-md-6">
            <input
              id="nameInput"
              onkeyup="inputsValidation()"
              type="text"
              class="form-control"
              placeholder="Enter Your Name"
            />
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
              Special characters and numbers not allowed
            </div>
          </div>
          <div class="col-md-6">
            <input
              id="emailInput"
              onkeyup="validationEmail()"
              type="email"
              class="form-control"
              placeholder="Enter Your Email"
            />
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
              Email not valid *exemple@yyy.zzz
            </div>
          </div>
          <div class="col-md-6">
            <input
              id="phoneInput"
              onkeyup="validationPhone()"
              type="text"
              class="form-control"
              placeholder="Enter Your Phone"
            />
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid Phone Number
            </div>
          </div>
          <div class="col-md-6">
            <input
              id="ageInput"
              onkeyup="validationAge()"
              type="number"
              class="form-control"
              placeholder="Enter Your Age"
            />
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid age
            </div>
          </div>
          <div class="col-md-6">
            <input
              id="passwordInput"
              onkeyup="validationPassword()"
              type="password"
              class="form-control"
              placeholder="Enter Your Password"
            />
            <div
              id="passwordAlert"
              class="alert alert-danger w-100 mt-2 d-none"
            >
              Enter valid password *Minimum eight characters, at least one
              letter and one number:*
            </div>
          </div>
          <div class="col-md-6">
            <input
              id="repasswordInput"
              onkeyup="validationRePassword()"
              type="password"
              class="form-control"
              placeholder="Repassword"
            />
            <div
              id="repasswordAlert"
              class="alert alert-danger w-100 mt-2 d-none"
            >
              Enter valid repassword
            </div>
          </div>
        </div>
        <div class="text-center"><button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button></div>
  `);
}

$(".nav-links li")
  .eq(4)
  .on("click", function () {
    $("#searchContainer").html("");
    addConcatUs();
  });

//////////////
/////////////////////////Start Validation/////////////////////
let inputName = false;
let inputEmail = false;
let inputPhone = false;
let inputAge = false;
let inputPasword = false;
let inputRePasword = false;

/////////////////////////Start Validation For Input Name/////////////////////
function inputsValidation() {
  let namerejax = /^[a-zA-Z ]+$/;
  if (namerejax.test($("#nameInput").val())) {
    $("#nameAlert").addClass("d-none");
    $("#nameAlert").removeClass("d-block");
    inputName = true;
    checkAllInputs();
    // return true;
  } else {
    $("#nameAlert").addClass("d-block");
    $("#nameAlert").removeClass("d-none");
    // return false;
    inputName = false;
  }
}
/////////////////////////End Validation For Input Name/////////////////////

/////////////////////////Start Validation For Input Email/////////////////////
function validationEmail() {
  let emailrejax =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailrejax.test($("#emailInput").val())) {
    $("#emailAlert").addClass("d-none");
    $("#emailAlert").removeClass("d-block");
    // return true;
    inputEmail = true;
    checkAllInputs();
  } else {
    $("#emailAlert").addClass("d-block");
    $("#emailAlert").removeClass("d-none");
    // return false;
    inputEmail = false;
  }
}
/////////////////////////End Validation For Input Email/////////////////////

/////////////////////////Start Validation For Input Phone Numper/////////////////////
function validationPhone() {
  let phonerejax = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (phonerejax.test($("#phoneInput").val())) {
    $("#phoneAlert").addClass("d-none");
    $("#phoneAlert").removeClass("d-block");
    // return true;
    inputPhone = true;
    checkAllInputs();
  } else {
    $("#phoneAlert").addClass("d-block");
    $("#phoneAlert").removeClass("d-none");
    // return false;
    inputPhone = false;
  }
}
/////////////////////////End Validation For Input Phone Numper/////////////////////

/////////////////////////Start Validation For Input Age/////////////////////
function validationAge() {
  let agerejax = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  if (agerejax.test($("#ageInput").val())) {
    $("#ageAlert").addClass("d-none");
    $("#ageAlert").removeClass("d-block");
    // return true;
    inputAge = true;
    checkAllInputs();
  } else {
    $("#ageAlert").addClass("d-block");
    $("#ageAlert").removeClass("d-none");
    // return false;
    inputAge = false;
  }
}
/////////////////////////End Validation For Input Age/////////////////////

/////////////////////////Start Validation For Input Password/////////////////////
function validationPassword() {
  let pasrejax = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  if (pasrejax.test($("#passwordInput").val())) {
    $("#passwordAlert").addClass("d-none");
    $("#passwordAlert").removeClass("d-block");
    // return true;
    inputPasword = true;
    checkAllInputs();
  } else {
    $("#passwordAlert").addClass("d-block");
    $("#passwordAlert").removeClass("d-none");
    // return false;
    inputPasword = false;
  }
}
/////////////////////////End Validation For Input Password/////////////////////

/////////////////////////Start Validation For Input RePassword/////////////////////
function validationRePassword() {
  if ($("#passwordInput").val() === $("#repasswordInput").val()) {
    $("#repasswordAlert").addClass("d-none");
    $("#repasswordAlert").removeClass("d-block");
    // return true;
    inputRePasword = true;
    checkAllInputs();
  } else {
    $("#repasswordAlert").addClass("d-block");
    $("#repasswordAlert").removeClass("d-none");
    // return false;
    inputRePasword = false;
  }
}
/////////////////////////End Validation For Input RePassword/////////////////////

function checkAllInputs() {
  if (
    inputName &&
    inputEmail &&
    inputPhone &&
    inputAge &&
    inputPasword &&
    inputRePasword
  ) {
    $("#submitBtn").removeAttr("disabled");
    $("#submitBtn").addClass("c-pointer");
  } else {
    $("#submitBtn").attr("disabled");
    $("#submitBtn").removeClass("c-pointer");
  }
}
/////////////////////////End Validation//////////////////////
