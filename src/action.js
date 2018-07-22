import {
    Archer,
    Mage,
    Warrior,
    Knight
} from './army';

import {
    Battleground,
    Squad
} from './battle';

const action = () => {
    let archer1 = new Archer(500, 450, 230),
        archer2 = new Archer(400, 232, 432),
        archer3 = new Archer(500, 431, 344),
        warrior1 = new Warrior(700, 230, 1231),
        warrior2 = new Warrior(),
        warrior3 = new Warrior(),
        warrior4 = new Warrior(),
        warrior5 = new Warrior(),
        mage1 = new Mage(),
        mage3 = new Mage(),
        knight1 = new Knight(),
        knight2 = new Knight(),
        knight3 = new Knight();

    let squad1 = new Squad("squad1"),
        squad2 = new Squad("squad2");
        // squad3 = new Squad("squad3");

    let battleground1 = new Battleground;

    squad1.addUnit(archer1);
    squad1.addUnit(archer2);
    squad1.addUnit(warrior1);
    squad1.addUnit(warrior2);
    squad1.addUnit(warrior3);
    squad1.addUnit(warrior4);
    squad1.addUnit(warrior5);

    squad2.addUnit(archer3);
    squad2.addUnit(mage1);
    squad2.addUnit(knight1);
    squad2.addUnit(knight2);
    squad2.addUnit(knight3);
    squad2.addUnit(mage3);

    battleground1.addSquad(squad1);
    battleground1.addSquad(squad2);

    // console.log(battleground1.fight());

    battleground1.display();

    setTimeout( () => { 
        squad1.swapUnits(archer2, warrior4); 
    }, 1500);

    setTimeout( () => { 
        squad2.swapUnits(knight2, archer3); 
    }, 3000);
}

export { action };