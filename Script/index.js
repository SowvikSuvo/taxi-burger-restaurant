const loadCategory = () => {
  const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const displayCategory = (categories) => {
  //1 get the category container
  const catContainer = document.getElementById("category-container");
  catContainer.innerHTML = "";
  for (let cat of categories) {
    //  create html element
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
          <button class="btn justify-start btn-block shadow btn-category ">
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

loadCategory();
