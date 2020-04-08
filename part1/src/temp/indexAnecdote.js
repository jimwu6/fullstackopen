import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}> {text} </button>
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const App = (props) => {
  // save clicks of each button to own state
  const [selected, setSelected] = useState(0)

  // make array of 0s for points
  const [points, setPoints] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  const [maxVoteIndex, setMaxVote] = useState(0)

  const handleNextQuote = () => {
    // setSelected(Math.floor(Math.random() * props.anecdotes.length))
    setSelected((selected+1)%props.anecdotes.length)
  }

  const handleVote = () => () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    let m = 0
    let ind = 0
    for (let i = 0; i < points.length; i++) {
      if (copy[i] > m) {
        m = copy[i]
        ind = i
      }
    }
    setMaxVote(ind)
  }

  return (
    <div>
      <Header text={'Anecdote of the day'} />
      <p> {props.anecdotes[selected]} </p>
      <p> has {points[selected]} points </p>
      <Button onClick={handleVote(selected)} text={'vote'} />
      <Button onClick={handleNextQuote} text={'next anecdote'} />

      <Header text={'Anecdote with most votes'} />
      <p>{props.anecdotes[maxVoteIndex]}</p>
      <p> has {points[maxVoteIndex]} points</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
