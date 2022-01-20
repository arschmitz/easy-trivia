# Easy Trivia
![OpenTriviaDB](https://i.imgur.com/QBhF5aY.png)

Easy Trivia is a small, simple and fast wrapper for [Open Trivia Database](https://opentdb.com/) - A Free to use, user-contributed trivia question database - with type definitions. Works with CommonJS, ESModules and TypeScript.

# Installation
Ensure you are using Node version 16.0.0 or higher.
```sh-session
npm i easy-trivia
```

# 1.1.3
- 🐞 Fixed a bug where the use of a category name for `QuestionOptions#category` would throw an error or would return the incorrect category.
- Optional Options for `QuestionOptions` Can Now Accept `null`
- Changed `@types/jest` as a **dev** dependency (oops)

# Usage

## Fetching Questions Example
```js
import { getQuestions } from 'easy-trivia';

async function example() {
  const questions = await getQuestions({
    amount: 50,
    difficulty: 'easy',
    type: 'multiple',
    category: 'SCIENCE_COMPUTERS'
  });

  console.log(questions);

    // [
    //   {
    //     value: 'In any programming language, what is the most common way to iterate through an array?',
    //     category: 'Science: Computers',
    //     difficulty: 'easy',
    //     type: 'multiple',
    //     correctAnswer: "'For' loops",
    //     incorrectAnswers: [ "'If' Statements", "'Do-while' loops", "'While' loops" ],
    //     allAnswers: [
    //       "'For' loops",
    //       "'If' Statements",
    //       "'Do-while' loops",
    //       "'While' loops"
    //     ],
    //     checkAnswer: [Function: checkAnswer]
    //   }
    // ...
  },
  
}

example();
```

## Fetching Questions From a Random Category
```js
import { Categories, getQuestions } from 'easy-trivia';

async function example() {
  const questions = await getQuestions({
    amount: 1,
    difficulty: 'easy',
    category: Categories.random()
  });

  console.log(questions[0]);

  // {
  //   value: 'The Canadian $1 coin is colloquially known as a what?',
  //   category: 'General Knowledge',
  //   difficulty: 'easy',
  //   type: 'multiple',
  //   correctAnswer: 'Loonie',
  //   incorrectAnswers: [ 'Boolie', 'Foolie', 'Moodie' ],
  //   allAnswers: [ 'Boolie', 'Loonie', 'Foolie', 'Moodie' ],
  //   checkAnswer: [Function: checkAnswer]
  // }
}

example();
```

## Using Session Tokens to Prevent Duplicate Questions Throughout Multiple Calls
```js
import { Categories, TriviaSession, getQuestions } from 'easy-trivia';

const session = new TriviaSession();

async function example() {
  const sessionToken = await session.start();

  const batch1 = await getQuestions({
    amount: 10,
    category: Categories.categoryByName('HISTORY'),
    difficulty: 'hard',
    token: sessionToken
  });

  const batch2 = await getQuestions({
    amount: 10,
    category: Categories.categoryByName('HISTORY'),
    difficulty: 'hard',
    token: sessionToken
  });

  // All Unique!
  return [...batch1, ...batch2]
}

example();
session.end();
```

## Getting Data About a Trivia Category
```js
import { Categories } from 'easy-trivia';

async function example() {
  const categoryData = await Categories.getCategoryData('GENERAL_KNOWLEDGE');

  console.log(categoryData);

  // {
  //   id: 9,
  //   name: 'GENERAL_KNOWLEDGE',
  //   questionCounts: { 
  //     total: 298, 
  //     forEasy: 116, 
  //     forMedium: 123, 
  //     forHard: 59 
  //   }
  // }
}

example();
```

# Choose From 23 Categories
## Easy Trivia Provides Typings and Constants For OpenTDB's 23 Categories
```js
import { Categories } from 'easy-trivia';

console.log(Categories.allNames);
// [
//   'GENERAL_KNOWLEDGE',
//   'ENTERTAINMENT_BOOKS',
//   'ENTERTAINMENT_FILM',
//   'ENTERTAINMENT_MUSIC',
//   'ENTERTAINMENT_MUSICALS_AND_THEATRES',
//   'ENTERTAINMENT_TELEVISION',
//   'ENTERTAINMENT_VIDEO_GAMES',
//    ...

console.log(Categories.categoryByName('GENERAL_KNOWLEDGE'));
// 9 - The category's API id.

console.log(Categories.categoryById(9));
// 'GENERAL_KNOWLEDGE'
```

### Full Categories List
1. GENERAL_KNOWLEDGE
2. ENTERTAINMENT_BOOKS
3. ENTERTAINMENT_FILM
4. ENTERTAINMENT_MUSIC
5. ENTERTAINMENT_MUSICALS_AND_THEATRES
6. ENTERTAINMENT_TELEVISION
7. ENTERTAINMENT_VIDEO_GAMES
8. ENTERTAINMENT_BOARD_GAMES
9. SCIENCE_AND_NATURE
10. SCIENCE_COMPUTERS
11. SCIENCE_MATHEMATICS
12. MYTHOLOGY
13. SPORTS
14. GEOGRAPHY
15. HISTORY
16. POLITICS
17. ART
18. CELEBRITIES
19. ANIMALS
20. VEHICLES
21. ENTERTAINMENT_COMICS
22. SCIENCE_GADGETS
23. ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA
24. ENTERTAINMENT_CARTOON_AND_ANIMATIONS

# Utilize 4 Different Encodings
```js
import { Encodings } from 'easy-trivia';

console.log(Encodings);

// {
//   NONE: 'none',
//   BASE64: 'base64',
//   URL3986: 'url3986',
//   URL_LEGACY: 'urlLegacy'
// }
```

# Documentation
Full Documentation is currently in the works, However this module is small and straight foward. Working with this module in the meantime will still be a breeze!