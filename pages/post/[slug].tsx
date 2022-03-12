import { GetStaticProps } from 'next';
import React, { useContext, useState } from 'react';
import {sanityClient, urlFor} from '../../sanity'
import { Post } from '../../typings';
import {useForm,SubmitHandler} from 'react-hook-form'
// import {BiUpvote,BiDownvote} from 'react-icons/bi'
interface IFormInput {
    _id:string;
    comment:string;
}

import PortableText from 'react-portable-text';
import Link from 'next/link';
import Head from 'next/head';
import Ad from '../../components/Ad';
import { UserContext } from '../../components/context/userContext';

interface Props{
    post:Post,
    suggestedPosts:[Post]
}

function Post({post,suggestedPosts}:Props) {
    const { openLogin ,setOpenLogin , currentUser } = useContext(UserContext)
    const {register , handleSubmit , formState:{errors},} = useForm<IFormInput>()
    const [submitted,setSubmitted] = useState(false)

    const onSubmit:SubmitHandler<IFormInput> = (data) => {
        if(!currentUser){
            setOpenLogin(true)
        }else{   
         fetch('/api/createComment',{
            method:'POST',
            body:JSON.stringify(data),
        }).then(() => {
            setSubmitted(true)
        }).catch((err) => {
            console.log(err)
            setSubmitted(false)
        })
    }
    }

  return (
      <>
    <Head>
    <title>{post.title}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <main>

      <img className='w-full h-40 object-cover' src={urlFor(post.mainImage).url()!} alt="" />
        <div className='relative'>

      <article className='max-w-3xl mx-auto p-5'>
          <h1 className='text-3xl mt-10 mb-3 '>{post.title}</h1>
          <h2 className='text-xl font-light text-gray-500 mb-2  '>{post.description}</h2>
          <div className='flex items-center mt-2 space-x-2'>
              <Link href={`/author/${post.author.slug.current}`}><img className='w-16 h-16 object-cover   rounded-full' src={urlFor(post.author.image).url()!} /></Link>
              <p className='font-extralight text-sm'>
                  Blog post by <Link href={`/author/${post.author.slug.current}`}><span className='text-green-600 cursor-pointer'>{post.author.name}</span></Link> - Published at {new Date(post.publishedAt).toLocaleString()}
              </p>
          </div>
          <div className='mt-10'>
              
              <PortableText 
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} 
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!} 
              content={post.body}
              serializers =
              {
                  {
                      h1:(props:any) => (
                          <h1 className='text-2xl font-bold my-5' {...props} />
                      ),
                      h2:(props:any) => (
                        <h1 className='text-xl font-bold my-5' {...props} />
                    ),
                    li:({children}:any) => (
                        <li className='ml-4 list-disc' >{children}</li>
                    ),
                    link:({children,href}:any) => (
                        <a href={href} className='text-blue-400 hover:underline'>{children}</a>
                    ),
                    image: (props:any) => 
                    {
                        return( 
                            // JSON.stringify(props, null, 2)
                        <img src={urlFor(props.asset).url()!}
                    alt={props.asset.alt} />
                    )},  
                }
              }
              />
          </div>
          {/* <hr className="max-w-lg border border-yellow-500 my-6" />
          <div className="flex">
              <div className="flex">
                  <BiUpvote className="w-6 h-6" />
                  <p className="text-sm">(0)</p>
              </div>
              <div className="flex">
                  <BiDownvote className="w-6 h-6" />
                  <p className="text-sm">(0)</p>
              </div>
          </div> */}
      </article>
      {/*  */}
      
      {/* <div className="aboslute left-5 top-2/3"> */}
          {/* <Ad slotId={"3201377243"} width="300" height="1000" /> */}
          {/* </div> */}
      
      {/* Suggested Posts */}
      <div className="md:absolute  my-5 md:my-0 md:block rounded-md  top-2/3 right-5">
          <p className="px-4 font-bold">Suggesed Posts</p>
              {suggestedPosts?.map(p => (
                  <Link  key={p._id} href={`/post/${p.slug.current}`}>
                      <div className="flex border-b px-4 rounded-md py-3 cursor-pointer hover:bg-gray-200 border-gray-300  space-x-4">
                        <img className='h-16 w-16  object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(p.mainImage).url()!} alt="" />
                        <div className="">
                            <p className="font-semibold w-48 truncate">{p.title}</p>
                            <p className="text-sm line-clamp-3 w-48">{p.description}</p>
                        </div>
                        </div>
                      </Link>
              ))}
      </div>
      </div>
      <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
      
      {submitted ?  (
        <div className='flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
            <h3 className='text-3xl font-bold' >Thank you for Submitting you comment ! </h3>
            <p>Once it has been approved, it will appear below!</p>
        </div>
      )
      :
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 max-w-2xl mx-auto mb-10'>
          <h3 className='text-sm border-yellow-500'>Enjoyed This article?</h3>
          <h4 className='text-3xl font-bold'>Leave a comment below!</h4>
          <hr className='py-3 mt-2' />
          <input {...register("_id")} type={"hidden"} name="_id" value={post._id} />
         
          <label className='block mb-5'>
              <span className='text-gray-700'>Comment</span>
          <textarea {...register("comment",{required:true})} className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring' placeholder='Nice Post!' rows={8} />
          </label>
          <div className='flex flex-col p-5'>
              {errors.comment && <span className='text-red-500'>- The Comment Field is required</span>}
          </div>
          <input className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer' type="submit" />
      </form>
      }
      {/* Comments */}
      {post?.comments.length < 1  ?
      <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-x-2'>
      <h3 className='text-4xl'>No Comments Yet ,</h3>
      <h4 className='text-2xl'>Add your comment and be First!</h4>
      <hr className='pb-2' /> 
  </div>
  :
      <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-x-2'>
          <h3 className='text-4xl'>Comments</h3>
          <hr className='pb-2' /> 
          {post?.comments?.map((comment) => (
              <div key={comment._id}> 
                  <p><span>{comment.name}</span>: {comment.comment}</p>
              </div>
          ))}
      </div>
}
  </main>
  </>
  )}

export default Post;


export const getStaticPaths = async() => {
    const query = `*[_type == "post"]{
        _id,
        slug{
            current
        }
    }`;
const posts  = await sanityClient.fetch(query)
const paths = posts.map((post:Post) => ({
    params:{
        slug:post.slug.current
    }
}))
return {
    paths,
    fallback:'blocking'
}
}

export const getStaticProps:GetStaticProps = async({params}) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        publishedAt,
        title,
        author ->{
            name,
            image,
            slug
        },
        "comments": *[
          _type == "comment" && post._ref == ^._id && approved == true],    
        description,
        mainImage,
        slug,
        body
    }`

    const query1 = `*[_type == "post" && slug.current != $slug][0..3]{
        _id,
        title,
        author -> {
          name,
          image
        },
        description,
        mainImage,
        slug
      }`;
    
    const post = await sanityClient.fetch(query,{
        slug:params?.slug,
    })
    const suggestedPosts = await sanityClient.fetch(query1,{
        slug:params?.slug,
    })
    
    if(!post){
        return{
            notFound:true
        }
    }
    if(!suggestedPosts){
        return{
            notFound:true
        }
    }
    console.log(suggestedPosts)
    return{
        props:{
            post,
            suggestedPosts
        },
        revalidate:60, //After 60 seconds i'll update
    }

}
