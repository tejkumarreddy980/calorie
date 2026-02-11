let foods = JSON.parse(localStorage.getItem("foods")) || [];

function render(){
    let list = document.getElementById("list");
    let total = 0;
    list.innerHTML="";

    foods.forEach((item,index)=>{
        total += Number(item.calories);

        let li = document.createElement("li");
        li.innerHTML = `${item.food} — ${item.calories} cal 
        <button onclick="deleteItem(${index})">❌</button>`;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
    localStorage.setItem("foods", JSON.stringify(foods));
}

function addFood(){
    let food = document.getElementById("food").value;
    let calories = document.getElementById("calories").value;

    if(food==="" || calories===""){
        alert("Enter values");
        return;
    }

    foods.push({food, calories});
    render();

    document.getElementById("food").value="";
    document.getElementById("calories").value="";
}

function deleteItem(i){
    foods.splice(i,1);
    render();
}

function clearAll(){
    foods=[];
    render();
}

render();
