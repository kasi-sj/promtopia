'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter , useSearchParams} from 'next/navigation'
import Form from '@/components/Form'

const EditPrompt = () => {
    const Router = useRouter();
    const {data:session} = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting , setSubmitting] = useState(false);
    const [post , setPost] = useState({
        prompt:"",
        tag:""
    })
    useEffect(()=>{
        const getResponse = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            console.log(response)
            const data = await response.json();
            console.log(data)
            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
            
        }
        getResponse();
    },[promptId])
    async function EditcurrentPrompt(e){
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert('Prompt ID not found')
        try{
        const response = await fetch(`/api/prompt/${promptId}`,{
            method:'PATCH',
            body:JSON.stringify({
            prompt:post.prompt,
            userId:session?.user.id,
            tag:post.tag
            })
        })
        if(response.ok){
            Router.push('/');
        }
        }catch(e){
        console.log(e);
        }
        
}
  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={EditcurrentPrompt}
    />
  )
}

export default EditPrompt
