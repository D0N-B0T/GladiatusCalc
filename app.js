class Gladiator {
    constructor(strength, dexterity, agility, constitution, charisma, intel, arm, dmg, hp, level) {
      this.strength = strength;
      this.dexterity = dexterity;
      this.agility = agility; // ++
      this.constitution = constitution; 
      this.charisma = charisma; // ++
      this.intel = intel;
      this.arm = arm;
      this.dmg = dmg;
      this.hp = hp;
      this.level = level;
    }
  
    calculateWinProbability(otherGladiator) {
        let scoreSelf = this.strength * 0.3 + this.dexterity * 0.2 + this.agility * 0.5 + this.constitution * 0.1 + this.charisma * 0.5 + this.intel * 0.1;
        let scoreOther = otherGladiator.strength * 0.3 + otherGladiator.dexterity * 0.2 + otherGladiator.agility * 0.5 + otherGladiator.constitution * 0.1 + otherGladiator.charisma * 0.5
  
        scoreSelf *= this.dmg / 10;
        scoreOther *= otherGladiator.dmg / 10;
    
        scoreSelf *= (1 - (this.arm / 100));
        scoreOther *= (1 - (otherGladiator.arm / 100));
  
        let levelDifference = this.level - otherGladiator.level;

        if (levelDifference > 0) {
          scoreSelf += levelDifference;
        } else if (levelDifference < 0) {
          scoreOther -= levelDifference;
        }
    
        let hpDifference = this.hp - otherGladiator.hp;
        if (hpDifference > 0) {
          scoreSelf += hpDifference / 10;
        } else if (hpDifference < 0) {
          scoreOther -= hpDifference / 10;
        }
    
        let winProbability = scoreSelf / (scoreSelf + scoreOther);
        return winProbability;
    }
  }


const hp_charstats = document.getElementById("char_leben_tt");
const hp_tooltip = hp_charstats.getAttribute("data-tooltip");
const hp_match = /Hit Points:\D*(\d+)/.exec(hp_tooltip);
const hp = hp_match ? parseInt(hp_match[1]) : 0;

const level = document.getElementById("char_level").innerHTML
const strength = document.getElementById("char_f0").innerHTML
const dexterity = document.getElementById("char_f1").innerHTML
const agility = document.getElementById("char_f2").innerHTML
const constitution = document.getElementById("char_f3").innerHTML
const charisma = document.getElementById("char_f4").innerHTML
const intelligence = document.getElementById("char_f5").innerHTML
const armour = document.getElementById("char_panzer").innerHTML


const damage_charstats = document.getElementById("char_schaden_tt");
const damage_tooltip = damage_charstats.getAttribute("data-tooltip");
const damage_match = /Damage:\D*(\d+)/.exec(damage_tooltip);
const damage = damage_match ? parseInt(damage_match[1]) : 0;


let gladiator1 = new Gladiator(7, 20, 20, 15, 14, 7, 423, 19, 308, 7);
let gladiator2 = new Gladiator(parseInt(strength), parseInt(dexterity), parseInt(agility), parseInt(constitution), parseInt(charisma), parseInt(intelligence), parseInt(armour), parseInt(damage), parseInt(hp), parseInt(level));


let winProbability = gladiator1.calculateWinProbability(gladiator2);
winProbability = Math.trunc(winProbability * 100) / 100;
const player_name_bg = document.getElementById("avatar");
const newElement = document.createElement("div");

newElement.textContent = "Probabilidad de ganar: "+ winProbability * 100 + "%";

if (winProbability >= 0.5) {
    newElement.style.color = "green";
} else if (winProbability <= 0.5) {
    newElement.style.color = "red";
}


newElement.style.fontSize = "15px";
newElement.style.fontWeight = "bold";
newElement.style.textAlign = "center";
newElement.style.marginTop = "10px";


// quitale los espacios
const playername = document.getElementsByClassName("playername ellipsis")[0].textContent.replace(/\s/g, '');


if (playername == "DonBot") {
    console.log("Es DonBot");
} else {
    player_name_bg.parentNode.insertBefore(newElement, player_name_bg.nextSibling);    
}


// TODO : 
// - Que la extension recorra la lista de gladiadores y calcule la probabilidad de ganar contra cada uno
