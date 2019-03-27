let players = [];
let plrCnt = players.length;
let Box, selCourseID, selCourse;
let playerNumBox;
getCourses();
function getCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Box = JSON.parse(this.responseText);
            document.getElementById('container').innerHTML =
                `<div class="card fadeIn" style="width: 18rem;"><div class="card-body" id="selectCourseCard"><h5 class="card-title">Select Course:</h5></div></div>`;
            for (let i = 0; i < Box.courses.length; i++) {
                selCourseID =  Box.courses[i].id;
                console.log(Box.courses[i].name);
                document.getElementById('selectCourseCard').innerHTML +=
                    `<div class="fadeIn"><a href="#" id='${Box.courses[i].id}' class="card-link" onclick="getCourse(this.id)">${Box.courses[i].name}</a></div>`
            }


        }
    };
    xhttp.open('GET', 'https://golf-courses-api.herokuapp.com/courses', true);
    xhttp.send();
}



function getCourse(courseid){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            selCourse = JSON.parse(this.responseText);
            //document.getElementById('container').innerHTML += `<div>${courseid}</div>`;
            console.log(selCourse);

            document.getElementById('container').innerHTML = `<div class="card fadeIn" style="width: 18rem;"><img src="${selCourse.data.thumbnail}" class="card-img-top" alt="Picture of ${selCourse.data.name}"><div class="card-body fadeIn" id="displayCourse"><h5 class="card-title">${selCourse.data.name}</h5><h6 class="card-subtitle text-muted">Address:</h6><p class="card-text">${selCourse.data.addr1}, ${selCourse.data.city}, ${selCourse.data.stateOrProvince}, ${selCourse.data.zipCode}</p><p class="card-text"><h6 class="card-subtitle text-muted">Phone:</h6>${selCourse.data.phone}</p><h6 class="card-subtitle text-muted">Course Type:</h6><p class="card-text">${selCourse.data.courseType}</p><h6 class="card-subtitle text-muted">Status:</h6><p class="card-text">${selCourse.data.status}</p><h6 class="card-subtitle text-muted">Holes:</h6><p class="card-text">${selCourse.data.holeCount}</p><a href="#" class="card-link" onclick="loadSelect()">Back</a><a href="#" class="card-link" onclick="inputPlayers()">Select</a></div></div>`
        }
    };
    xhttp.open('GET', 'https://golf-courses-api.herokuapp.com/courses/' + courseid, true);
    xhttp.send();
}






function loadSelect(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Box = JSON.parse(this.responseText);
            for (let i = 0; i < Box.courses.length; i++) {
                selCourseID =  Box.courses[i].id;
                console.log(Box.courses[i].name);
                document.getElementById('container').innerHTML =
                    `<div class="card fadeIn" style="width: 18rem;"><div class="card-body" id="selectCourseCard"><h5 class="card-title">Select Course:</h5></div></div>`;
                for (let i = 0; i < Box.courses.length; i++) {
                    selCourseID =  Box.courses[i].id;
                    console.log(Box.courses[i].name);
                    document.getElementById('selectCourseCard').innerHTML +=
                        `<div class="fadeIn"><a href="#" id='${Box.courses[i].id}' class="card-link" onclick="getCourse(this.id)">${Box.courses[i].name}</a></div>`;
                }
            }

        }
    };
    xhttp.open('GET', 'https://golf-courses-api.herokuapp.com/courses', true);
    xhttp.send();
}





function inputPlayers() {
    document.getElementById('container').innerHTML =
        `<div class="card fadeIn" style="width: 18rem;"><div class="card-body" id="selectCourseCard"><h5 class="card-title">Input Players:</h5></div></div>`;
    document.getElementById('selectCourseCard').innerHTML =
        `
<h5 class='card-title'>
<form>
  <div class="form-group" id="inputPBoxForm">
    <label for="playerNumBox">Number of Players:</label>
    <select style='margin-bottom: 5px;' class="form-control" id="playerNumBox" onchange="inputPBoxNum()" onload="inputPBoxNum()">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </select>
    <div id="aBomb"><div><label><input style="margin-top: 10px;" id="P0" value="P0" onchange="playerPush()"></label></div></div><a href="#" class="card-link" onclick="loadSelect()">Back</a><a href="#" class="card-link" onclick="playerPush()">Continue</a>
  </div>
</form>
</h5>`
}

function inputPBoxNum() {
    document.getElementById('aBomb').innerHTML = '';
    playerNumBox = document.getElementById('playerNumBox').value;
    for (let i = 0; i < playerNumBox; i++) {
        document.getElementById('aBomb').innerHTML += `<div><label><input style='margin-top: 10px;' id="P${i}" value="P${i}" onchange="playerPush()"></label></div>`
    }
    document.getElementById('aBomb').innerHTML += `<a href="#" class="card-link" onclick="loadSelect()">Back</a><a href="#" class="card-link" onclick="playerPush()">Continue</a>`;
}

function playerPush() {
    players = [];
    for (let i = 0; i < playerNumBox; i++) {
        players.push(document.getElementById(`P${i}`).value);
        console.log(document.getElementById(`P${i}`).value);
    }
    console.log(players);
}