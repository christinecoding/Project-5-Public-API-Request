
const body=document.getElementsByTagName('body')[0];

//gallery variables
const gallery = document.getElementById('gallery');
const card = document.createElement('div');

//make event.target variable global for testing for the time being 
let cardElement;
let employeeToDisplay;
let modalToDisplay;
const galleryArray = [];
let html;
const modal=[];
//let closeButton;


//modal variables
const modalDiv = document.createElement('div');
modalDiv.className="modal-container";

body.appendChild(modalDiv);
modalDiv.style.display='none';


//function to abbreviate state names in modal
const stateAbr = state =>{
    if(state==="Alabama"){
        return "AL";
    } if(state==="Alaska"){
        return "AK";
    } if(state==="Arizona"){
        return "AZ";
    } if(state==="Arkansas"){
        return "AR";
    } if(state==="California"){
        return "CA";
    } if(state==="Colorado"){
        return "CO";
    } if(state==="Connecticut"){
        return "CT";
    } if(state==="Delaware"){
        return "DE";
    } if(state==="Florida"){
        return "FL";
    } if(state==="Georgia"){
        return "GA";
    } if(state==="Hawaii"){
        return "HI";
    } if(state==="Idaho"){
        return "ID";
    } if(state==="Illinois"){
        return "IL";
    } if(state==="Indiana"){
        return "IN";
    } if(state==="Iowa"){
        return "IA";
    } if(state==="Kansas"){
        return "KS";
    } if(state==="Kentucky"){
        return "KY";
    } if(state==="Louisiana"){
        return "LA";
    } if(state==="Maine"){
        return "ME";
    } if(state==="Maryland"){
        return "MD";
    } if(state==="Massachusetts"){
        return "MA";
    } if(state==="Michigan"){
        return "MI";
    } if(state==="Minnesota"){
        return "MN";
    } if(state==="Mississippi"){
        return "MS";
    } if(state==="Missouri"){
        return "MO";
    } if(state==="Montana"){
        return "MT";
    } if(state==="Nebraska"){
        return "NE";
    } if(state==="Nevada"){
        return "NV";
    } if(state==="New Hampshire"){
        return "NH";
    } if(state==="New Jersey"){
        return "NJ";
    } if(state==="New York"){
        return "NY";
    } if(state==="North Carolina"){
        return "NC";
    } if(state==="North Dakota"){
        return "ND";
    } if(state==="Ohio"){
        return "OH";
    }    if(state==="Oklahoma"){
        return "OK";
    }    if(state==="Oregon"){
        return "OR";
    }    if(state==="Pennsylvania"){
        return "PA";
    }    if(state==="Rhode Island"){
        return "RI";
    }    if(state==="South Carolina"){
        return "SC";
    }    if(state==="South Dakota"){
        return "SD";
    }    if(state==="Tennessee"){
        return "TN";
    }    if(state==="Texas"){
        return "TX";
    }    if(state==="Utah"){
        return "UT";
    }    if(state==="Vermont"){
        return "VT";
    }    if(state==="Virginia"){
        return "VA";
    }    if(state==="Washington"){
        return "WA";
    }    if(state==="West Virginia"){
        return "WV";
    }    if(state==="Wisconsin"){
        return "WI";
    }    if(state==="Wyoming"){
        return "WY";
    }  else {
        return state;
    }
};






const fetchData = url => {  
    fetch(url)
    .then(response=> response.json())
    .then(data=> {
        const results=data.results;
        addDataToHTML(results);
    })
    };

    const addDataToHTML = dataResults => { 
  
    for(let i=0; i<dataResults.length; i++){
    
    html=
        `<div id="card" class="card"> 
    <div class="card-img-container"> 
    <img class="card-img" src="${dataResults[i].picture.medium}" alt="profile picture"> 
    </div> 
    <div class="card-info-container"> 
    <h3 id="name" class="card-name cap">${dataResults[i].name.first} ${dataResults[i].name.last}</h3> 
    <p class="card-text">${dataResults[i].email}</p> 
    <p class="card-text cap">${dataResults[i].location.city}, ${dataResults[i].location.state}</p> 
    </div> 
    </div>`; 
    gallery.innerHTML+=html;
    galleryArray.push(html);
   
    modal.push(`<div class="modal">
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
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`)
    
    }
};

fetchData('https://randomuser.me/api/?results=12&nat=us');

// console.log(fetch('https://randomuser.me/api/?results=12&nat=us').then(response=> response.json()).then(data => data.results));

gallery.addEventListener("click", event =>{ 
    cardElement = event.target;
    
    if(cardElement.className!=='gallery') { 
    //conditional statements to find the name of the employee whose card was clicked on
        if(cardElement.id==="name"){
        employeeToDisplay=cardElement.innerHTML;

    }else if (cardElement.id==="card") {
        employeeToDisplay=cardElement.children[1].children[0].innerHTML;

    }else if (cardElement.className==="card-img-container") {
        employeeToDisplay=cardElement.parentNode.children[1].children[0].innerHTML;

    }else if (cardElement.className==="card-img") {
        employeeToDisplay=cardElement.parentNode.parentNode.children[1].children[0].innerHTML;

    }else if (cardElement.className==="card-info-container") {
        employeeToDisplay=cardElement.children[0].innerHTML;

    }else if (cardElement.className==="card-text") {
        employeeToDisplay=cardElement.parentNode.children[0].innerHTML;

    }else if (cardElement.className==="card-text cap") {
        employeeToDisplay=cardElement.parentNode.children[0].innerHTML;
    }

    for(let j=0; j<modal.length; j++){
        if(modal[j].includes(employeeToDisplay)){

            modalDiv.innerHTML=modal[j];
            modalDiv.style.display='';
        }

    /****** 
     * the next and prev buttons are not working. no matter where I put the buttons block of code (ie inside or outside of this loop or inside or outside of the gallery event listener), I get TypeError: Cannot read property 'addEventListener' of null. 
     * 
     * I got a similar error for the modalBtnContainer append child commented out functions below for example TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'. (I also tried it without all the appendChild code but I still got an error message) When I check the value of the DOM element they seem to represent the correct div or other element and when I do typeof modalDiv for example it tells me that it's an object. I know my modal[j+-1] method might not work but before I work more on it, I want to at least make sure that the button event listener is setup. 
    */
        const nextButton = document.getElementById("modal-prev");
        const prevButton = document.getElementById("modal-next");
        const modalBtnContainer=document.getElementsByClassName('modal-btn-container')[0];
        modalDiv.appendChild(modalBtnContainer); 
        modalBtnContainer.appendChild(nextButton); 
        modalBtnContainer.appendChild(prevButton); 
        
        nextButton.addEventListener("click", () => { 
            modalDiv.innerHTML===`${modal[j+1]}`;

       });
       prevButton.addEventListener("click", () => { 
            modalDiv.innerHTML===`${modal[j-1]}`;
    });
       
    }
  
        const closeButton = document.getElementById("modal-close-btn"); 
        const modalInfoContainer=document.getElementsByClassName('modal-info-container')[0];
        modalInfoContainer.appendChild(closeButton); 
        
    closeButton.addEventListener("click", () => { 
        modalDiv.style.display='none'; 
        modalDiv.innerHTML='';
   });
}
});
