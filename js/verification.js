$('#anniu1').click(function (event) {
    let huida1 = document.getElementById("huida1").value;
    if (huida1 == "娟娟" || huida1 == "吴娟红"|| huida1 == "小娟娟"|| huida1 == "老婆") {
        $('#h').text("是"+ huida1 +"啊");
        event.preventDefault();
        $('.form1').fadeOut(500);
        $('.wrapper').addClass('form-success');

        setTimeout(function () {
            location.href = "wenti2.html";
        }, 2000);

        } else {
        alert("我可是不和陌生人说话的");
    }
});

$('#anniu2').click(function (event) {
    let huida2 = document.getElementById("huida2").value;
    if (huida2 == "潘恩" || huida2 == "潘俊杰"|| huida2 == "我老公"|| huida2 == "帅哥") {
        $('#h').text("和我想的一样！");
        event.preventDefault();
        $('.form2').fadeOut(500);
     
        $('.wrapper').addClass('form-success');

        setTimeout(function () {
            location.href = "wenti3.html";
        }, 2000);
             
    } else {
        alert("敲你哦，好好想想");
    }
});

$('#anniu3').click(function (event) {
    let huida3 = document.getElementById("huida3").value;
if(huida3>2728){
    alert("大了大了");
}else if(huida3<2728){
    alert("小了小了");
}else{
        $('#h').text("恭喜你蒙对了！！");
       
        event.preventDefault();
        $('.form3').fadeOut(500);
        $('.wrapper').addClass('form-success');
        setTimeout(function () {
            location.href = "BirthdayCake.html";
        }, 4000);
    } 
});

