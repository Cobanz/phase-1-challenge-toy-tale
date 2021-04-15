let addToy = false;
const toyUrl = `http://localhost:3000/toys/`;
const toyForm = document.querySelector(".add-toy-form");
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
fetch(toyUrl)
  .then((response) => response.json())
  .then((toyArray) => toyArray.forEach((toy) => renderToy(toy)));
function renderToy(toy) {
  let toyBox = document.querySelector("#toy-collection");
  let toyCard = document.createElement("div");
  toyCard.className = "card";
  let toyName = document.createElement("h2");
  toyName.innerText = toy.name;
  let toyImage = document.createElement("img");
  toyImage.className = "toy-avatar";
  toyImage.src = toy.image;
  let toyLikes = document.createElement("p");
  toyLikes.innerText = toy.likes + " Likes <3";
  let likeButton = document.createElement("button");
  likeButton.innerText = "Like <3";
  likeButton.className = "like-btn";
  likeButton.id = toy.id;
  likeButton.addEventListener("click", () => {
    let likeCount = parseInt(toyLikes.innerText);
    let newLikeCount = likeCount + 1;
    let likeUpdate = {
      likes: newLikeCount,
    };
    patchToy(likeUpdate, toy.id, toyLikes);
    // console.log(newLikeCount)
  });
  let deleteButton = document.createElement('button')
  deleteButton.className = "like-btn"
  deleteButton.innerText = "X"
  deleteButton.addEventListener('click', ()=>{
    
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
    fetch(toyUrl + toy.id, options)
    .then(response => response.json())
    .then(emptyObject => toyCard.remove())
  })
  toyCard.append(toyName, toyImage, toyLikes, likeButton, deleteButton);
  toyBox.appendChild(toyCard);
}
toyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let newToy = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0,
  };
  postToy(newToy);
});
function postToy(toy) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toy),
  };
  fetch(toyUrl, options)
    .then((response) => response.json())
    .then((postedToy) => renderToy(postedToy));
}
function patchToy(likeUpdate, id, toyLikes) {
  let options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(likeUpdate),
  };
  fetch(toyUrl + id, options)
    .then((response) => response.json())
    .then(
      (updatedToy) => (toyLikes.innerText = updatedToy.likes + " Likes <3")
    );
}