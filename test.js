function starttest(qid,userid){
    // localStorage.clear()
    var html=""
    var list=JSON.parse(localStorage.getItem("mocktest"))
    var list5=JSON.parse(localStorage.getItem("resultdata"))
    if(!$("input[type='radio']:checked").val()&& qid!=0){
        $("#error").text("Please answer the question")
        return false
    }
    
        html+=`<div class="d-flex">
        <h2>
                Question No 
            </h2><h2 style="margin-left:5px" id="duplicate">${list[qid].questionid}</h2>
        </div>
            <p style="margin: 40px 60px;font-size: larger;">
                ${list[qid].question}
            </p>`
            for(let i=0;i<list[qid].option.length;i++){
                if(i%2==0){
                    html+=`<div class="d-flex">
                    <div class="d-flex col-md-6">
                        <input type="radio" name="answer" value="${i}" `
                        if(localStorage.getItem("resultdata")){
                            for(j=0;j<list5.length;j++){
                                if(list5[j].userid==userid && list5[j].questionid==list[qid].questionid){
                                    if(i==list5[j].markedanswer){
                                        html+=`checked`
                                        break
                                    }
                                }
                            } 
                        }
                        html+=`>
                        <p style="font-size: larger;margin-left: 20px;margin-top: 10px;" >${list[qid].option[i]}</p>
                        </div>`
                }else{
                    html+=`<div class="d-flex col-md-6">
                    <input type="radio" name="answer" value="${i}"`
                    if(localStorage.getItem("resultdata")){
                        for(j=0;j<list5.length;j++){
                            if(list5[j].userid==userid && list5[j].questionid==list[qid].questionid){
                                if(i==list5[j].markedanswer){
                                    html+=`checked`
                                    break
                                }
                            }
                        } 
                        
                    }
                    html+=`>
                    <p style="font-size: larger;margin-left: 20px;margin-top: 10px;">${list[qid].option[i]}</p>
                </div>
                </div>`
                }
                if(i==list[qid].option.length-1 && list[qid].option.length%2!=0 ){
                    html+=`</div>
                    `
                }
            }
            html+=`<span class="text-danger" id="error"></span>`
            html+=`<div>`
            if(qid!=0){
                html+=`<button style="margin-top: 40px;padding: 5px 50px;border: 0px;border-radius: 5px;" onclick="starttest(${qid}-1,${userid})" class="bg-primary text-white">
                Pervious
            </button>`
            }
            if(qid!=list.length-1){
                html+=`<button style="margin-top: 40px;float:right;margin-right: 50px;padding: 5px 50px;border: 0px;border-radius: 5px;" class="bg-primary text-white" onclick="starttest(${qid}+1,${userid})" >
                Next
            </button>`
            }
            if(qid==list.length-1){
                html+=`<button style="margin-top: 40px;float:right;margin-right: 50px;padding: 5px 50px;border: 0px;border-radius: 5px;" class="bg-primary text-white" onclick="submit(${qid}+1,${userid})" >
                submit
            </button>`
            }
            
        html+`</div>`
        if(qid!=0){
            console.log($("input[type='radio']:checked").val())
             var list2=store(userid)
        }
    $("#testbody").html(html)
    console.log(list)
}

function start(){
    var userid=$("#userid").val()
    if(!userid){
        alert("Please enter the filed")
        $("#userid").focus()
        return false
    }
    starttest(0,userid)
}
function submit(qid,userid){
    store(userid)
    var html2=""
    var list3=JSON.parse(localStorage.getItem("mocktest"))
    var list4=JSON.parse(localStorage.getItem("resultdata"))
    var Totalmarks=0
    for(let i=0;i<list3.length;i++){
        html2+=`<div>
        <p style="font-size: 30px;">${list3[i].questionid}. ${list3[i].question}</div>
        <p style="font-size: 25px;margin-left: 25px;">Correct Answer : ${list3[i].option[list3[i].Answer]}</p>`
        for(let j=0;j<list4.length;j++){
            if(list4[j].questionid==list3[i].questionid && list4[j].userid==userid){
                if(list4[j].markedanswer ==list3[i].Answer){
                    markedanswer=list3[i].option[list4[j].markedanswer]
                    html2+=`<p style="font-size: 25px;margin-left: 25px;background-color: rgb(139, 223, 139);">Marked Answer : ${list3[i].option[list4[j].markedanswer]}<p style="float:right;font-size:15px">+1</p></p></div>`
                    Totalmarks+=1
                }else{
                    html2+=`<p style="font-size: 25px;margin-left: 25px;background-color: #ef5454;">Marked Answer : ${list3[i].option[list4[j].markedanswer]}</p></div>`
                }
            }
        }
        
        
    }
    html2+=`<h3 class="mt-5">Total Marks : ${Totalmarks} </h3>`
    $("#testbody").html(html2)


}
function store(userid){
    var duplicate=$("#duplicate").text()
    if(!localStorage.getItem("resultdata")){
        var list2=[]
        var object2={
            "questionid":1,
            "userid":userid,
            "markedanswer":$("input[type='radio']:checked").val()
        }
        list2.push(object2)
        localStorage.setItem("resultdata",JSON.stringify(list2))
    }else{
        var list2=JSON.parse(localStorage.getItem("resultdata"))
        var found=false
        for(let j=0;j<list2.length;j++){
            if(list2[j].questionid ==duplicate && list2[j].userid==userid){
                list2[j].markedanswer=$("input[type='radio']:checked").val()
                found=true
            }
        }
        if(!found){
            var object2={
                "questionid":duplicate,
                "userid":userid,
                "markedanswer":$("input[type='radio']:checked").val()
            }
            list2.push(object2)
        }
        localStorage.setItem("resultdata",JSON.stringify(list2))
    }
    return list2
}