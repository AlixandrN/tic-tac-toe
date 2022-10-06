import React from 'react'
import './Board.css'
import Square from './Square'


function Board( {squares, click} ) {


  return (
    <div className='board' >

       {
       squares.map((el, i) => (
        <Square key={i} value = {el} on={()=> click(i) } />
       ) )
       }
      
    </div>
  )
}

export default Board