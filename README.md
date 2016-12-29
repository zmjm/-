<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
 <script>
    function verifyTel1(){
        var regexp1=/^[0-9]{1,4}$/;        
        var t1 = document.getElementById("t1").value;
        if(!regexp1.test(t1)){
            document.getElementById("msg").style.display="inline";
            document.getElementById("msg").innerHTML="请输入正确的房屋面积";    
            document.getElementById("t1").focus();  //让输入框获得焦点
            document.getElementById("t1").select(); //选中输入框的内容
            return false;
        }else{
            document.getElementById("msg").style.display="none";
            return true;
        }
    }
 
    function verifyTel2(){
        var regexp2=/^1[3|4|5|7|8]\d{9}$/;
        var t2 = document.getElementById("t2").value;
        if(!regexp2.test(t2)){
            document.getElementById("msg2").style.display="inline";
            document.getElementById("msg2").innerHTML="请输入正确的电话号码！";
            document.getElementById("t2").focus();  //让输入框获得焦点
            document.getElementById("t2").select(); //选中输入框的内容
            return false;
        }else{
            document.getElementById("msg2").style.display="none";
            return true;
        }
    }
     //提交按钮样式
     function test(){
     	if (verifyTel1() && verifyTel2()) {
     		document.getElementById("btn").disabled=false;
     	};
     }
    //提交表单
    function submitForm(){
        if(verifyTel1() && verifyTel2()){
        	
            document.getElementById("allow").submit();
        }else{
 
  document.getElementById("btn").disabled=true;
}
    }
     
 </script>
 </head>
 <body>
<form method="post" action="" id="allow">
<div id="form">
    <div class="int">
        <label for="username">房屋面积：</label>
        <input type="text" id="t1" onblur="test()" class="input" />
    </div><div id="msg"></div>
    <div class="int">
        <label for="txtpwd">电话号码：</label>
        <input type="text" id="t2" onblur="test()"class="input" />
    </div><div id="msg2"></div>
<br>
<input type="button" id="btn" value="提交" onclick="submitForm()" disabled="true">
</form>
 </body>
</html>
