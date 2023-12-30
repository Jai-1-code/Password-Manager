showpass= ()=>{
    let table = document.querySelector("table");
    let str=" ";
    let data= localStorage.getItem("passwords");
    if (data== null || JSON.parse(data).length==0) {
        table.innerHTML="No Passwords Stored"
    }
    else{
        table.innerHTML=`<tr>
        <th>Website Name</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
        </tr>`;
        let info = JSON.parse(data);
        for (let index = 0; index < info.length; index++) {
            const element = info[index];
            
            str+= `<tr>
            <td>${element.website} <img src="copy.svg" alt="copy image" style="cursor: pointer; position: relative; width: 18px;height: 30px;
            margin: 0px 10px;" onclick="Copy('${element.website}')"></td>
            <td>${element.username} <img src="copy.svg" alt="copy image" style="cursor: pointer; position: relative; width: 18px;height: 30px;
            margin: 0px 10px;" onclick="Copy('${element.username}')"></td>
            <td>${mask(element.password)} <img src="copy.svg" alt="copy image" style="cursor: pointer; position: relative; width: 18px;height: 30px;
            margin: 0px 10px;" onclick="Copy('${element.password}')"></td>
            <td onclick=" Delete('${element.website}')" style="cursor: pointer;"> Delete </td>
            </tr>`
        }
        table.innerHTML= table.innerHTML + str;
    }
    website.value="";
    username.value="";
    password.value="";
}

console.log("working");
showpass();
document.querySelector("button").addEventListener("click", (e)=>{
    e.preventDefault();
    console.log("clicked");
    console.log(website.value, username.value, password.value);
    let passwords= localStorage.getItem("passwords");
    console.log("passwords");
    if(passwords == null){
        let json = [];
        json.push({website: website.value, username:username.value, password:password.value})
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    else{
        let json=JSON.parse(localStorage.getItem("passwords"));
        json.push({website: website.value, username:username.value, password:password.value})
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    showpass();
})


const Delete = (website)=>{
    let data= localStorage.getItem("passwords");
    let info = JSON.parse(data);
    updatedinfo= info.filter((e)=>{
        return e.website != website;
    })
    alert("Password Deleted Succesfully!")
    localStorage.setItem("passwords", JSON.stringify(updatedinfo))
    showpass();
}


function mask(p) {
    let m ="";
    for (let index = 0; index < p.length; index++) {
        m+= '*';       
    }
    return m;
}


function Copy(text) {
    navigator.clipboard.writeText(text);
    document.getElementById("alert").style.display='block';
    setTimeout(() => {
        document.getElementById("alert").style.display='none';
    }, 3000);
}