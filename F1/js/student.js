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
  stu.name =document.getElementById("name").value;
  stu.sex = document.getElementById("sex").value;
  stu.studentId =document.getElementById("studentId").value;
  stu.grade =  document.getElementById("grade").value;
  stu.major =  document.getElementById("major").value;
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
  var id = document.getElementById("tid");
  var stu = JSON.parse(storage.getItem("studentSys"))[id];
  if (stu == null) {
    alert("the student was not exist!");
  } else {
    document.getElementById("sName").innerHtml()=stu.name;
    document.getElementById("sSex").innerHtml()=stu.sex;
    document.getElementById("sId").innerHtml()=stu.studentId;
    document.getElementById("sGrade").innerHtml()=stu.grade;
    document.getElementById("sMajor").innerHtml()=stu.major;
  }
}

function delStu() {
  var id = document.getElementById("did").valueOf();
  var data = JSON.parse(storage.getItem("studentSys"));
  if (data[id] == null) {
    alert("the student was not exist!");
  } else {
    data[id] = null;
    storage.setItem("studentSys", JSON.stringify(data));
    alert("delete successed!");
  }
}

function FormShow() {
  var id = document.getElementById("tid").valueOf();
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
    data[id].name = document.getElementById("cName").value;
    data[id].sex =  document.getElementById("cSex").value;
    data[id].grade =  document.getElementById("cGrade").value;
    data[id].major =  document.getElementById("cMajor").value;
    storage.setItem("studentSys", JSON.stringify(data));
    alert("change successed!");
  } else {
    alert("name can't be none !");
  }
}


function addShow(){
        $('.add').fadeIn('slow');
        $('.search').hide();
        $('.del').hide();
        $('.change').hide();
    }
    function searchShow(){
        $('.add').hide();
        $('.search').fadeIn('slow');
        $('.del').hide();
        $('.change').hide();
    }
    function delShow(){
        $('.add').hide();
        $('.search').hide();
        $('.del').fadeIn('slow');
        $('.change').hide();
    }
    function changeShow(){
        $('.add').hide();
        $('.search').hide();
        $('.del').hide();
        $('.change').fadeIn('slow');
    }