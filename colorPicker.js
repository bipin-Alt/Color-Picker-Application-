//loading the script after the HTML is loaded//

document.addEventListener("DOMContentLoaded", ()=>{
    const colorChooseArr = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
    const colorChangeBackground = document.querySelector(".changing-background-color");
    const colorCodeText = document.querySelector(".color-code p");
    const savedColorList = document.getElementById("saved-color-list");
    //displaying the added color//
    const displayColor = (colorArr) =>{
      savedColorList.innerHTML = '';
      colorArr.forEach(item => {
        const row = document.createElement("tr");
         row.innerHTML = `
         <td>${item.color}</td>
         <td>${item.colorCode}</td>
         <td>
           <button class ="edit-btn" data-id="${item.id}">Edit</button>
           <button class ="delete-btn" data-id="${item.id}">Delete</button>
         </td>
         `;
         savedColorList.appendChild(row);

      });
    }
      //colorArr to store color , color code//
      let colorArr = JSON.parse(localStorage.getItem("colors"))||[];
      displayColor(colorArr);
    //function to generate a random color and displaying dynamically//
    const generateColor = ()=>{
      
        let hexColor = "#";
        for(let i =0;i<6;i++){
            hexColor += colorChooseArr[Math.floor(Math.random() * colorChooseArr.length)];
        }
        colorChangeBackground.style.backgroundColor = hexColor;
        colorCodeText.textContent = hexColor;
    }
    
    //function to save the color and color code to local storage//
    const saveColor = (color)=>{
        const newColor ={
            id: Date.now(),
            color:color,
            colorCode:colorCodeText.textContent,
        };
        colorArr.push(newColor);
        localStorage.setItem("colors", JSON.stringify(colorArr));
        displayColor(colorArr);
    };

    //function to delete a color from the list //
    const deleteColor = (id) =>{
        colorArr = colorArr.filter(item=>item.id!==id);
        localStorage.setItem("colors", JSON.stringify(colorArr));
        displayColor(colorArr);
    }

    //function to edit a color//
    const editColor = (id) =>{
        const color = colorArr.find( item => item.id === id);
        if(color){
            colorChangeBackground.style.backgroundColor = color.color;
            colorCodeText.textContent = color.colorCode;   
        }
    }
    
    //adding event listener to the generate button//
    const generateBtn = document.querySelector(".generate-color");
    generateBtn.addEventListener("click", generateColor);
    
    //Event listener for saving the color//
    const saveBtn = document.querySelector(".saved-btn");
    saveBtn.addEventListener("click", ()=>{
        saveColor(colorChangeBackground.style.backgroundColor);
    });

    //Event listener for edit and delete buttons//
    savedColorList.addEventListener("click", (e)=>{
       const id = Number(e.target.getAttribute("data-id"));
       if(e.target.classList.contains("edit-btn")){
            editColor(id);
       }else if(e.target.classList.contains("delete-btn")){
            deleteColor(id);
       }
    });
});

