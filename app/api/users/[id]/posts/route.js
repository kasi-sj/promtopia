import { connectTodDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req,{params})=>{
    try{
        await connectTodDB();
        const prompts = await Prompt.find({creator:params.id}).populate('creator')
        console.log(prompts)
        return new Response(JSON.stringify(prompts),{status:200});
    }catch(error){
        return new Response("Failed to create a Prompt",{status:500});
    }
}