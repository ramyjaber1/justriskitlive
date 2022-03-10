// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {client} from '../../lib/sanity'

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {_id,name,email,comment}  = JSON.parse(req.body);
    try{
      const test=  await client.create({
            _type:'comment',
            post:{
                _type:'reference',
                _ref: _id,
            },
            name,
            email,
            comment
        });
        console.log("test")
    }catch(err){
        return res.status(500).json({message:`Couldn't submit your comment`,err})
    }
    console.log("Comment Submitted");
    return res.status(200).json({message:"comment submitted"})
}
