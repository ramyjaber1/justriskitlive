import type { NextApiRequest, NextApiResponse } from 'next'
import  sanityClient from '@sanity/client'

type Data = {
  name: string
}

const config = {
    dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn:process.env.NODE_ENV === 'production',
    token:process.env.SANITY_API_TOKEN,
}

const  client = sanityClient(config)

export const getUserInfo = async(req:NextApiRequest,res:NextApiResponse) => {
    try{
    const query = `*[_type == "users" && walletAddress="${req.query.walletAddress}"]{
        name,
        walletAddress,
        "imageUrl":profileImage.asset->url
    }`
    const sanityResponse = await client.fetch(query);
    res.status(200).send({message:'success',data:sanityResponse[0]})
}catch(error:any){
    res.status(500).send({message:'error',data:error.message})
}
}