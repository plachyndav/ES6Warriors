import { Unit } from './army';

class Squad {
    constructor(name) {
        this.name = name || "";
        this.squad = [];
    }

    addUnit(unit) {
        if(unit instanceof Unit) {
            this.squad.push(unit)
        } else {
            throw new Error("Not a unit") ;
        }
    }

    getUnit(index) {
        return this.squad[index];
    }

    removeUnit(index) {
        this.squad.splice(index, 1);
    }

    shuffle() {
        for (let i = this.squad.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.squad[i];
            this.squad[i] = this.squad[j];
            this.squad[j] = temp;
        }
    }

    display() {
        let squad = document.createElement('div');
        let header = document.createElement('header');
        let body = document.createElement('div');
        let button = document.createElement('button');
    
        let availablelWidth = window.innerWidth - 40;
        let unitsInRow = Math.floor(availablelWidth / 156);
        let squadHeight = 50 + Math.ceil(this.squad.length / unitsInRow) * 167;
    
        button.innerHTML = 'restore squad HP';
    
        let self = this;
    
        button.addEventListener('click', function (event) {
            let unitCard, unitHealthDiv;
            for (let i = 0; i < self.squad.length; i++) {
                self.squad[i].restore();
                unitCard = document.getElementById(self.squad[i].divID);
                unitHealthDiv = unitCard.querySelector('div');
                unitHealthDiv.innerHTML = 'HP: ' + self.squad[i].health;
            }
        });
    
        header.innerHTML = this.name;
    
        squad.classList.add("squad");
        header.classList.add("squad__header");
        body.classList.add("squad__body");
        button.classList.add("squad__button");
        
        squad.style.height = squadHeight + "px";
        
        let x = 0;
        let y = 0;
        let n = 0;
        let divID;
        for(let unit in this.squad) {
            divID = this.name + "U" + n;
            if ((x + 156) > availablelWidth) {
                x = 0;
                y += 167;
            }    
            this.squad[unit].divID = divID;
            body.appendChild(this.squad[unit].createCard(x, y, divID));
            x += 156;
            n += 1;
        }
    
        squad.appendChild(header);
        squad.appendChild(body);
        header.appendChild(button);
    
        document.body.appendChild(squad);
    }

    swapUnits(unit1, unit2) {
        let unit1Card = document.getElementById(unit1.divID);
        let unit2Card = document.getElementById(unit2.divID);
        let unit1Position = [unit1Card.style.left, unit1Card.style.top];
        let unit2Position = [unit2Card.style.left, unit2Card.style.top];
        unit1Card.style.left = unit2Position[0];
        unit1Card.style.top = unit2Position[1];
        unit2Card.style.left = unit1Position[0];
        unit2Card.style.top = unit1Position[1];
    }    
}

class Battleground {
    constructor() {
        this.ground = [];
    }

    addSquad (squad) {
        if (squad.constructor !== Squad) throw new Error("Not a squad");
        this.ground.push(squad);
    }

    fight() {
        let attackSquad, defenseSquad, attackUnit, defenseUnit;
        while(this.ground.length > 1) {
            attackSquad = randomFrom(this.ground);
            defenseSquad = randomFrom(this.ground.filter(function(x) { return x !== attackSquad; }));
        
            attackUnit = randomFrom(attackSquad.squad);
            defenseUnit = randomFrom(defenseSquad.squad);
    
            defenseUnit.attackedBy(attackUnit);
    
            if(!defenseUnit.isReadyToFight()) defenseSquad.removeUnit(defenseSquad.squad.indexOf(defenseUnit));
        
            if(defenseSquad.squad.length === 0) this.removeSquad(this.ground.indexOf(defenseSquad));
        }
        return "Winning team: " + this.ground[0].name;
    }

    removeSquad(index) {
        this.ground.splice(index, 1);
    }

    display() {
        for(let squad in this.ground) {
            this.ground[squad].display();
        }
    }
}

const randomFrom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

export {
    Squad,
    Battleground
}