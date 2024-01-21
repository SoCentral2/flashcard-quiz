import React, { useState } from 'react'

export default function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false);
    return (
        //className: either set to 'card' or 'card & flip'.
        //onClick: Flashcard items are inverted.
        <div 
            className={`card ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}     
        >
            <div className='front'>
                {flashcard.question}
                <div className='flashcard-options'>
                    {flashcard.options.map(option => {
                        return <div className='flashcard-option'>{option}</div>
                    })}

                </div>
            </div>
                <div className='back'>{flashcard.answer}</div>
        </div>
    )
}
