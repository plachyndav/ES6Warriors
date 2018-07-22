class Unit {
    constructor(type, health, damage, distance) {
        this.type = type;
        this.health = this.defaultHealth = health;
        this.damage = damage;
        this.distance = distance
        this.level = 0;
        this.divID;
    }

    isReadyToFight() {
        return this.health > 0;
    }

    restore() {
        this.health = this.defaultHealth;
    }

    prepareForAttack() {
        return this.damage + (this.level * this.damage);
    }

    attackedBy(target) {
        this.health -= target.prepareForAttack();
    }

    createCard(posLeft, posTop, divID) {
        let unit = document.createElement('div');
        let header = document.createElement('header');
        let body = document.createElement('div');
        let footer = document.createElement('footer');
        let button = document.createElement('button')
    
        let self = this;
        button.addEventListener('click', function (event) {
            self.restore();
            body.innerHTML = 'HP: ' + self.health;
            event.stopPropagation();
        });
    
        unit.addEventListener('click', function (event) {
            if(self.isReadyToFight()) self.health -= 200;
            body.innerHTML = 'HP: ' + self.health;
        });
    
        header.innerHTML = this.type;
        body.innerHTML = 'HP: ' + this.health;
        footer.innerHTML = 'Level: ' + this.level;
        button.innerHTML = 'restore HP';
    
        unit.appendChild(header);
        unit.appendChild(body);
        unit.appendChild(footer);
        unit.appendChild(button);
    
        unit.classList.add("unit");
        header.classList.add("unit__header");
        body.classList.add("unit__body");
        footer.classList.add("unit__footer");
    
        unit.style.left = posLeft + 'px';
        unit.style.top = posTop + 'px';
    
        unit.setAttribute("id", divID);
        
        return unit;
    }
}

class Archer extends Unit {
    constructor(health, damage, distance) {
        super('Archer', health || 200, damage || 300, distance || 500);
        this.arrows = 100;
    }

    prepareForAttack() {
        this.reload();
        return super.prepareForAttack();
    }

    reload() {
        if (!this.arrows) throw 'There are no arrows!';
        this.arrows--;
    }
}

class Mage extends Unit {
    constructor(health, damage, distance) {
        super('Mage', health || 200, damage || 800, distance || 1000);
    }
}

class Warrior extends Unit {
    constructor(health, damage, distance) {
        super('Warrior', health || 500, damage || 300, distance || 1000);
    }
}

class Knight extends Warrior {
    constructor(health, damage, distance) {
        super(health || 500, damage || 800, distance || 1000);
        this.type = 'Knight';
    }
}

export {
    Unit,
    Archer,
    Mage,
    Warrior,
    Knight
}