'use client'
import React, { useEffect } from 'react'
import PromptCard from './PromptCard'
import { useState } from 'react'

const PromptCardList = ({data,handleTagClick})=>{
  return <div className = "mt-16 prompt_layout">
    {data.map((post)=>{
      return <PromptCard
      key={post._id}
      post={post}
      handleTagClick={handleTagClick}
      />
    })}
  </div>
}

const Feed = () => {
  const [searchText,setsearchText] = useState('');
  const [posts,setPosts] = useState([]);
  const handleSearchChange = (e) =>{
    setsearchText(e.target.value);
    const fetchPromptData = async () => {
      try {
        const res = await fetch(`/api/prompt/?value=${e.target.value}`)
        const data = await res.json()
        setPosts(data)
      } catch (error) { 
        console.log(error)
      }
    }
    fetchPromptData()
  }
  React.useEffect(() => {
    const fetchPromptData = async () => {
      try {
        const res = await fetch('/api/prompt')
        const data = await res.json()
        setPosts(data)
      } catch (error) { 
        console.log(error)
      }
    }
    fetchPromptData()
  }, [])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text"
          name="search"
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          value={searchText}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={()=>{}} />
    </section>
  )
}

export default Feed
