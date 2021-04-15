const url = "http://localhost:3000/toys"

const toyList = document.getElementById('toy-collection')


fetch(url)
.then(res=>res.json())
.then(handleData)
function handleData(toys){
  toys.forEach(renderToy);
}

function renderToy(toy){
  const childDiv = document.createElement('div')
  childDiv.className = "card"
  document.querySelector('#toy-collection').appendChild(childDiv)

  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  

  let img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"

  let likes = document.createElement('p')
  likes.innerText = parseInt(toy.likes) + " likes"
  likes.className = "likesNum"

  let button = document.createElement('button')
  button.innerHTML = 'like'
  

  button.addEventListener('click', () =>{
    let count = parseInt(likes.innerText)
    ++ count
    likes.innerText = count + " likes"
    let newId = toy.id
    let newLike ={ 
      "likes" : count
    }

      patchToy(newLike)

        
      function patchToy(newLike){
        const newUrl = "http://localhost:3000/toys/" + newId
        let optionPatch = {
          method: 'PATCH',
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(newLike)
        }
        fetch(newUrl, optionPatch)
      
      }




  })

 
  childDiv.append(h2,img,likes,button);


}





function postToy(handleData){
  let optionsPost = {
    method: "POST",
    headers: { 
      "Content-Type" : "application/json",
      Accept : "application/json",
    },
    body : JSON.stringify(handleData)
      

    }
    fetch(url, optionsPost)


  }
  document.querySelector('.add-toy-form').addEventListener('submit', function(event) {
    event.preventDefault()
    let newToy = {
      "name": event.target.name.value,
      "image": event.target.image.value,
      "likes": "0"
    
    }
    postToy(newToy)
    renderToy(newToy)
  });





let addToy = false;

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
