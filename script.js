//Selectors//
const infoInput = document.querySelector('.info-input');
const infoButton = document.querySelector('.info-button');
const infoList = document.querySelector('.info-list');
const filterOption = document.querySelector('.filter-info');

//Event Listeners//
document.addEventListener('DOMContentLoaded', getInfos);
infoButton.addEventListener("click", addInfo);
infoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterInfo);

//Functions//
function addInfo(event) {
    //Prevent form from submitting//
    event.preventDefault();
    //Info div//
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");
    //Create li//
    const newInfo = document.createElement('li');
    newInfo.innerText = infoInput.value;
    newInfo.classList.add('info-item');
    infoDiv.appendChild(newInfo);
    //Add info to local storage//
    saveLocalInfos(infoInput.value);
    //Check button//
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>'
    completedButton.classList.add("complete-btn");
    infoDiv.appendChild(completedButton);
    //Minus button//
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
    trashButton.classList.add("trash-btn");
    infoDiv.appendChild(trashButton);
    //Append to list//
    infoList.appendChild(infoDiv);
    //Clear input value//
    infoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //Delete info//
    if (item.classList[0] === 'trash-btn') {
        const info = item.parentElement;
        //Animation//
        info.classList.add("fall");
        removeLocalInfos(todo);
        info.addEventListener('transitionend', function () {
            info.remove();
        });
    }

    //Check mark//
    if (item.classList[0] === "complete-btn") {
        const info = item.parentElement;
        info.classList.toggle('completed');
    }
}

function filterInfo(e) {
    const infos = infoList.childNodes;
    infos.forEach(function(info){
        switch(e.target.value){
            case "all":
                info.style.display = "flex";
                break;
            case "completed":
                if(info.classList.contains('completed')){
                    info.style.display = 'flex';
                } else {
                    info.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!info.classList.contains('completed')){
                    info.style.display = "flex";
                }else {
                    info.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalInfos(info){
    let infos;
    if(localStorage.getItem('infos') === null){
        infos = [];
    } else {
        infos = JSON.parse(localStorage.getItem('infos'));
    }
    infos.push(info);
    localStorage.setItem('infos', JSON.stringify(infos));
}

function getInfos(){
    console.log("hello");

    let infos;
    if(localStorage.getItem('infos') === null){
        infos = [];
    } else {
        infos = JSON.parse(localStorage.getItem('infos'));
    }
    infos.forEach(function(info){
        //Info div//
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");
        //Create li//
        const newInfo = document.createElement('li');
        newInfo.innerText = info;
        newInfo.classList.add('info-item');
        infoDiv.appendChild(newInfo);
        //Check button//
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check-square"></i>'
        completedButton.classList.add("complete-btn");
        infoDiv.appendChild(completedButton);
        //Minus button//
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
        trashButton.classList.add("trash-btn");
        infoDiv.appendChild(trashButton);
        //Append to list//
        infoList.appendChild(infoDiv);
    });
}

function removeLocalInfos(info){
    let infos;
    if(localStorage.getItem('infos') === null){
        infos = [];
    } else {
        infos = JSON.parse(localStorage.getItem('infos'));
    }
    const infoIndex = info.children[0].innerText;
    infos.splice(infos.indexOf(infoIndex), 1);
    localStorage.setItem('infos', JSON.stringify(infos));
}

