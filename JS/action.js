let players = [];
let donut;
let plrCnt = players.length;
let Box, selCourseID, selCourse, selCourseHoles;
let totalScore = 0;
//let yardage;
let tBox;
let playerNumBox;
getCourses();
function getCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Box = JSON.parse(this.responseText);
            document.getElementById('container').innerHTML =
                `<div class="card fadeIn codex"><div class="card-body" id="selectCourseCard"><h5 class="card-title">Select Course:</h5></div></div>`;
            for (let i = 0; i < Box.courses.length; i++) {
                selCourseID =  Box.courses[i].id;
                //console.log(Box.courses[i].name);
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
            selCourseHoles = selCourse.data.holes;
            console.log(selCourseHoles);
            //tBox = selCourse.data.holes[].teeBoxes;
            document.getElementById('container').innerHTML = `<div class="card fadeIn codex"><img src="${selCourse.data.thumbnail}" style='width: 22rem' class="card-img-top" alt="Picture of ${selCourse.data.name}"><div class="card-body fadeIn" id="displayCourse"><h5 class="card-title">${selCourse.data.name}</h5><h6 class="card-subtitle text-muted">Address:</h6><p class="card-text">${selCourse.data.addr1}, ${selCourse.data.city}, ${selCourse.data.stateOrProvince}, ${selCourse.data.zipCode}</p><p class="card-text"><h6 class="card-subtitle text-muted">Phone:</h6>${selCourse.data.phone}</p><h6 class="card-subtitle text-muted">Course Type:</h6><p class="card-text">${selCourse.data.courseType}</p><h6 class="card-subtitle text-muted">Status:</h6><p class="card-text">${selCourse.data.status}</p><h6 class="card-subtitle text-muted">Holes:</h6><p class="card-text">${selCourse.data.holeCount}</p><a href="#" class="card-link" onclick="loadSelect()">Back</a><a href="#" class="card-link" onclick="inputPlayers()">Select</a></div></div>`
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
                //console.log(Box.courses[i].name);
                document.getElementById('container').innerHTML =
                    `<div class="card fadeIn"><div class="card-body" id="selectCourseCard"><h5 class="card-title">Select Course:</h5></div></div>`;
                for (let i = 0; i < Box.courses.length; i++) {
                    selCourseID =  Box.courses[i].id;
                    //console.log(Box.courses[i].name);
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
        `<div class="card fadeIn codex"><div class="card-body" id="selectCourseCard"><h5 class="card-title">Input Players:</h5></div></div>`;
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
    <div id="aBomb"><div><label><input class='fadeIn' style="margin-top: 10px;" id="P0" onchange="playerPush()" oninput="playerPush()" onload="playerPush()"></label></div><a href="#" class="card-link" onclick="loadSelect()">Back</a><a href="#" class="card-link" onclick="createCard()">Continue</a></div>
  </div>
</form>
</h5>`
}

function inputPBoxNum() {
    document.getElementById('aBomb').innerHTML = '';
    playerNumBox = document.getElementById('playerNumBox').value;
    for (let i = 0; i < playerNumBox; i++) {
        document.getElementById('aBomb').innerHTML += `<div><label><input class='fadeIn' style='margin-top: 10px;' id="P${i}" onchange="playerPush()" oninput="playerPush()" onload="playerPush()"></label></div>`
    }
    document.getElementById('aBomb').innerHTML += `<a href="#" class="card-link" onclick="loadSelect()">Back</a><a href="#" class="card-link" onclick="createCard()">Continue</a>`;
}

function playerPush() {
    players = [];
    players.push(document.getElementById(`P0`));
    for (let i = 1; i < playerNumBox; i++) {
        players.push(document.getElementById(`P${i}`));
        //console.log(document.getElementById(`P${i}`));
    }
    //console.log(players);
}




function createCard() {
    document.getElementById('selectCourseCard').innerHTML =
        `
<div class="rowCont">
<div class="card" id='scorecard' style="flex-direction: row;">
<div id="holeCol">
  <div class="card-header">
    Holes
  </div>
</div>
<div id="HCap">
<div class="card-header">
H-Cap
</div>
</div>
<div id="Tee">
<div class="card-header">
Tee
</div>
</div>
</div>
</div>

`;

    for (let i = 0; i < players.length; i++) {
        document.getElementById('scorecard').innerHTML += `
<div id="playerCol${i}">

</div>`
    }


    for (let i = 0; i < selCourseHoles.length; i++) {

        //document.getElementById('yardage').innerHTML += `<li class="list-group-item">${selCourse.data.holes[i].teeBoxes[tBox].yards}</li>`;

        document.getElementById('holeCol').innerHTML += `<li class="list-group-item">H${i + 1}</li>`;

    }
    for (let i = 0; i < players.length; i++) {
        donut = i;
        document.getElementById(`playerCol${donut}`).innerHTML += `
<div id='P${donut}' class="card-header">
${players[donut].value}
</div>
`;

        for (let i = 0; i < selCourseHoles.length; i++) {
            document.getElementById(`playerCol${donut}`).innerHTML += `<li id='P${donut}H${i}Z' class="list-group-item"><input type='number' class='zucc' id="P${donut}H${i}" value="0" oninput="updateScore()" onchange="updateScore()"></li>`

        }
    }
    document.getElementById('holeCol').innerHTML += `<li class='list-group-item'>Total:</li>`;
    document.getElementById('holeCol').innerHTML += `<li class='list-group-item'>Note:</li>`;
    for (let i = 0; i < players.length; i++) {
        document.getElementById(`playerCol${i}`).innerHTML += `<li class='list-group-item' id="total${players[i].value}">0</li>`;
        document.getElementById(`playerCol${i}`).innerHTML += `<li class='list-group-item' id="note${players[i].value}">OK</li>`
    }
}

function updateScore() {
    totalScore = 0;
    let cheese;


    for (let i = 0; i < players.length; i++) {
        totalScore = 0;
        for (let j = 0; j < selCourseHoles.length; j++) {
            cheese = parseInt(document.getElementById(`P${i}H${j}`).value);
            console.log(cheese);
            if (document.getElementById(`P${i}H${j}`).value.length == 0) {
                cheese = 0;
                document.getElementById(`P${i}H${j}`).value = 0;
                console.log(cheese);
                totalScore = totalScore + parseInt(cheese);
            } else {
                totalScore = totalScore + parseInt(cheese);
            }

        }
        document.getElementById(`total${players[i].value}`).innerText = totalScore;
        if (totalScore > 0) {
            document.getElementById(`note${players[i].value}`).innerText = '✓';
        } else {
            if (totalScore < 0) {
                document.getElementById(`note${players[i].value}`).innerText = '✘';
            } else {
                document.getElementById(`note${players[i].value}`).innerText = 'OK';
            }
        }
    }

}