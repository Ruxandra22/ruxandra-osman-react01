const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: true,
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
let message = '';

console.warn('1. Folosind Object.values(), afiseaza o lista inversata cu ' +
  'numele complet inversat al prietenilor. \n');
Object.values(person.friends).reverse().forEach(({name, surname}) => {
  console.log(`${surname} ${name}`)
})

console.warn('2. Afiseaza propozitia: “Prietenii mei sunt Larry, Steven si Carol.” folosind Object.values()');
message = Object.values(person.friends).reduce((message, {name}, index, friends) => {
  const arrayLength = friends.length;
  const punctuation = index === arrayLength - 1 ? '.' : index === arrayLength - 2 ? ' si ' : ', ';

  return `${message}${name}${punctuation}`;
}, 'Prietenii mei sunt ');
console.log(message);


console.warn('3. Prin aceeasi metoda, afiseaza propozitia: ' +
  '“Diferenta de varsta intre Larry si Dragos este de xxx ani.” etc…');
Object.values(person.friends).forEach(({name, age}) => {
  console.log(`Diferenta de varsta dintre ${name} si ${person.name} este de ${Math.abs(age - person.age)} ani.`);
});


console.warn('4. Prin aceeasi metoda, afiseaza o lista cu numele complet al prietenilor. ');
message = Object.values(person.friends).reduce((friendsList, { name, surname }) => {
  const fullName = `${name} ${surname}`;
  friendsList.push(fullName);
  return friendsList;
}, []);
console.log(message);


console.warn('5. Afiseaza propozitia: “Prietenii mei sunt Larry Larryson, Steven Stevenson si Carol Carolson.” ' +
  'folosind Object.values()');
message = Object.values(person.friends).reduce((message, { name, surname }, index, friends) => {
  const punctuation = index === friends.length - 1 ? '.' : ', ';
  return `${message}${name} ${surname}${punctuation}`;
}, 'Prietenii mei sunt ');
console.log(message);


console.warn('6. In mod similar, afiseaza propozitia  “Larry are xx ani. Steven are …”');
message = Object.values(person.friends).reduce((message, { name, age }) => {
  return `${message}${name} are ${age} ani. `;
}, '');
console.log(message);


