let employees = []
const APIUrl = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridCon = document.querySelector('.grid-container')
const overlay = document.querySelector('.overlay')
const modalContainer = document.querySelector('.modal-content')
const modalClose = document.querySelector('.modal-close')


fetch(APIUrl)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.then(err => console.log(err))



function displayEmployees(employeeData){
   employees = employeeData

   let employeeHTML = '';

   employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += 
   ` <div class="card" data-index="${index}">
         <img class="avatar" src="${picture.large}" alt="">
         <div class="text-container1">
             <h2 class="name">${name.first} ${name.last}</h2>
             <p class="email">${email}</p>
             <p class="address">${city}</p>
         </div>
        </div>
        `




        
    
   });
   gridCon.innerHTML = employeeHTML
   const search = document.querySelector('.searchbar')
const cards = document.querySelectorAll('.card .name');
const handleSearch = event => {

const searchTerm = event.target.value.toLowerCase();
cards.forEach(cards => {
    const text = cards.textContent.toLowerCase();
    const box = cards.parentElement.parentElement;


    
    if(text.includes(searchTerm)) {
      box.style.display = "flex";
     
    } else {
      box.style.display = "none";  
    }
  });
}
search.addEventListener('keyup', handleSearch);



   
}

function displayModal(index){
    let{ name, dob, phone, email, location:{ city, street, state, postcode},picture,} =employees[index];

    let date = new Date(dob.date)
    

    const modalHtML = `
    <img class="avatar" src="${picture.large}" alt="">
    <div class="text-container2">
        <span class="right-arrow"><</span>
        <span class="left-arrow"> ></span>
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address"> ${street.number} ${street.name},${state},${postcode}}</p>
        <p>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `
   
    overlay.classList.remove('hidden')
    
    
    modalContainer.innerHTML = modalHtML;
    
   

   
    
  

}


gridCon.addEventListener('click', e =>  {
    if (e.target !== gridCon){
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index')
        move = parseInt(index);

        
        console.log(move)
        displayModal(index)
        
        
    }
       
})

modalClose.addEventListener('click', ()=> {
    overlay.classList.add('hidden')
})

overlay.addEventListener('click', (event) =>{
    
    if(event.target.className === 'left-arrow') {
      
        if ( move === 11 ) {
          displayModal(0);
          move++;
        } else {
          move++;
          displayModal(move);
        }
          
      }
   
    
    
      if(event.target.className === 'right-arrow') {
      
        if ( move === 0 ) {
          displayModal(11);
          move--;
        } else {
          move--;
          displayModal(move);
        }
          
      }
   
    
   
})



// modalOverlay.addEventListener('click', (event) => {
//     if(event.target.className === 'right-arrow') {
//         let indexPosition = parseInt(modalOverlay
//         .firstElementChild.getAttribute('data-index'));
//         indexPosition += 1;
//         if (indexPosition < 12) {
//             modal(employees[indexPosition], indexPosition);
//         }
//     }
//     if(event.target.className === 'left-arrow') {
//         let indexPosition = parseInt(modalOverlay.
//         firstElementChild.getAttribute('data-index'));
//         indexPosition -= 1;
//         if (indexPosition > -1) {
//             modal(employees[indexPosition], indexPosition);
//         }
//     }
// });



    




