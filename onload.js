"use strict"
function onload(){
    {
    const chapters = document.getElementsByClassName("chapter");
    for(let i = 0; i < chapters.length; i++){
        const chapter = chapters[i];
        const el = document.createElement("hr");
        chapter.parentNode.insertBefore(el, chapter.nextSibling);
    }
    }
    const hidden_ul = document.querySelectorAll("nav li");
    for(let i = 0; i < hidden_ul.length; i++){
        hidden_ul[i].addEventListener("click", function(e){
            const el = e.target.parentNode.getElementsByTagName("ul")
            if(!el.length)
                return;
            el[0].classList.toggle("expanded");
        });
    }
    const roll_button = document.getElementById("roll-button");
    roll_button.onclick = roll_character;
}
document.addEventListener("DOMContentLoaded", onload)

