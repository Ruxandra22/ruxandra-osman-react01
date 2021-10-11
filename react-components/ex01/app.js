const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 34,
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

let arr = [];
console.warn('1. Folosind metoda map pe arrayul skills, returneaza si afiseaza in consola un array in care fiecare ' +
  'consoana este scrisa cu litera mare (vocalele nu)');
arr = person.skills.map((skill) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const letterArray = skill.split('');
  const mutatedLetterArray = [];

  letterArray.forEach((letter) => {
    if (vowels.includes(letter)) {
      mutatedLetterArray.push(letter);
    } else {
      mutatedLetterArray.push(letter.toLocaleUpperCase());
    }
  });

  return mutatedLetterArray.join('');
});
console.log(arr);


console.warn('2. Folosind map pe arrayul friends, returneaza un array in care fiecare pozitie contine propozitia \n' +
  '“Ma numesc {name} {surname} si am {age} ani.”');
person.friends.map(({name, surname, age}) => {
  console.log(`Ma numesc ${name} ${surname} si am ${age} ani.`);
})


console.warn('3. Folosind map pe arrayul friends, returneaza un array in care fiecare pozitie contine propozitia\n' +
  '“Diferenta de varsa dintre {friendName} si {personName} este {diff}”');
arr = person.friends.map((friend) => {
  const { name, age } = friend;

  return `Diferenta de varsta dintre ${name} si ${person.name} este ${Math.abs(person.age - age)} ani.`
});
console.log(arr);


console.warn('4. Returneaza si afiseaza un array in care fiecare pozitie contine diferenta dintre varsta persoanei si' +
  ' lungimea cuvantului de pe arrayul skill');
arr = person.skills.map((skill) => {
  return Math.abs(person.age - skill.length);
})
console.log(arr);


console.warn('5. Folosind metoda map pe arrayul skills, returneaza un array care contine cuvintele cu prima si ' +
  'ultima litera mari. ');
arr = person.skills.map((skill) => {
  const letterArray = skill.split('');

  letterArray[0] = letterArray[0].toUpperCase();
  letterArray[letterArray.length - 1] = letterArray[letterArray.length - 1].toUpperCase();
  return letterArray.join('');
});
console.log(arr);


console.warn('6. Folosind metoda map pe arrayul skills, returneaza un array care contine cuvintele inversate ' +
  '(exemplu: lmth)');
arr = person.skills.map((skill) => {
  return skill.split('').reverse().join('');
});
console.log(arr);


console.warn('7. Folosind metoda map pe arrayul friends, returneaza un array care sa contina propozitiile\n' +
  '“{friendName} are {age} ani.”');
arr = person.friends.map((friend) => {
  return `${friend.name} are ${friend.age} de ani.`;
});
console.log(arr);


console.warn('8. Folosind metoda map pe arrayul friends, returneaza un array care contine numele inversat al ' +
  'prietenilor pe fiecare pozitie (exemplu: Stevenson Steven)');
arr = person.friends.map((friend) => {
  return `${friend.surname} ${friend.name}`;
});
console.log(arr);


console.warn('9. Folosind metoda map pe arrayul friends, returneaza un array care contine pe fiecare pozitie ' +
  'diferenta dintre lungimea totala al numelui complet (fara spatii) si varsta prietenului de pe iteratie');
arr = person.friends.map((friend) => {
  const nameLength = friend.name.length + friend.surname.length;
  return Math.abs(nameLength - friend.age);
})
console.log(arr);


console.warn('10 Folosind metoda map pe arrayul skills returneaza un array care contine diferenta dintre lungimea ' +
  'fiecarui skill si varsta prietenului ');
arr = person.skills.map((skill) => {
  return Math.abs(skill.length - person.age);
});
console.log(arr);
