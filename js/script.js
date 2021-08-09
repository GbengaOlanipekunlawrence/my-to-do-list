// Business Logic for To Do Lists ---------
function ToDoList() {
    this.todolists = {};
    this.currentId = 0;
}

ToDoList.prototype.addtodolist = function (list) {
    list.id = this.assignId();
    this.todolists[list.id] = list;
};

ToDoList.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

ToDoList.prototype.findList = function (id) {
    if (this.todolists[id] != undefined) {
        return this.todolists[id];
    }
    return false;
};

ToDoList.prototype.deleteList = function (id) {
    if (this.todolists[id] === undefined) {
        return false;
    }
    delete this.todolists[id];
    return true;
};

// Business Logic for Lists ---------
function List(whattodo, whentodoit, timetodoit, notes) {
    this.whattodo = whattodo;
    this.whentodoit = whentodoit;
    this.timetodoit = timetodoit;
    this.notes = notes;
}

List.prototype.whatandwhen = function () {
    return this.whattodo + " " + this.whentodoit;
};

// User Interface Logic ---------
let toDoList = new ToDoList();

function displayListDetails(toDoListToDisplay) {
    let toDoList = $("ul#lists");
    let htmlForListInfo = "";
    Object.keys(toDoListToDisplay.todolists).forEach(function (key) {
        const list = toDoListToDisplay.findList(key);
        htmlForListInfo +=
            "<li id=" +
            list.id +
            ">" +
            list.whattodo +
            " " +
            list.whentodoit +
            "</li>";
    });
    toDoList.html(htmlForListInfo);
}
function showList(listId) {
    const todolist = toDoList.findList(listId);
    $("#show-list").show();
    $(".whatToDo").html(todolist.whattodo);
    $(".whenToDoIt").html(todolist.whentodoit);
    $(".timeToDoIt").html(todolist.timetodoit);
    $(".notes").html(todolist.notes);
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id='+ place.id +'>Done</button");
}

function attachListListeners() {
    $("ul#lists").on("click", "li", function () {
        showList(this.id); // <--- This is new!
    });
    // Code below here is new!
    $("#buttons").on("click", ".deleteButton", function () {
        toDoList.deleteList(this.id);
        $("#show-list").hide();
        displayListDetails(toDoList);
    });
}

$(document).ready(function () {
    attachListListeners();
    $("form#new-List").submit(function (event) {
        event.preventDefault();
        const inputtedwhattodo = $("#new-whattodo").val();
        const inputtedwhentodoit = $("#new-whentodoit").val();
        const inputtedtimetodoit = $("#new-timetodoit").val();
        const inputtednotes = $("#new-notes").val();
        // The next three lines are new:
        $("#new-whattodo").val("");
        $("#new-whentodoit").val("");
        $("#new-timetodoit").val("");
        $("#new-notes").val("");

        let newList = new List(
            inputtedwhattodo,
            inputtedwhentodoit,
            inputtedtimetodoit,
            inputtednotes
        );

        toDoList.addtodolist(newList);
        displayListDetails(toDoList);
        console.log(toDoList);
    });
});
