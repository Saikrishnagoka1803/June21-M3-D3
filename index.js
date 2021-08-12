// EXERCISES:

//  1) When pressing on Load Images button, load the pictures from
// https://api.pexels.com/v1/search?query=[your-query]   2) When pressing on Load Seconday Images, load the pictures from
// https://api.pexels.com/v1/search?query=[your-secondary-query]

// 3) The Edit button should be replaced with a "Hide" button.

// 4) When the hide button is pressed, the whole picture card should disappear.

// 5) Replace the "9 mins" string in the card template with the ID of the Image    6) Add in the "jumbotron" a search field. Use the value of the search field to search new images
// and replace the existing ones.

// [EXTRA]

//         7) After every button is pressed, display an alert for 5 seconds the result of the operation (es.: 20
// images loaded)

// 8) Handle API errors gracefully, using alert components with the message inside

// 9) Add at the bottom of the page a carousel with "forest" images loaded by another API call

// 10) When the user clicks on the "VIEW" button inside the Card, open the specified image in a modal view

// [EVEN MORE EXTRA]

//         11) Use the map method to create from your pexel's response object an array containing just the url strings    12) Use filter to modify the result of the api call to filter only images from some specific authors
// only ( you can choose which ones)

// [HINTS]

//         1.You can replace the images src for making your pictures appear on button click or you can use template literals to re-create all the cards from scratch.

// 2.Use arrow functions to practice them

window.onload = () => {
  fetching("Lions");
};

const fetching = async (str) => {
  fetch(`https://api.pexels.com/v1/search?query=${str}`, {
    headers: {
      Authorization: "563492ad6f91700001000001a37e101a71da4ee5a27ddac8d09db960",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dataArray = data.photos;
    
      if(data.photos.length>0){
      loadimages(dataArray);
      alert(`No of requested images available are, ${data.photos.length}`)
    }
      else{
        let row = document.querySelector(".album .container .row");
        row.innerHTML = `<div class="alert alert-danger" role="alert">
       Apologies ... Your search request is not available!!
      </div>`
      }
    });
};

const modalfunc = (e) =>{
  let modalbody = document.querySelector('.modal-body')

 let imgsrc = e.target.closest('.card').firstElementChild.src
 let modaltitle = document.querySelector('#staticBackdropLabel')
 let id = e.target.closest(".card-body").children[1].children[1].innerText
 modaltitle.innerText = 'ID: ' + id
 modalbody.innerText = 'Hello Iam there' 

 }

 let field;
 const handlesearch = (e) => {
  field = e.target.value.toLowerCase()
  
  
 }

 const loadsearchImages = (query) => {
      fetching(query)
 }

const loadimages = (arr) => {
  let row = document.querySelector(".album .container .row");
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `<div class="col-md-4">
        <div class="card mb-4 shadow">
          <img src='${element.src.tiny}' class='img-fluid'>
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c" />
            
          
          <div class="card-body">
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <div
              class="d-flex justify-content-between align-items-center"
            >
              <div class="btn-group">
              <button type="button"
              onclick = "modalfunc(event)" 
              class="btn btn-sm btn-outline-secondary" 
              data-toggle="modal" 
              data-target="#staticBackdrop">
               view
              </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary hide"
                >
                  Hide
                </button>
              </div>
              <small class="text-muted">${element.id}</small>
            </div>
          </div>
        </div>
      </div>`;
  });
  let hide = document.querySelectorAll(".btn-group .hide");
  hide.forEach((ele) => {
    let parent = ele.parentNode.parentNode.parentNode.parentNode.parentNode;
    
    ele.addEventListener("click", () => {
      parent.remove()
    });
  });
};
