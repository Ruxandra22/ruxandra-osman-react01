const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: true,
  skills: {
    html: true,
    css: false,
    javaScript: true,
  },
  friends: {
    larry: {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    steven: {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    carol: {
      name: 'Carol',
      age: 29,
      surname: 'Carolson',
    },
  },
};


console.warn('1. Folosind Object.entries() pe proprietatea skills, afiseaza abilitatile persoanei daca acestea sunt ' +
  'true. Folosind propozitii de forma: “person.name cunoaste: html.” ' +
  '“person.name cunoaste: javaScript.”');
// ['html', true], ['css', false]...
Object.entries(person.skills).forEach(([skill, known]) => {
  if (known) {
    console.log(`${person.name} cunoaste ${skill}`);
  }
});


console.warn('2. Prin aceeasi metoda, afiseaza o lista inversata cu numele complet inversat al prietenilor. \n');
Object.entries(person.friends).reverse().forEach(([, friend]) => {
  const { name, surname } = friend;

  console.log(`${surname} ${name}`);
});


console.warn('3. Afiseaza propozitia: “Prietenii mei sunt Larry, Steven si Carol.” folosind Object.entries()');
let message = Object.entries(person.friends).reduce((message, [, friend], index, friends) => {
  const { name } = friend;
  const length = friends.length;
  const punctuation = index === length - 1 ? '.' : index === length - 2 ? ' si ': ', ';

  return `${message}${name}${punctuation}`;
}, 'Prietenii mei sunt ');
console.log(message);


console.warn('4. In mod similar afiseaza mai multe propozitii (cate una per console.log()) care sa afiseze:' +
  ' “Diferenta de varsta intre Larry si Dragos este de xxx ani.” etc…\n');
Object.entries(person.friends).forEach(([, friend]) => {
  const difference = Math.abs(friend.age - person.age);
  console.log(`Diferenta de varsta dintre ${friend.name} si Dragos este de ${difference} ani.`);
});


console.warn('5. Folosind Object.entries() pe proprietatea skills, afiseaza toate abilitatile din obiectul skills.');
Object.entries(person.skills).forEach(([skill, ]) => {
  console.log(skill);
});


console.warn('6. Prin aceeasi metoda, afiseaza o lista cu numele complet al prietenilor. ');
let friendsList = [];
Object.entries(person.friends).forEach(([, friend]) => {
  const fullName = `${friend.name} ${friend.surname}`;
  friendsList.push(fullName);
});
console.log(friendsList);
/** How would question no.6 be done using reduce??*/



console.warn('7. Afiseaza propozitia: “Prietenii mei sunt Larry Larryson, Steven Stevenson si Carol Carolson.” ' +
  'folosind Object.entries()');
message = Object.entries(person.friends).reduce((message, [, friend], index, friends) => {
  const punctuation = index === friends.length - 1 ? '.' : index === friends.length - 2 ? ' si ' : ', ';
  return `${message}${friend.name} ${friend.surname}${punctuation}`;
}, 'Prietenii mei sunt ');
console.log(message);


console.warn('8. In mod similar, afiseaza mai multe propozitii (cate una per console.log()) care sa afiseze:' +
  ' “Larry are xx ani. Steven are …”');
Object.entries(person.friends).forEach(([, friend]) => {
  const { name, age } = friend;
  console.log(`${name} are ${age} ani.`);
});







