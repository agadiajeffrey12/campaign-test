'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
  // router users automatically to /dashboard/campaign page after 3seconds
  const router = useRouter()
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard/campaign')
    }, 3000)
    return () => clearTimeout(timer) 
  }, [router])
  return (
    <div>Home</div>
  )
}

export default Home