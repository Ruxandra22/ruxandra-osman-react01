const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: false,
  skills: [
    'html',
    'javascript',
    'css',
    'java',
    'c++',
    'node',
    'jquery',
    'node.js',
  ],
  friends: [
    {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    {
      name: 'Carol',
      surname: 'Carolson',
      age: 29,
    },
  ],
};

console.warn('1. Folosind obiectul person si reduce, afiseaza in consola un string care contine skillurile de pe ' +
  'pozitiile pare ale arrayului, separate prin virgula');
let message = '';
message = person.skills.reduce((message, skill, index, skills) => {
  if (index % 2 !== 0) {
    return message;
  }
  return `${message}${index === 0 ? '' : ','}${skill}`;
}, '');
console.log(message);


console.warn('2. In mod similar, afiseaza skillurile care NU incep cu j.');
message = person.skills.reduce((message, skill, index) => {
  if(skill.startsWith('j')) {
    return message;
  }

  return `${message}${index === 0 ? '' : ','}${skill}`;
}, '');
console.log(message);


console.warn('3. Folosind reduce afiseaza propozitia: "Prietenii mei se numesc xxx yyy, xxx yyy, xxx yyy."\n');
message = person.friends.reduce((message, {name, surname}, index, friends) => {
  const punctuation = index === friends.length - 1 ? '.' : ', ';

  return `${message}${name} ${surname}${punctuation}`;
}, 'Prietenii mei se numesc ');
console.log(message);


console.warn('4. Folosind reduce, afiseaza numarul total de ani pe care il au persoanele din arrayul friends, doar ' +
  'daca varsta este mai mare sau egala cu 30 de ani.');
message = person.friends.reduce((sumYears, friend) => {
  const { age } = friend;
  return age >= 30 ? sumYears + age : sumYears;
}, 0);
console.log(message);


console.warn(' doar skillurile care nu incep cu j');
let filteredSkills = person.skills.reduce((filteredSkills, skill) => {
  if (skill.startsWith('j')) {
    return filteredSkills;
  }

  filteredSkills.push(skill);
  return filteredSkills;
}, []);
console.log(filteredSkills);

// another solution
filteredSkills = person.skills.filter((skill) => {
  return !skill.startsWith('j');
});
console.log(filteredSkills);


console.warn('5.  Folosind reduce, afiseaza suma anilor de nastere a persoanelor. ');
message = person.friends.reduce((sumYears, friend) => {
  const birthYear = 2021 - friend.age;
  return sumYears + birthYear;
}, 0);
console.log(message);


console.warn('6.  Afiseaza fraza: "Intre Dragos si Larry este o diferenta de xx ani. Intre Dragos si Steven... ", ' +
  'doar daca varsta prietenului este impara. ');
message = person.friends.reduce((message, {name, age}) => {
    return `${message}Intre Dragos si ${name} este o diferenta de ${Math.abs(age - person.age)}. `
}, '');
console.log(message);


console.warn('7. Folosind obiectul person si reduce, afiseaza in consola un string care contine skillurile ' +
  'persoanei, separate prin virgula');
message = person.skills.reduce((message, skill, index, skills) => {
  const punctuation = index === skills.length - 1 ? '.' : ', ';
  return `${message}${skill}${punctuation}`;
}, '');
console.log(message);


console.warn('8. In mod similar, afiseaza skillurile care incep cu c ');
message = person.skills.reduce((filteredList, skill) => {
  if (!skill.startsWith('c')) {
    return filteredList;
  }
  filteredList.push(skill);
  return filteredList;
}, []);
console.log(message);


console.warn('9.  Folosind reduce afiseaza propozitia: "Numele de familie ale prietenilor mei sunt: xxx, xxx , xxx."');
message = person.friends.reduce((message, { surname }, index, friends) => {
  const punctuation = index === friends.length - 1 ? '.' : ', ';
  return `${message}${surname}${punctuation}`;
}, 'Numele de familie ale prietenilor mei sunt: ');
console.log(message);


console.warn('10.  Folosind reduce, afiseaza numarul total de ani pe care il au persoanele din arrayul friends ');
message = person.friends.reduce((totalYears, {age}) => {
  return totalYears + age;
}, 0);
console.log(message);


console.warn('11. Folosind reduce, afiseaza suma anilor  persoanelor.');
message = person.friends.reduce((totalYears, {age}) => {
  return totalYears + age;
}, person.age);
console.log(message);


console.warn('12.  Afiseaza diferenta de varsta dintre persoana si prietenii din arrayul friends. ');
message = person.friends.reduce((ageDifferenceList, {age}) => {
  const difference = Math.abs(person.age - age);
  ageDifferenceList.push(difference);
  return ageDifferenceList;
}, []);
console.log(message);


console.warn('13. Afiseaza fraza: "Intre Dragos si Larry este o diferenta de xx ani. Intre Dragos si Steven... ". ' +
  'Repeta pentru tot arrayul friends.');
message = person.friends.reduce((message, {name, age}, index, friends) => {
  const difference = Math.abs(person.age - age);
  return `${message}Intre ${person.name} si ${name} este o diferenta de ${difference} ani. `
}, '');
console.log(message);

