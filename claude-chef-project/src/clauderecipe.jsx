import React from 'react'
import Markdown from 'react-markdown'

export default function generateRecipe({recipe}){
  return(
    <div className='recipe-container'>
      <Markdown>{recipe}</Markdown>
  </div>
  )
}
