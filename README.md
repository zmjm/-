<!DOCTYPE html>
<html>
<head>
<title></title>
<style type="text/css">
html, body {
    width:100%;
    margin:0px auto;
    padding:0px auto;
}
.div1 {
    height:1500px;
}
.div2 {
    width:200px;
    height:200px;
    background-color:#3399FF;
    margin-top:100px;
}
.div2_1{
    position:fixed;
    width:200px;
    height:200px;
    z-index:999;
    background-color:#3399FF;
    top:0px;
    
}
*html{
    background-image:url(about:blank);
    background-attachment:fixed;
}
  
</style>
<script type="text/javascript">
window.onscroll=function(){
    var t=document.documentElement.scrollTop||document.body.scrollTop; 
    var div2=document.getElementById("div2");
    if(t>= 100){
        div2.className = "div2_1";
    }else{
        div2.className = "div2";
    }
}
</script>
</head>
<body>
<div class="div1">
    <div id="div2" class="div2"></div>
</div>
 
</body>
</html>
<script type="text/javascript" src="/skin/js/fa5ea90bd23348cda66501dc07e822fa.js"></script>
<script type="text/javascript" src="/skin/js/bdmap.js"></script>
