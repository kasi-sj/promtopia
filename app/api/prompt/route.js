import { connectTodDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req)=>{
    const url = new URL(req.url);
    const value = (url.search.substr(7))
    if(value!=""){
        try{
            await connectTodDB();
            const prompts = await Prompt.find({ $or: [{ prompt: new RegExp(value) }, { tag: 10 }] }).populate('creator')
            // console.log(prompts)
            return new Response(JSON.stringify(prompts),{status:200});
        }catch(error){
            return new Response("Failed to create a Prompt",{status:500});
        }
    }else{
        try{
            await connectTodDB();
            const prompts = await Prompt.find({}).populate('creator')
            // console.log(prompts)
            return new Response(JSON.stringify(prompts),{status:200});
        }catch(error){
            return new Response("Failed to create a Prompt",{status:500});
        }
    }
}
