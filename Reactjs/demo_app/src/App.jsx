import React from 'react'
import Card from './Card';
import Demo from './Demo';

const App = () => {
 
  return (
    <>
    <Demo />
    <Card customClasses="bg-yellow-200"/>
    <Card customClasses="bg-green-200"/>
    <Card customClasses="bg-pink-200"/>
    </>
  )
}

export default App