"use strict"

function d6(){
    return 1 + Math.floor(Math.random() * 6);
}
function d4(){
    return 1 + Math.floor(Math.random() * 4);
}
function d8(){
    return 1 + Math.floor(Math.random() * 8);
}
function roll_character(){
    let hp = 7 + d6();
    const gp = (d6()+d6()+d6())*10;
    const abilities = [ "Strength", "Dexterity", "Agility", "Constitution", "Wisdom", "Intellect", "Charisma"];
    const ability_scores = {};
    for(let i = 0; i < abilities.length; i++){
        ability_scores[abilities[i]] = d6()+d6()+d6();
    }
    const skills = [ "Alchemy", "Appraisal", "Climbing", "Cooking", "Decipher Script", "Disguise", "Escape Artist", "Forgery", "Herbalism", "Jumping", "Law", "Medicine", "Mining", "Navigation", "Pick Lock", "Pick Pocket", "Religion", "Riding", "Sailing", "Smithing", "Swimming", "Tracking" ];
    const skill_scores = {};
    for(let i = 0; i < skills.length; i++){
        let score = d6() - 4;
        if(score > 0){
            skill_scores[skills[i]] = score;
        }
    }
    const race_roll = d6();
    var race;
    if(race_roll <= 3){
        race = "Human";
    }
    else if(race_roll == 4){
        race = "Dwarf";
        hp = 7 + d8();
    }
    else if(race_roll == 5){
        race = "Elf";
        hp = 7 + d4();
    }
    else {
        const sub_roll = d6();
        if(sub_roll <= 2){
            race = "Hobbit";
        }
        else if(sub_roll == 3){
            race = "Half-orc";
        }
        else {
            race = "???";
        }
    }
    if(ability_scores['Constitution'] >= 15){
        hp += 1;
    }
    function make_row(type, key, value){
        var td1 = document.createElement(type);
        td1.innerHTML = key;
        var td2 = document.createElement(type);
        td2.innerHTML = value;
        var tr = document.createElement('tr');
        tr.appendChild(td1);
        tr.appendChild(td2);
        return tr;
    }
    var output = document.createElement('table');

    var firstrow = make_row('th', 'Attribute', 'Score');
    output.appendChild(firstrow);
    output.appendChild(make_row('td', 'Race', race));
    output.appendChild(make_row('td', 'Gold', gp));
    output.appendChild(make_row('td', 'HP', hp));
    for(let i = 0; i < abilities.length; i++){
        output.appendChild(make_row('td', abilities[i], ability_scores[abilities[i]]));
    }
    for(let i = 0; i < skills.length; i++){
        let score = skill_scores[skills[i]];
        if(score){
            output.appendChild(make_row('td', skills[i], score));
        }
    }
    const output_div = document.getElementById('rolled-character');
    output_div.innerHTML = "";
    output_div.appendChild(output);
    const roll_button = document.getElementById("roll-button");
    roll_button.remove();
}
