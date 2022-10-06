import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { calculateWinner } from '../helper'
import Board from './Board'
import './Game.css'

function Game() {
  
  const [player, setPlayer] = useState({X: '', 0: ''})
  const [count, setCount] = useState(0)
  const refPlayerX = useRef()
  const refPlayer0 = useRef()
  
  useEffect(()=>{console.log('hi!'); return ()=> console.log('end')} , [])

  const [board, setBoard] = useState(Array(9).fill(null))
  //сет для определиния кто ходит следующий:
  const [xIsNext, setXIsNext] = useState(true)
  // определение победителя
  const winner = calculateWinner(board)

  // f отвечающая за клик по ячейке
  const handleClick = index => {
    const boardCopy = [...board]
    // был ли уже клик по ячейке или игра закончена
    if (winner || boardCopy[index] ) {return}
    // Определить чей ход x or 0
    boardCopy[index] = xIsNext ? 'X' : '0'
    // Обновить стэйт
  setCount(count+1)
    setBoard(boardCopy)
    setXIsNext(!xIsNext)
    console.log('count', count)
  }



  const startNewGame = () => {
    return (
      <button className='start_btn' onClick={()=>{
        setBoard(Array(9).fill(null))
      }} > start new game </button>
    )
  }

  const showWinnerName = () => {

  if (winner === 'X') {return `победитель: ${player['X']}`}
  if (winner === '0') {return `победитель: ${player['0']}`}
  if (!winner && count > 8) {return ('НИЧЬЯ')}
  // if (winner || count > 8) {setCount(0)}
  
  }


if (!player['X'] || !player['0']) {return(
  <form onSubmit={(e)=>{
    e.preventDefault()
    setPlayer( {...player, 'X': refPlayerX.current.value, '0':  refPlayer0.current.value} )
  }
    } >

    <input ref={refPlayerX} placeholder='игрок X' ></input>
    <input ref={refPlayer0} placeholder='игрок 0' ></input>

    <button>push</button>
  </form>
)}

  return (
    <div className='wrapper' >
      {startNewGame()}
      <Board squares={board} click={handleClick} />
      <div className='winner'> {showWinnerName()} </div>
    </div>
  )
}

export default Game