console.log(email)

function taskdetails(){
    console.log("taskdetails");
    let taskid=Date.now();
    let task={taskid,email};
    ["taskheading","startDate","endDate"].forEach(id => {
        
        task[id]=document.querySelector("#"+id).value;
        
    });
console.log(task);
    fetch("/taskdetails",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(task)
    })
    .then(function(res){ console.log(res)
    location.reload();
    })
    .catch(function(res){ console.log(res) })
}


document.querySelector("#taskdetails").addEventListener("click",function(){
    taskdetails()
})

document.querySelector("#taskText").addEventListener("input",()=>{
    document.querySelector("#taskText").minHeight=document.querySelector("#taskText").scrollHeight+"px";
    console.log(document.querySelector("#taskText").scrollHeight)
})


fetch("/showdetails",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"mailId":email})
    })
   .then((res)=>res.json())
   .then((data)=>{
    var array =[]
    var keys = Object.keys(data)
    for(var i=0;i<keys.length;i++)
    {
array.push(data[keys[i]])
    }
   
    let display=``;
    // document.querySelector("")
    for(let i=0; i<array.length; i++){
      
        display=`
        <div id="${array[i].status}" class="draggable ${array[i].taskid}" draggable="true">
            <div class="left-button">
            ${array[i].taskheading}
            <button id="edit" onclick="edit(${array[i].taskid})" class="btn btn-success"><i class="fa fa-solid fa-pen"></i></button>&nbsp;
            <button id="delete" onclick="deleteTask(${array[i].taskid})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="dates">
            Start Date ${array[i].startDate}
            </div>
            <div class="dates">
            End Date ${array[i].endDate}
            </div>
        </div>

        <div id="popup" class="c${array[i].taskid}">
    <label>Project Name</label>
    <div>

    
    <input type="text" name="" id="popUpheading${array[i].taskid}" value="${array[i].taskheading}">
    <div class="form-group">
      <label for="date">Start Date</label>
      <input class="form-control" placeholder="date" value="${array[i].startDate}"
      name="date" id="popstartDate${array[i].taskid}" type="date"/>
    </div>
    <div class="form-group">
      <label for="date">End Date</label>
      <input class="form-control" placeholder="date" value="${array[i].endDate}"
      name="date" id="popendDate${array[i].taskid}" type="date"/>
    </div>
    <button class="btn btn-success" onclick="update(${array[i].taskid})" >Update</button>
  </div>
  </div>
        `
console.log(array[i].status === "not-started",array[i].status,"not-started");
        if( array[i].status === "not-started")
        {
            console.log("notstarted");
            document.querySelector(".ns").innerHTML+=display
        }
      
        else if( array[i].status === "in-progress"){
            console.log("inprogress");
            document.querySelector(".ip").innerHTML+=display
        }
       
        else if(  array[i].status === "completed")
        {
            console.log("completed");
            document.querySelector(".cc").innerHTML+=display
        }
    }
   
    drag()
   })

function update(e){
    let popUpheading=document.getElementById("popUpheading"+e).value;
    let popstartDate=document.getElementById("popstartDate"+e).value
    let popendDate=document.getElementById("popendDate"+e).value;
    let updatetask={};
    updatetask.taskid=e;
    updatetask.taskheading=popUpheading;
    updatetask.startDate=popstartDate;
    updatetask.endDate=popendDate;
    updatetask.status = "";
    console.log(updatetask);
        fetch("/editTask",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({updatetask,taskid:e,mail:email})
        })
    .then((res)=>res.json())
    location.reload();
}

function edit(e){
    console.log(e);
    document.querySelectorAll("#popup").forEach(element=>{
        element.style.display="none"
    })
    console.log(document.querySelector(".c"+e));
    document.querySelector(".c"+e).style.display="block";
    let popUpheading=document.getElementById("popUpheading"+e).value;
    let popstartDate=document.getElementById("popstartDate"+e).value
    let popendDate=document.getElementById("popendDate"+e).value;
    console.log(popUpheading);
    let updatetask={};
    updatetask.taskid=e;
    updatetask.taskheading=popUpheading;
    updatetask.startDate=popstartDate;
    updatetask.endDate=popendDate;
    console.log(updatetask);
        fetch("/editTask",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({taskid:e,mail:email})
        })
    .then((res)=>res.json())
}

function deleteTask(e){
   if(confirm("Do you want to delete this task"))
   {
    fetch("/deleteTask",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({taskid:e,mail:email})
    })
.then((res)=>res.json())
location.reload();
   }
}

document.querySelectorAll(".btn-warning").forEach((button)=>{
 button.addEventListener("click",()=>{
        button.classList.toggle("filter-selected");
    })
})

let droppedDiv;
//Drag and Drop
function drag() {
    const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".containers");

draggables.forEach((draggable) => {
    // console.log(draggable);
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", (e) => {
    draggable.classList.remove("dragging");
    var dd =droppedDiv.split(" ")[1]
    var id = e.target.className.split(" ")[1]
    fetch("/updateStatus",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({taskid:id,div:dd,mail:email})
    })
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res);
    })
  });
})
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    container.appendChild(draggable);
    droppedDiv=container.className
  });
});
}