//body, gallery, and card variables
const body = document.getElementsByTagName('body')[0];
const gallery = document.getElementById('gallery');
const card = document.createElement('div');

//modal variables and initial modal setup
const modal=[]; //array to hold information for the modal's for each user
const modalDiv = document.createElement('div');
modalDiv.className="modal-container";
body.appendChild(modalDiv);
modalDiv.style.display='none';//hide the modal when the page loads


//function to abbreviate state names 
const stateAbr = state =>{ 
    if(state==="Alabama"){ 
        return "AL"; 
    }else if(state==="Alaska"){ 
        return "AK"; 
    } else if(state==="Arizona"){ 
        return "AZ"; 
    } else if(state==="Arkansas"){
        return "AR"; 
    } else if(state==="California"){
        return "CA"; 
    } else if(state==="Colorado"){
        return "CO"; 
    } else if(state==="Connecticut"){ 
        return "CT"; 
    } else if(state==="Delaware"){ 
        return "DE"; 
    } else if(state==="Florida"){ 
        return "FL"; 
    } else if(state==="Georgia"){ 
        return "GA"; 
    } else if(state==="Hawaii"){ 
        return "HI"; 
    } else if(state==="Idaho"){ 
        return "ID"; 
    } else if(state==="Illinois"){ 
        return "IL"; 
    } else if(state==="Indiana"){ 
        return "IN"; 
    } else if(state==="Iowa"){ 
        return "IA"; 
    } else if(state==="Kansas"){ 
        return "KS"; 
    } else if(state==="Kentucky"){ 
        return "KY"; 
    } else if(state==="Louisiana"){ 
        return "LA"; 
    } else if(state==="Maine"){ 
        return "ME"; 
    } else if(state==="Maryland"){ 
        return "MD"; 
    } else if(state==="Massachusetts"){ 
        return "MA"; 
    } else if(state==="Michigan"){ 
        return "MI"; 
    } else if(state==="Minnesota"){ 
        return "MN"; 
    } else if(state==="Mississippi"){ 
        return "MS"; 
    } else if(state==="Missouri"){ 
        return "MO"; 
    } else if(state==="Montana"){ 
        return "MT"; 
    } else if(state==="Nebraska"){ 
        return "NE"; 
    } else if(state==="Nevada"){ 
        return "NV"; 
    } else if(state==="New Hampshire"){ 
        return "NH"; 
    } else if(state==="New Jersey"){ 
        return "NJ"; 
    } else if(state==="New Mexico"){
        return "NM"; 
    } else if(state==="New York"){
         return "NY"; 
    } else if(state==="North Carolina"){ 
        return "NC"; 
    } else if(state==="North Dakota"){ 
        return "ND"; 
    } else if(state==="Ohio"){ 
        return "OH"; 
    } else if(state==="Oklahoma"){ 
        return "OK"; 
    } else if(state==="Oregon"){ 
        return "OR"; 
    } else if(state==="Pennsylvania"){ 
        return "PA"; 
    } else if(state==="Rhode Island"){ 
        return "RI"; 
    } else if(state==="South Carolina"){ 
        return "SC"; 
    } else if(state==="South Dakota"){ 
        return "SD"; 
    } else if(state==="Tennessee"){ 
        return "TN"; 
    } else if(state==="Texas"){ 
        return "TX"; 
    } else if(state==="Utah"){ 
        return "UT"; 
    } else if(state==="Vermont"){ 
        return "VT"; 
    } else if(state==="Virginia"){ 
        return "VA"; 
    } else if(state==="Washington"){ 
        return "WA"; 
    } else if(state==="West Virginia"){ 
        return "WV"; 
    } else if(state==="Wisconsin"){ 
        return "WI"; 
    } else if(state==="Wyoming"){ 
        return "WY"; 
    } else { 
        return state; 
    }
};

//function to get and display information about users once API's url is specified
const fetchData = url => {  
    fetch(url)
    .then(response=> response.json())
    .then(data=> {
        const results=data.results;
        addDataToHTML(results);
    })
};

//function that adds HTML elements to display the data received from the API request
const addDataToHTML = dataResults => { 
    let html;
    //create card HTML elements using the data from the API request
    for(let i=0; i<dataResults.length; i++){
        html=
            `<div id="card" class="card"> 
                <div class="card-img-container"> 
                    <img class="card-img" src="${dataResults[i].picture.medium}" alt="profile picture"> 
                </div> 
                <div class="card-info-container"> 
                    <h3 id="name" class="card-name cap">${dataResults[i].name.first} ${dataResults[i].name.last}</h3> 
                    <p class="card-text">${dataResults[i].email}</p> 
                    <p class="card-text cap">${dataResults[i].location.city}, ${stateAbr(dataResults[i].location.state)}</p> 
                </div> 
            </div>`; 
        gallery.innerHTML+=html;
    
        //for every round of the loop, modal for different employee added to modal array
        modal.push(
            `<div class="modal">
                <div class="modal-info-container">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <img class="modal-img" src="${dataResults[i].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${dataResults[i].name.first} ${dataResults[i].name.last}</h3>
                    <p class="modal-text">${dataResults[i].email}</p>
                    <p class="modal-text cap">${dataResults[i].location.city}</p>
                    <hr>
                    <p class="modal-text">${dataResults[i].cell.substring(0,5)} ${dataResults[i].cell.substring(6,14)}</p>
                    <p class="modal-text">${dataResults[i].location.street.number} ${dataResults[i].location.street.name}, ${dataResults[i].location.city}, ${stateAbr(dataResults[i].location.state)} ${dataResults[i].location.postcode}</p>
                    <p class="modal-text">Birthday: ${dataResults[i].dob.date.substring(5,7)}/${dataResults[i].dob.date.substring(8,10)}/${dataResults[i].dob.date.substring(2,4)}</p>
                </div>
            </div>`)
    }
};

//call the fetchData function, requesting 12 users from the US
fetchData('https://randomuser.me/api/?results=12&nat=us');

//event listener to display modals when card elements in the gallery are clicked 
gallery.addEventListener("click", event =>{ 
    const cardElement = event.target;

    //variable that will hold the name of the employee whose modal needs to be displayed
    let employeeToDisplay; 

    if(cardElement.className!=='gallery') {//the below code will only be run if the user clicks directly on one of the card elements 

        //conditional statements to find the name of the employee whose card the user clicked on
        if(cardElement.id==="name"){
            employeeToDisplay=cardElement.innerHTML;

        } else if (cardElement.id==="card") {
            employeeToDisplay=cardElement.children[1].children[0].innerHTML;

        } else if (cardElement.className==="card-img-container") {
            employeeToDisplay=cardElement.parentNode.children[1].children[0].innerHTML;

        } else if (cardElement.className==="card-img") {
            employeeToDisplay=cardElement.parentNode.parentNode.children[1].children[0].innerHTML;

        } else if (cardElement.className==="card-info-container") {
            employeeToDisplay=cardElement.children[0].innerHTML;

        } else if (cardElement.className==="card-text") {
            employeeToDisplay=cardElement.parentNode.children[0].innerHTML;

        } else if (cardElement.className==="card-text cap") {
            employeeToDisplay=cardElement.parentNode.children[0].innerHTML;
        }

        //for loop to loop through the array of employee modals to make sure that the modal that is displayed corresponds to the correct employee
        for(let j=0; j<modal.length; j++){
            if(modal[j].includes(employeeToDisplay)){
                modalDiv.innerHTML=modal[j];
                modalDiv.style.display='';
            }
        }
        //establishing the modal's close button as a child of the modal info container
        const closeButton = document.getElementById("modal-close-btn"); 
        const modalInfoContainer=document.getElementsByClassName('modal-info-container')[0];
        modalInfoContainer.appendChild(closeButton); 
        
        //event listener to close modal window once "X" button clicked
        closeButton.addEventListener("click", () => { 
            modalDiv.style.display='none'; 
            modalDiv.innerHTML='';
        });
    }
});