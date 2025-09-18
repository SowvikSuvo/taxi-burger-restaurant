const loadCategory = () => {
  const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const loadFoods = (id) => {
  // 1 - food container k hide korbo + loading k shoe korbo
  document.getElementById("loading-spinner").classList.remove("hidden");
  document.getElementById("food-container").classList.add("hidden");

  const url = id
    ? `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`
    : ` https://taxi-kitchen-api.vercel.app/api/v1/foods/random`;
  // remove class
  const catBtns = document.querySelectorAll(".btn-category");
  catBtns.forEach((btn) => btn?.classList?.remove("active"));
  // active class
  const currentBtn = document.getElementById(`cat-btn-${id}`);
  console.log(currentBtn);
  currentBtn?.classList?.add("active");

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoods(data.foods));
};
const loadRandomData = () => {
  const url = ` https://taxi-kitchen-api.vercel.app/api/v1/foods/random`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoods(data.foods));
};

const loadFoodDetails = (id) => {
  const url = ` https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModal(data.details));
};

let cart = [];
let total = 0;

const displayCategory = (categories) => {
  //1 get the category container
  const catContainer = document.getElementById("category-container");
  catContainer.innerHTML = "";
  for (let cat of categories) {
    //  create html element
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
          <button id="cat-btn-${cat.id}" onclick="loadFoods(${cat.id})" class="btn justify-start btn-block shadow btn-category ">
             <img
              src="${cat.categoryImg}"
              alt=""
              class="w-10"
            />${cat.categoryName}
          </button>`;
    // Append the element
    catContainer.append(categoryCard);
  }
};

const displayFoods = (foods) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  foods.forEach((food) => {
    const foodCard = document.createElement("div");
    foodCard.innerHTML = `
       <div  class="p-5 bg-white flex gap-4 shadow rounded-xl ">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                alt=""
                onclick="loadFoodDetails(${food.id})"
                class="w-[160px] rounded-xl h-[160px] object-cover food-img"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold food-title">
                ${food.title}
              </h1>

              <div class="badge badge-warning">${food.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  ৳ <span class="food-price">${food.price}</span> BDT
                </h2>
              </div>

              <button onclick="addToCart(this)" class="btn btn-warning ">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>`;
    foodContainer.append(foodCard);
  });

  // 2 - food container k show korbo + loading k hide korbo
  document.getElementById("loading-spinner").classList.add("hidden");
  document.getElementById("food-container").classList.remove("hidden");
};

// Modal section //
const displayModal = (food) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = "";

  detailsContainer.innerHTML = `
            <div class="">
            <h2 class="text-3xl font-bold ">${food.title}</h2>

          <div class="mx-auto">
            <img src="${food.foodImg}" alt="">
          </div>
          <div class="">
            <h3 class="text-lg font-bold text-center hover:text-red-600"> Price: ৳ ${food.price} BDT</h3>
          </div>
          
          <div class="flex justify-between items-center">
          <div class="badge badge-primary">
                  ${food.area}
             </div>
             <div>
                <h3 class="font-semibold">For Recipe</h3>
                <a href="${food.video}" target="_blank" class="btn btn-warning"> watch Video</a>
              </div>
          </div>
          `;
  document.getElementById("my_modal_3").showModal();
};

loadCategory();
loadFoods(11);
// loadRandomDat();

const addToCart = (btn) => {
  const card = btn.parentNode.parentNode;
  const foodTitle = card.querySelector(".food-title").innerText;
  const foodImg = card.querySelector(".food-img").src;
  const foodPrice = card.querySelector(".food-price").innerText;
  const foodPriceNum = Number(foodPrice);
  // console.log(foodTitle, foodImg, foodPriceNum);

  const selectedItem = {
    foodTitle: foodTitle,
    foodImg: foodImg,
    foodPrice: foodPriceNum,
  };
  cart.push(selectedItem);
  total = total + foodPriceNum;
  displayCart(cart);
  displayTotal(total);
};

const displayTotal = (val) => {
  document.getElementById("cart-total").innerHTML = val;
};
const displayCart = (cart) => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  for (let item of cart) {
    const newItem = document.createElement("div");
    newItem.innerHTML = `
          <div class="p-1 bg-white flex gap-3 shadow  rounded-xl relative">
            <div class="img">
              <img
                src="${item.foodImg}"
                alt=""
                class="w-[50px] rounded-xl h-[50px] object-cover"
              />
            </div>
            <div class="flex-1">
              <h1 class="text-xs font-bold food-title">
                ${item.foodTitle}
              </h1>

              <div class="">
                <h2 class="text-yellow-600 font-semibold">
                  ৳ <span class="item-Price">${item.foodPrice}</span> BDT
                </h2>
              </div>
            </div>
            <div onclick="removeCart(this)"
              class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>`;
    cartContainer.append(newItem);
  }
};

const removeCart = (btn) => {
  const item = btn.parentNode;
  const foodTitle = item.querySelector(".food-title").innerText;
  const foodPrice = Number(item.querySelector(".item-Price").innerText);
  console.log(foodPrice);

  cart = cart.filter((item) => item.foodTitle != foodTitle);
  total = 0;
  cart.forEach((item) => (total += item.foodPrice));
  displayCart(cart);
  displayTotal(total);
};
