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
         <div class="text-container">
             <h2 class="name">${name.first} ${name.last}</h2>
             <p class="email">${email}</p>
             <p class="address">${city}</p>
         </div>
        </div>
        `
    
   });
   gridCon.innerHTML = employeeHTML
}

function displayModal(index){
    let{ name, dob, phone, email, location:{ city, street, state, postcode},picture,} =employees[index];

    let date = new date(dob.date)

    const modalHtML = `
    <img class="avatar" src="${picture.large}" alt="">
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address"> ${street.name},${state.name},${postcode.name}</p>
        <p>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p></p>
    </div>
    `
    overlay.classList.remove('hidden')
    modalContainer.innerHTML = modalHtML
}

gridCon.addEventListener('click', e =>  {
    if (e.target !== gridCon){
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index')
        displayModal(index)
    }

})
