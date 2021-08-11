
window.onload = () => {
    photoSection('Tigers')
    let click1 = document.getElementsByClassName('btn-primary')[0]
    let click2 =   document.getElementsByClassName('btn-success')[0]
    click1.addEventListener('click', ()=>{
        photoSection('Mountains')
    })
    click2.addEventListener('click', ()=>{
        photoSection('cars')
    })
}
const showModel = (e) => {
   let url = e.target.closest('.card').children[0].src
    const modelBody = document.querySelector('.modal-body')
    const img = `<img src="${url}" width='100%' object-fit='cover'/>`
    modelBody.innerHTML = img
}


const photoSection = function(query)
      
    {
      
      fetch(`https://api.pexels.com/v1/search?query=${query}`, {
	"method": "GET",
	"headers": {
    "Authorization": "563492ad6f91700001000001a37e101a71da4ee5a27ddac8d09db960"
	}
}
)
.then(data => data.json())

.then(response => {
    console.log(response)
    
    let positions = document.querySelectorAll('.card > svg')
    //console.log("Hello Iam here",positions)
    let existingImagetags = document.querySelectorAll('.card > img')
    if(existingImagetags.length>0){
        existingImagetags.forEach(element => {
            element.remove()
                });
    }
    positions.forEach(element => {
    element.remove()
        });

    const divPositions = document.querySelectorAll('.card')
        console.log(divPositions)
    divPositions.forEach((ele,inde) => {
    let imageTag = document.createElement('img')
    imageTag.setAttribute('src', response.photos[inde].src.tiny)
    ele.prepend(imageTag)
    })

    let viewButton = document.querySelectorAll('.btn-group > button')
    viewButton.forEach((ele, ind) => {
        if(ind % 2 === 0)
        {
           ele.setAttribute('data-toggle', 'modal')
           ele.setAttribute('data-target', '#exampleModal' )
           
            ele.addEventListener('click', (e)=>showModel(e))
        }
    })

    let HideButton = document.querySelectorAll('.btn-group > button')
    HideButton.forEach((ele,ind) => {
        if(ind % 2 !== 0)
        {
            ele.innerText = `Hide`
            ele.addEventListener('click', (e) => {
                    let p = e.target.closest('.card')
                    p.remove()
            })
        }
    })

})


.catch(err => console.log(err))
  
    }
    