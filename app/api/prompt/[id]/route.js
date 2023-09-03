import { connectTodDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req , {params})=>{
    try{
        await connectTodDB();
        const prompts = await Prompt.findById(params.id).populate('creator')
        if(!prompts)return new Response("prompt not found" , {status:404});
        return new Response(JSON.stringify(prompts),{status:200});
    }catch(error){
        return new Response("Failed to get a Prompt",{status:500});
    }
}

export const PATCH = async (req , {params})=>{
    const {prompt , tag} = await req.json();
    try{
        await connectTodDB();
        const existing = await Prompt.findById(params.id).populate('creator')
        if(!existing)return new Response("prompt not found" , {status:404});
        existing.prompt = prompt;
        existing.tag = tag;
        await existing.save();
        return new Response(JSON.stringify(existing),{status:200});
    }catch(e){
        return new Response("Failed to update a Prompt",{status:500});
    }
}

export const DELETE = async (req , {params})=>{
    try{
        await connectTodDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response(JSON.stringify("prompt deleted successfully"),{status:200});
    }catch(e){
        return new Response("Failed to delete a Prompt",{status:500});
    }
}