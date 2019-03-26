let players = [];
let Box, selCourse;
getCourses();
function getCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Box = JSON.parse(this.responseText);
            for (let i = 0; i < Box.courses.length; i++) {
                console.log(Box.courses[i].name);
                document.getElementById('selectCourse').innerHTML +=
                    `<div>${Box.courses[i].name}</div>`
            }

        }
    };
    xhttp.open('GET', 'https://golf-courses-api.herokuapp.com/courses', true);
    xhttp.send();
}



/*
function getCourse(courseid, mybtn){
    let card = $(mybtn).parent();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            selCourse = JSON.parse(this.responseText);
            console.log(selCourse);
            $(card).append(`<div>Found It</div>`);
        }
    };
    xhttp.open('GET', 'https://golf-courses-api.herokuapp.com/courses/' + courseid, true);
    xhttp.send();
}*/