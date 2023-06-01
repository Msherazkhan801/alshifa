import React from 'react'
import './style.css'
const SearchBox = ({Search,setSearch}) => {
  return (
    <input  type='text' placeholder='search' value={Search} onChange={(e)=>setSearch(e.target.value)} style={{
            height: '35px',
            width: '235px',
            border: '1px solid',
            borderRadius: '40px', 
            paddingLeft:"10px"
         }}/>
  )
}

export default SearchBox