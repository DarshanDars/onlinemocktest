var count=0
function addoption(option){
    count+=option
    // var count=$("#count").text().trim()
    html=""
    // if(count<0){
    //     count=0
    // }
        for(let i=0;i<count;i++){
            html+=`<div class="d-flex my-3">
            <h6 class="col-md-3">${String.fromCharCode(68+i)}</h6><input type="text" id="input${String.fromCharCode(68+i)}" class="col-md-6">
                <input type="radio" id="input${String.fromCharCode(68+i)}" name="option" value="${3+i}" class="ms-5" >
        </div>`
        }
    
    $("#addoption").html(html)
    $("#count").html(parseInt(count)+option)
    if(count>=4){
        $("#button1").css("display","none")
    }else{
        $("#button1").css("display","inline")
    }
    if(count>=1){
        $("#button2").css("visibility","visible")
    }else{
        $("#button2").css("visibility","hidden")
    }

}

function submit(){
    var textarea=$('#question').val()
    var optionA=$("#inputA").val()
    var optionB=$("#inputB").val()
    var optionC=$("#inputC").val()
    var count=parseInt($("#count").text().trim())
    var optionlist=[]   
    $("#errortextarea").text("")
    $("#errorA").text("")
    $("#errorB").text("")
    $("#errorC").text("")
    var checked=$("input[type='radio']:checked").val()
    if(textarea.trim()==""){
        $("#errortextarea").text("Mandatory to fill this filed")
        return false
    }
   
    if(optionA.trim()==""){
        $("#errorA").html("Mandatory to fill this filed")
        return false
    }
    if(optionB==""){
        $("#errorB").html("Mandatory to fill this filed")
        return false
    }
    if(optionC==""){
        $("#errorC").html("Mandatory to fill this filed")
        return false
    }
    if(!$("input[type='radio']:checked").val()){
        alert("Please select any one radio button")
        return false
    }
    for(let i=65;i<68+count-1;i++){
        optionlist.push($(`#input${String.fromCharCode(i)}`).val())
    }
    if(!localStorage.getItem("mocktest")){
       var list=[]
       var object={ "questionid":1,
                    "question":textarea,
                    "option":optionlist,
                    "Answer":checked
                }
        list.push(object)
        localStorage.setItem("mocktest",JSON.stringify(list))
    }else{
        var list=JSON.parse(localStorage.getItem("mocktest"))
        var object={ "questionid":list.length+1,
                    "question":textarea,
                    "option":optionlist,
                    "Answer":checked
                }
        list.push(object)
        localStorage.setItem("mocktest",JSON.stringify(list))
        console.log(list)
    }
    location.reload()
}
function clears(){
    location.reload()
}