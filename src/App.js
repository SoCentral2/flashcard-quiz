import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] =  useState(SAMPLE_FLASHCARDS);
  
 /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
 used to make an API call to retrieve a set of flashcards from the Open Trivia Database API. */
  useEffect(() => {
    axios
    .get('https://opentdb.com/api.php?amount=10')
    .then (res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)), 
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          //Without decodeString, there's lots of 'weird characters'.
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() -.5)
        }
      }))
      console.log(res.data)
    })
  }, []);
  
  /**
   * The `decodeString` function decodes a string that contains HTML entities and returns the decoded
   * string.
   * @param str - The `str` parameter is a string that represents an encoded string.
   * @returns The decoded string.
   */
  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <div className='container'>
      <FlashcardList flashcards={flashcards}/>
    </div>
    );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'Question 1',
    answer: 'Answer',
    options: [
      'Answer 1',
      'Answer 2',
      'Answer 3',
      'Answer 4'
    ]
  }, 

  {
    id: 2,
    question: 'Question 2',
    answer: 'Answer',
    options: [
      'Answer 1',
      'Answer 2',
      'Answer 3',
      'Answer 4'
    ]
  }, 

  {
    id: 3,
    question: 'Question 3',
    answer: 'Answer',
    options: [
      'Answer 1',
      'Answer 2',
      'Answer 3',
      'Answer 4'
    ]
  } 
]

export default App;
