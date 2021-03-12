export const sampleDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Redux: {
    title: 'Redux',
    questions: [
      {
        question: '3 parts of Redux',
        answer: 'store / reducer / action'
      },
      {
        question: 'In Redux, all state is stored in one location, three ways to interact with it.',
        answer: 'getting the state / listening for changes to the state / updating the state'
      }
    ]
  },
  Elevate: {
    title: 'English - Elevate',
    questions: [
      {
        question: 'roam',
        answer: 'If you roam an area or roam around it, you wander or travel around it without having a particular purpose.'
      },
      {
        question: 'hush',
        answer: "You say 'Hush!' to someone when you are asking or telling them to be quiet."
      }, 
      {
        question: 'retreat',
        answer: 'If you retreat, you move away from something or someone.'
      },
      {
        question: 'recede',
        answer: 'If something recedes from you, it moves away.'
      },
    ]
  },
  IELTS: {
    title: 'English - IELTS',
    questions: [
      {
        question: 'deplete',
        answer: 'To deplete a stock or amount of something means to reduce it.'
      },
      {
        question: 'timber',
        answer: 'Timber is wood that is used for building houses and making furniture. You can also refer to trees that are grown for this purpose as timber.'
      },
      {
        question: 'prominent',
        answer: 'Someone who is prominent is important.'
      },
    ]
  },
};


export function getDecks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(decks);
    }, 2000);    
  });
  
}