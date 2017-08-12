var storage = window.localStorage;
function  student(name, sex,studentId, grade, major) {
  this.name = name || null;
  this.sex =  sex || null;
  this.studentId = studentId || null;
  this.grade =  grade || null;
  this.major =  major || null;
}

function addStu() {
    var data = JSON.parse(storage.getItem("studentSys"));
    if (data == null) {
        data = new Array();
    }
    var stu = new student();
    stu.name =$('#name').val().$.trim();
    stu.sex = $('#sex').val().$.trim();
    stu.studentId =d$('#studentId').val().$.trim();
    stu.grade =  $('#grade').val().trim();
    stu.major =  $('major').val().trim();
    if (Judge(stu)) {
        data[stu.id] = stu;
        storage.setItem("studentSys", JSON.stringify(data));
        alert("success!");
    }
}

function Judge(student) {
    if (student.name == "") {
        alert("name can't be none !");
        return false;
    } else if (student.id == "") {
        alert("id can't be none!");
        return false;
    } else {
        return true;
    }
}

function searchStu() {
    var id = $("#tid").val().trim();
    var stu = JSON.parse(storage.getItem("studentSys"))[id];
    if (stu == null) {
        alert("the student was not exist!");
        $("#searchPut").html("");
    } else {
        $("#searchPut").html("<tr><td>" + stu.name + "</td><td>" + stu.sex + "</td><td>" + stu.id + "</td><td>" + stu.grade + "</td><td>" + stu.major + "</td></tr>");
   }
}

function delStu() {
    var id = $("#did").val().trim();
    var data = JSON.parse(storage.getItem("studentSys"));
    if (data[id] == null) {
        alert("the student was not exist!");
    } else {
        data[id] = null;
        storage.setItem("studentSys", JSON.stringify(data));
        alert("delete Successed!");
    }
}
function FormShow() {
    var id = $("#tid").val().trim();
    var data = JSON.parse(storage.getItem("studentSys"));
    if (data[id] == null) {
        alert("the student was not exist!");
        $(".Form").hide();
    } else {
        $(".Form").fadeIn("slow");
    }
}

function change() {
    var id = $("#eId").val().trim();
    var data = JSON.parse(storage.getItem("studentSys"));
    if ($("#eName").val().trim() != "") {
        data[id].name = $("cName").val().trim();
        data[id].sex =  $("cSex").val().trim();
        data[id].grade =  $("cGrade").val().trim();
        data[id].major =  $("cMajor").val().trim();
        storage.setItem("studentSys", JSON.stringify(data));
        alert("change successed!");
    } else {
        alert("name can't be none !");
    }
}
function showAllinfo(){
    var data = JSON.parse(storage.getItem("stuSys"));
    var outputer = $("#showAll");
    if (data == null) {
        outputer.empty();
    } else {
    outputer.empty();
    for (var i in data) {
        if (data[i] != null) {
            outputer.append("<tr><td>" + data[i].name + "</td><td>" + data[i].sex + "</td><td>" + data[i].id + "</td><td>" + data[i].grade + "</td><td>" + data[i].subject + "</td></tr>");
        }
    }
}
}

function addShow(){
    $('.add').fadeIn('slow');
    $('.search').hide();
    $('.del').hide();
    $('.change').hide();
    $('all').hide();
}
function searchShow(){
    $('.add').hide();
    $('.search').fadeIn('slow');
    $('.del').hide();
    $('.change').hide();
    $('all').hide();
}
function delShow(){
    $('.add').hide();
    $('.search').hide();
    $('.del').fadeIn('slow');
    $('.change').hide();
    $('all').hide();
}
function changeShow(){
    $('.add').hide();
    $('.search').hide();
    $('.del').hide();
    $('.change').fadeIn('slow');
    $('all').hide();
}
function allShow(){
    $('.add').hide();
    $('.search').hide();
    $('.del').hide();
    $('.change').hide();
    $('all').fadeIn('slow');
}