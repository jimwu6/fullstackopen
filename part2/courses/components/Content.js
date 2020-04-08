import React from 'react'
import Part from './Part'

const Content = ({parts}) => {

  const exercisesArr = parts.map((p) => p.exercises)
  const total = exercisesArr.reduce((s, i) => s+i, 0)

  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <b> total of {total} exercises</b>
    </div>
  )
}

export default Content