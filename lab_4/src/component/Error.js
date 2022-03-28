import React from 'react';
import { useLocation } from 'react-router-dom';;


export default function Error() {
  const location = useLocation();

  return (
    <div>
      <h1>404 Error</h1>
      <div>{location.state.description}</div>
    </div>
    
  )
}
