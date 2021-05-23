const API_URL = "http://localhost:3000";

const getAllPosts = document.getElementById("getAllPosts");
const postsDiv = document.getElementById("postsDiv");
const homeImg = document.getElementById("homeImg");
const homeBtn = document.getElementById("homeBtn");
const heading = document.getElementById("heading");

const createPostBtn = document.getElementById("createPostBtn");
const newPostForm = document.getElementById("newPostForm");

const newArchitect = document.getElementById("inputArchitect");
const newLocation = document.getElementById("inputLocation");
const newImgUrl = document.getElementById("inputImgUrl");
const newDescription = document.getElementById("inputDescription");

const submitBtnPost = document.getElementById("submitBtnPost");

const editState = {
  editMode: false,
  editId: ''
}

getAllPosts.addEventListener('click', () => {

    homeImg.style.display = "none";
    postsDiv.style.display = "block";
    newPostForm .style.display = "none";
    getPosts();
});


homeBtn.addEventListener('click', () => {

  homeImg.style.display = "block";
  heading.style.display = "block";
  postsDiv.style.display = "none";
  
});


createPostBtn.addEventListener('click', () => {

  homeImg.style.display = "none";
  heading.style.display = "none";
  postsDiv.style.display = "none";
  newPostForm .style.display = "block";
});


postsDiv.addEventListener("click", (event) => {

  if (event.target.matches(".btn-del")) {
     
      let id = event.target.id;
      deletePost(id);
  } 
  getPosts();
});

postsDiv.addEventListener("mouseup", (event) => {

  if (event.target.matches(".btn-del")) {
     
      let id = event.target.id;
      deletePost(id);
  } 
  getPosts();
});


/////////////////////////////////
postsDiv.addEventListener("click", async (event) => {
  event.preventDefault();

  if (event.target.matches(".btn-edit")) {
     
    let id = event.target.id;

    editState.editId = id;
    editState.editMode = true;

    postsDiv.style.display = "none";
    newPostForm .style.display = "block";

    const postToEdit = await getSinglePost(id);

    newArchitect.value = postToEdit.architect;
    newLocation.value = postToEdit.location;
    newImgUrl.value = postToEdit.imageUrl;
    newDescription.value = postToEdit.description;
  } 
  
});


submitBtnPost.addEventListener("click", (e) => {
  e.preventDefault();

  const architect = newArchitect.value;
  const location = newLocation.value;
  const imageUrl = newImgUrl.value;
  const description = newDescription.value;

  const post = {
      architect,
      location,
      imageUrl,
      description
  };



  if(editState.editMode) {
    updatePost(editState.editId, post);
  }

  if(!editState.editMode) {
    postNewPost(post);
  }

  newArchitect.value = '';
  newLocation.value = '';
  newImgUrl.value = '';
  newDescription.value = '';

});


const getSinglePost = async (id) => {
  const response = await fetch(`${API_URL}/api/${id}`);
  const result = await response.json();
  return result;
};


const postNewPost = (post) => {
  fetch(`${API_URL}/api/posts/new-post`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
  })
  .then((response) => response.json())
  .then((result) => {
      console.log(result);
  })
  .catch((err) => {
      console.log(err);
  })
  
};


const deletePost = (id) => {
  fetch(`${API_URL}/api/posts/${id}`, {
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


const updatePost = (id, post) => {

  fetch(`${API_URL}/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
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


const getPosts = () => {

    fetch(`${API_URL}/api/posts/all-posts`)
        .then((response) => response.json())
        .then((result) => {
            
            renderPosts(result);
        })
};

const renderPosts = (posts) => {
    let inner = '';
    inner += `<div class="row">`;

    posts.forEach(post => {
        inner += `<div class="col-md-6 col-sd-6 my-4">
        <div class="card">
          <img src="${post.imageUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h4 class="card-title">${post.architect}</h4>
            <h5>"${post.location}"</h5>
            <p class="card-text">${post.description}</p>
          </div>

          <hr style="background: red;">

          <div class="btn-group my-2" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-edit btn-warning rounded mx-5" id="${post.id}">Edit</button>
            <button type="button" class="btn btn-del btn-danger rounded mx-5" id="${post.id}">Delete</button>
          </div>

        </div>
      </div>`;
    });
    inner += `</div>`;
    postsDiv.innerHTML = inner;
}

