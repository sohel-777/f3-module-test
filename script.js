let title = document.querySelector(".heading");
let img1 = document.querySelector(".img");
let pictureDetails = document.querySelector(".para");

let arr = [];

function getCurrentImageOfTheDay(){
    let date = new Date().toISOString().split("T")[0];
   
    fetch(`https://api.nasa.gov/planetary/apod?api_key=AcFkdizrQGOrJSxn1q4PCSfpkzRRaGyBOVGOnbWm&date=${date}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            title.innerHTML = `<h1>NASA's Picture Of The Day: ${data.date} </h1>`;
            img1.innerHTML = `<img src="${data.hdurl}">`;
            pictureDetails.innerHTML = `<h3>${data.title} </h3> <p> ${data.explanation} </p>`;
        })
    
    
}
getCurrentImageOfTheDay();

let searchDate = document.querySelector("#search-input");
let btn = document.querySelector("#search");
btn.addEventListener("click", getImageOfTheDay);

function getImageOfTheDay(){
    let newDate = searchDate.value;
    console.log(newDate)
    
    fetch(`https://api.nasa.gov/planetary/apod?api_key=AcFkdizrQGOrJSxn1q4PCSfpkzRRaGyBOVGOnbWm&date=${newDate}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            title.innerHTML = `<h1>Picture On ${data.date} </h1>`;
            img1.innerHTML = `<img src="${data.hdurl}">`;
            pictureDetails.innerHTML = `<h3>${data.title} </h3> <p> ${data.explanation} </p>`;
        })
    
    saveSearch(newDate);
    addSearchToHistory(newDate);
}
let searchResult = document.querySelector("#search-result");
function saveSearch(newDate){
    arr.push(newDate);
    localStorage.setItem("searches", JSON.stringify(arr));

    
    
}
function addSearchToHistory(newDate){
    let searchHistory = JSON.parse(localStorage.getItem("searches"));
    console.log();

    const myHtml=searchHistory.map((item)=>{
        const temp= item.split("-")
        return`
        <li><a href="#" onclick="getUserDate(${temp[0]}, ${temp[1]} ,${temp[2]})">${temp[0]}-${temp[1]}-${temp[2]}</a> </li>
        `
    })
    
    searchResult.innerHTML = myHtml.join(" ");
    console.log(searchDate)
}

function getUserDate(year, month,date){
    console.log(year,month,date);
    fetch(`https://api.nasa.gov/planetary/apod?api_key=AcFkdizrQGOrJSxn1q4PCSfpkzRRaGyBOVGOnbWm&date=${year}-${month}-${date}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
           
            title.innerHTML = `<h1>Picture On ${data.date} </h1>`;
            img1.innerHTML = `<img src="${data.hdurl}">`;
            pictureDetails.innerHTML = `<h3>${data.title} </h3> <p> ${data.explanation} </p>`;
        })
}