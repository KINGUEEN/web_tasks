var storage=window.localStorage;

function SignInShow(){
	$('.SignIN').fadeIn('slow');
	$('.SignUP').hide();
	$('.forgot').hide();
}
function SignUpShow(){
	$('.SignIN').hide();
	$('.SignUP').fadeIn('slow');
	$('.forgot').hide();
}
function forgotShow(){
	$('.SignIN').hide();
	$('.SignUP').hide();
	$('.forgot').fadeIn('slow');
}

   function fun(){
   	var strName=document.getElementById("user").value;
   	var strPass=document.getElementById("pass").value;
   	var check=document.getElementById("remember");
   	if(check.checked){
   		storage.setItem("txtName", strName);
   		storage.setItem("txtPass", strPass);
   	}else{
   		storage.setItem("txtName","");
   		storage.setItem("txtPass","");
   	}
   }
  
 
    function search(){
    	var sname=document.getElementById("fuser").value;
    	var Name=localStorage.getItem("txtName");
    	if(sname==Name){
    		alert(localStorage.getItem("txtPass"));
    	}else{
    		alert("用户名错误！");
    	}
    }
