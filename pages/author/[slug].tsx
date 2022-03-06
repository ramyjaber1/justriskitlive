import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import {sanityClient, urlFor} from '../../sanity'
import { Author, Post } from '../../typings';
import {useForm,SubmitHandler} from 'react-hook-form'


import PortableText from 'react-portable-text';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Props{
    author:Author,
    suggestedPosts:[Post]
}

function Post({author}:Props) {
    const router = useRouter()
    const {slug} = router.query
    console.log(slug)
    console.log(author)


  return( 
      <>
    <Head>
    <title>JustRiskIt-{author.name}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <main>

          
        <div className='relative'>

      <article className='max-w-3xl mx-auto p-5'>
          <div className='flex items-center space-x-4'>
      <img className='w-20 rounded-full h-20 object-cover' src={urlFor(author.image).url()!} alt="" />
          <h1 className='text-3xl mt-10 mb-3 '>{author.name}</h1>
          </div>
          <PortableText 
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} 
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!} 
              content={author.bio}
              className="mt-5"
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
          
          <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
          <div className='mt-10 space-y-6'>
              {author.posts.map((p:Post) => (
                  <Link href={`/post/${p.slug}`}>
                  <div className=" border cursor-pointer transform duration-500 hover:scale-105 hover:border-blue-500    border-gray-200 py-4 rounded-md px-2 md:px-4">
                      <div className="flex justify-between items-center">
                      <div className="flex space-x-4"> 
                      <img className='w-16 h-16 md:h-24 md:w-24  object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(p.mainImage).url()!} alt="" />
                          <div>
                          <p className="font-semibold text-sm md:text-lg">{p.title}</p>
                          <p className="mt-4 text-xs md:text-sm font-light line-clamp-3">{p.description}</p> 
                          </div>
                      </div>
                      <p className="text-xs md:text-md w-1/4">{new Date(p.publishedAt).toLocaleString()}</p>
                      </div>
                      </div>
                      </Link>
              ))}
            </div>              
      </article>
      
      </div>
     

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
    const query = `*[_type == "author" && slug.current == $slug]{
        name,
        bio,
        image,
        "posts": *[_type == "post" && author._ref in *[_type=="author" && slug.current == $slug ]._id ]{
          title,
          "slug": slug.current,
          mainImage,
          description,
          publishedAt,
        }
    }`

   
    
    const author1 = await sanityClient.fetch(query,{
        slug:params?.slug,
    })
    const author = author1[0]
 
    
    if(!author){
        return{
            notFound:true
        }
    }

    return{
        props:{
            author
        },
        revalidate:60, //After 60 seconds i'll update
    }

}
