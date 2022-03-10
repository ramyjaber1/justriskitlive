import sanityClient from '@sanity/client'

export const client = sanityClient({
    dataset:process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-10-21",
    token:process.env.SANITY_API_TOKEN,
    useCdn:false,
})


