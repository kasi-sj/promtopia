'use client'
import React from 'react'
import {useState , useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const myProfile = () => {
const Router = useRouter();
const [posts,setPosts] = useState([]);
const {data:session} = useSession();
const handleEdit = async(post)=>{
  Router.push(`/update-prompt?id=${post._id}`)
}
const handleDelete = async(post)=>{
      const hasConfirmed = confirm("Are you Sure want to delete it")
      if(hasConfirmed){
        try{
        const response = await fetch(`/api/prompt/${post._id}`,{
            method:'DELETE',
        })
        const filteredPosts = posts.filter((p) => p._id!==post._id)
        setPosts(filteredPosts)
        }catch(e){
        console.log(e);
        }
      }
} 

    useEffect(() => {
    const fetchPromptData = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await res.json()
        setPosts(data)
        console.log("ok fine")
      } catch (error) { 
        console.log("not able")
      }
    }
    console.log(session)
    if(session?.user.id)
    fetchPromptData()
  }, [])
  return (
    <Profile 
        name="My"
        desc="Welcome to your profile page!"	
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
  )
}

export default myProfile
