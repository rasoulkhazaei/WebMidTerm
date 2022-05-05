window.onload = function() {
    loadFilmLists(); /* load films list */
};
        
    

function loadFilmLists() {

    var url = "https://swapi.dev";
    fetch(url + "/api/films/") // fetch films list
        .then(function(response) {
            return response.json();
        }
        ).then(function(data) {
            fetch_films(data);
        } ).catch(function(error) {
            console.log(error);
        }
        );
    
}

function fetch_films(data){
    i = 1
    data.results.forEach(film => {  // for each film in the list
        update_list(film)
    });
}

function update_list(film){ // change the list that show the films
    let t = document.createElement('div');  // create a div for title
    let e = document.createElement('div'); // create a div for episode
    let d = document.createElement('div'); // create a div for date
    t.innerHTML = film['title'];
    e.innerHTML = 'episode_id:  ' + film['episode_id'];
    d.innerHTML = film['release_date'];
    document.getElementById('f' + film['episode_id']).innerHTML = t.innerHTML;
    document.getElementById('f' + film['episode_id'] + 'ep').innerHTML = e.innerHTML;
    document.getElementById('f' + film['episode_id'] + 'date').innerHTML = d.innerHTML;
}
var liststart = 0;
var starlist = []

function showshipbtn(ep) {  // show the button for show the ships list
    
        let a = document.createElement('div');
        a.innerHTML = "showshipbtn";
        // document.getElementById('parent-div').innerHTML = ""; // clear the div
        var url = "https://swapi.dev/api/films";
        fetch(url + "/" + ep)
            .then(function(response) {
                return response.json();
            }
            ).then(function(data) {
                starlist = data;
                showStarShips(data.starships, ep);

            } ).catch(function(error) {
                console.log(error);
            }
            );


    console.log(ep);

}
var previous_page = 0;
function showStarShips(ships, ep) { // show the ships list in window
    document.getElementById('parent-div').innerHTML = "" // clear the div
    var shipDetailBtn = []
    var shipDetailP = []
    var t = []
    var ship = [];
    if (liststart ==  ships.length - 1) {
        liststart = previous_page;
    }
    previous_page = liststart;
    var start = liststart;
    for (let index = liststart; index < Math.min(start + 8, ships.length); index++) {
        liststart = index;
        var d = document.createElement('div'); // create a div for show each ship
        d.setAttribute('class', 'column');
        d.setAttribute('id', 'grid-item' + index);
        document.getElementById('parent-div').appendChild(d);
        
        shipDetailP[index] = document.createElement('p'); // for show the ship name
            fetch(ships[index]). // fetch the ship detail
            then(function(response) {
                return response.json();
            }
            ).then(function(data) {
                shipDetailP[index].innerHTML =  "____" + data.name;
                ship[index] = data;
            } ).catch(function(error) {
                console.log(error);
            });
        
        shipDetailBtn[index] = document.createElement('button'); // for show the ship detail
        shipDetailBtn[index].setAttribute('class', 'starbtn');
        shipDetailBtn[index].innerHTML = "show";
        shipDetailBtn[index].onclick = function() {
            liststart = 0;
            // previous_page = 0;
            showstardetail(ship[index], ships, ep);
        };
        shipDetailBtn[index].onmouseover = function() {
            
            shipDetailBtn[index].style.backgroundColor = "red";
        }
        shipDetailBtn[index].onmouseout = function() {
            shipDetailBtn[index].style.backgroundColor = "";
        }
        
       

        document.getElementById('grid-item' + index).appendChild(shipDetailBtn[index]);
        // document.getElementById('t' + index).appendChild(a[index]);
        document.getElementById('grid-item' + index).appendChild(shipDetailP[index]);
    }
    let backBtn = document.createElement('button'); // back to the previous page button
    backBtn.setAttribute('class', 'starbtn');
    backBtn.innerHTML = "Back";
    backBtn.onmouseover = function() {
        backBtn.style.backgroundColor = "red";
    }
    backBtn.onmouseout = function() {
        backBtn.style.backgroundColor = "";
    }
    backBtn.onclick = function() {
        // document.getElementById('parent-div').innerHTML = "";
        liststart = 0;
        history.go(); // go back to the previous page
    }
    document.getElementById('parent-div').appendChild(backBtn); 
    let prevPage = document.createElement('button'); // create a button for previous page
    prevPage.setAttribute('class', 'starbtn');
    prevPage.innerHTML = "previous Page";
    prevPage.onmouseover = function() {
        prevPage.style.backgroundColor = "red";
    }
    prevPage.onmouseout = function() {
        prevPage.style.backgroundColor = "";
    }
    prevPage.onclick = function() {
        // document.getElementById('parent-div').innerHTML = "";
        liststart -= 8;
        if(liststart >= 0){
            liststart = 0;
            showStarShips(ships, ep);
        } else {
            liststart = 0;
            previous_page = 0;
        }
    }
    document.getElementById('parent-div').appendChild(prevPage);
    let nextPage = document.createElement('button'); // create a button for next page
    nextPage.setAttribute('class', 'starbtn');
    nextPage.innerHTML = "Next Page";
    nextPage.onmouseover = function() {
        nextPage.style.backgroundColor = "red";
    }
    nextPage.onmouseout = function() {
        nextPage.style.backgroundColor = "";
    }
    nextPage.onclick = function() {
        // document.getElementById('parent-div').innerHTML = "";
        // liststart = 0;
        if (liststart < ships.length - 1) {
            showStarShips(ships, ep);
        }
    }
    document.getElementById('parent-div').appendChild(nextPage);
    if(liststart != ships.length - 1){
        previous_page = liststart - 8;
    }



}

function showstardetail(ship, ships, ep){ // show the ship detail 
    // first col features second col values
    document.getElementById('parent-div').innerHTML = ""
    tbl = document.createElement('table');
    tbl.style.width = '100px';
    tbl.style.border = '1px solid black';
    var r = ['name', 'model', 'manufacturer', 'crew', 'passengers']
    
    for (let i = 0; i < 5; i++) {
        const tr = tbl.insertRow();
        td = tr.insertCell();
        td.appendChild(document.createTextNode(`${r[i]}`));// feature
        td.style.border = '1px solid black';
        td.style.backgroundColor = 'green';
        td = tr.insertCell();
        td.appendChild(document.createTextNode(`${ship[r[i]]}`));//value
        td.style.border = '1px solid black';
        td.style.backgroundColor = 'red';
    }
    if(ship.films.length > 0){ // for show films of ship
        
        // td.style.width = 'fit-content'
        for (let index = 0; index < ship.films.length; index++) {
            const tr = tbl.insertRow();
            td = tr.insertCell();
            td.appendChild(document.createTextNode(`films ${index+1}`));
            td.style.border = '1px solid black';
            td.style.backgroundColor = 'green';
            const film = ship.films[index];
            
            fetch(film).
            then(function(response) { // fetch the film detail
                return response.json();
            }
            ).then(function(data) {
                td = tr.insertCell();
                td.appendChild(document.createTextNode(`${data.title}`));
                td.style.border = '1px solid black';
                td.style.backgroundColor = 'red';
                // td.style.width = 'fit-content'
            });
        }}
    document.getElementById('parent-div').appendChild(tbl)
    var btn = document.createElement('button'); // back to the previous page button
    btn.setAttribute('class', 'starbtn');
    btn.innerHTML = "Back";
    btn.onmouseover = function() {
        btn.style.backgroundColor = "red";
    }
    btn.onmouseout = function() {
        btn.style.backgroundColor = "";
    }
    btn.onclick = function() {
        showshipbtn(ep)
    }
    document.getElementById('parent-div').appendChild(btn);

}