import React from 'react'

function premium() {
  return (
    <div>
    <div className="text-center py-20 bg-lime-200 border-b border-black">
        <div className="text-7xl font-bold">Fuel great thinking.</div>
        <div className="mt-2">Upgrade to membership for $5/month or $50/year.</div>
        <button className="border border-black px-4 py-2 bg-white rounded-full my-5">Get unlimited access</button>
    </div>
    <div className="text-center py-10 bg-lime-200 border-b border-black">
      <div className="flex px-10">
          <div className="w-1/2 px-5 text-left border-r border-black">
          <p className="text-5xl my-3 ">Get unlimited access to every story.</p>
          <p className="mt-5">Read any article in our entire library across all your devices — with no paywalls, story limits or ads.</p>
          </div>
          <div className="w-1/2 text-left px-5">
          <p className="text-5xl  my-3 text-left">Support us to continue our amazing work.</p>
          <p className="mt-5">A portion of your membership will directly support the writers and thinkers you read the most.

</p>
          </div>
      </div>
    </div>
    </div>
  )
}

export default premium