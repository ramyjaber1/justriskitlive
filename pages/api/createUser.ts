import type { NextApiRequest, NextApiResponse } from 'next'
import  sanityClient from '@sanity/client'

const config = {
    dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn:process.env.NODE_ENV === 'production',
    token:process.env.SANITY_API_TOKEN,
}
const  client = sanityClient(config)
export const createUserInSanity = async (req:NextApiRequest,res:NextApiResponse) =>{
    const {userWalletAddress,name}  = JSON.parse(req.body);
    try{
        const userDoc ={
        _type:'users',
        _id:userWalletAddress,
        name:name,
        walletAddress:userWalletAddress
        }
            await client.createIfNotExists(userDoc)
            res.status(200).send({message:'success'})
    }catch(error : any){
        res.status(500).send({message:'error',data:error.message})
    }
}

