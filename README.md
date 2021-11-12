![image](https://user-images.githubusercontent.com/49247275/141107117-d3ff6750-18b9-45f7-aeba-806915868410.png)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app --typescript`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

This is basically a clone from https://rickandmortyapi.com/ landing page with pagination

Each branch is dealing with data fetching in a different way

### main
> Using plain React.js features such as Context API

### useSWR
> Data fetching through useSWR hook from [@vercel](https://swr.vercel.app/)

### nextjs-ssr-ssg
> Static Site Generation with Next.js framework, pre-loading pages /characters/ `1|2`
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
