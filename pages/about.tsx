import Head from 'next/head'
import React from 'react'

function about() {
  return (
    <div>
         <Head>
        <title>JustRiskIT-About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{height:"250px"}} className="flex border-b border-black items-center justify-center">
    <h1 className="text-7xl  font-semibold">Every Move is a Risk,<span className="font-bold">So Just Risk It.</span></h1>
    </div>
    <div  className="justify-center pb-10 items-center border-b border-black">
    <p className="mx-auto my-10 w-3/4">The best ideas can change who we are. Just Riskt It is where those ideas take shape, take off, and spark powerful conversations. We’re an open platform where over 100 million readers come to find insightful and dynamic thinking about cyrpto and nft. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface. Our purpose is to spread these ideas and deepen understanding of the world.</p>
    <p className="mx-auto  w-3/4">We’re creating a new model for digital publishing. One that supports nuance, complexity, and vital storytelling without giving in to the incentives of advertising. It’s an environment that’s open to everyone but promotes substance and authenticity. And it’s where deeper connections forged between readers and writers can lead to discovery and growth. Together with millions of collaborators, we’re building a trusted and vibrant ecosystem fueled by important ideas and the people who think about them.</p>
    </div>
    <div  className="justify-center bg-pink-100 py-10 items-center border-b border-black">
    <p className="mx-auto text-7xl mt-10  w-1/2">A living network of curious minds..</p>
    <p className="mx-auto w-1/2 px-5 mt-10">Anyone can write on Just Risk It. Thought-leaders, journalists, experts, and individuals with unique perspectives share their thinking here. You’ll find pieces by independent writers from around the globe, stories we feature and leading authors, and smart takes on our own suite of blogs and publications.</p>
    </div>
    </div>
    
  )
}

export default about