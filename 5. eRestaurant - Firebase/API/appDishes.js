const API_URL = "http://localhost:3000";

const getAllDishes = document.getElementById("getAllDishes");
const dishesDiv = document.getElementById("dishesDiv");
const homeImg = document.getElementById("homeImg");
const homeBtn = document.getElementById("homeBtn");
const heading = document.getElementById("heading");

const createDishBtn = document.getElementById("createDishBtn");
const newDishForm = document.getElementById("newDishForm");

const newDish = document.getElementById("inputDish");
const newPrice = document.getElementById("inputPrice");
const newImgUrl = document.getElementById("inputImgUrl");

const submitBtn = document.getElementById("submitBtn");

const editState = {
  editMode: false,
  editId: ''
}

getAllDishes.addEventListener('click', () => {

    homeImg.style.display = "none";
    dishesDiv.style.display = "block";
    newDishForm.style.display = "none";
    getDishes();
});


homeBtn.addEventListener('click', () => {

  homeImg.style.display = "block";
  heading.style.display = "block";
  dishesDiv.style.display = "none";
  
});


createDishBtn.addEventListener('click', () => {

  homeImg.style.display = "none";
  heading.style.display = "none";
  dishesDiv.style.display = "none";
  newDishForm.style.display = "block";
});


dishesDiv.addEventListener("click", (event) => {

  if (event.target.matches(".btn-del")) {
     
      let id = event.target.id;
      deleteDish(id);
  } 
  getDishes();
});

dishesDiv.addEventListener("mouseup", (event) => {

  if (event.target.matches(".btn-del")) {
     
      let id = event.target.id;
      deleteDish(id);
  } 
  getDishes();
});


/////////////////////////////////
dishesDiv.addEventListener("click", async (event) => {
  event.preventDefault();

  if (event.target.matches(".btn-edit")) {
     
    let id = event.target.id;

    editState.editId = id;
    editState.editMode = true;

    dishesDiv.style.display = "none";
    newDishForm.style.display = "block";

    const dishToEdit = await getSingleDish(id);

    newDish.value = dishToEdit.dishName;
    newPrice.value = dishToEdit.price;
    newImgUrl.value = dishToEdit.imageUrl;

  } 
  
});


submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const dishName = newDish.value;
  const price = newPrice.value;
  const imageUrl = newImgUrl.value;

  const dish = {
      dishName,
      price,
      imageUrl
  };

  if(editState.editMode) {
    updateDish(editState.editId, dish);
  }

  if(!editState.editMode) {
    postNewDish(dish);
  }

  newDish.value = '';
  newPrice.value = '';
  newImgUrl.value = '';

});


const getSingleDish = async (id) => {
  const response = await fetch(`${API_URL}/api/dishes/${id}`);
  const result = await response.json();
  return result;
};


const postNewDish = (dish) => {
  fetch(`${API_URL}/api/dishes/new-dish`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(dish),
  })
  .then((response) => response.json())
  .then((result) => {
      console.log(result);
  })
  .catch((err) => {
      console.log(err);
  })
  
};


const deleteDish = (id) => {
  fetch(`${API_URL}/api/dishes/${id}`, {
      method: "DELETE",
  })
  .then((response) => response.json())
  .then((result) => {
      console.log(result);
  })
  .catch((err) => {
      console.log(err);
  })
  
};


const updateDish = (id, dish) => {

  fetch(`${API_URL}/api/dishes/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dish),
  })
  .then((response) => response.json())
  .then((result) => {
    console.log(result);

    editState.editId = '';
    editState.editMode = false;
  })
  .catch((err) => {
    console.log(err);
  })
};


const getDishes = () => {

    fetch(`${API_URL}/api/dishes`)
        .then((response) => response.json())
        .then((result) => {
            
          renderDishes(result);
        })
};

const renderDishes = (dishes) => {
    let inner = '';
    inner += `<div class="row">`;

    dishes.forEach(dish => {
        inner += `<div class="col-md-3 col-sd-3 my-2">
        <div class="card h-100">
          <img src="${dish.imageUrl}" class="card-img-top"  alt="...">
          <div class="card-body">
            <h5 class="card-title">${dish.dishName}</h5>
            
            <p class="card-text">${dish.price}&euro;</p>
          </div>
          
          <div class="btn-group my-1" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-order btn-success rounded mx-2" id="${dish.id}">Order</button>
            <button type="button" class="btn btn-edit btn-warning rounded mx-2" id="${dish.id}">Edit</button>
            <button type="button" class="btn btn-del btn-danger rounded mx-2" id="${dish.id}">Delete</button>
          </div>

        </div>
      </div>`;
    });
    inner += `</div>`;
    dishesDiv.innerHTML = inner;
}

