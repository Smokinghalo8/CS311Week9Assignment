"use client" //added this

import { useState } from 'react'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

const AddVideoPage = () => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [votes, setVotes] = useState(0)
  const [length, setLength] = useState(0)

  const handleSubmit = async (event) => {
    event.preventDefault()

    await prisma.video.create({
      data: { name, url, votes, length },
    })

    // Redirect to the list of videos
    redirect('/videos')
  }
//changed out the return function
  return (
    <div>
      <h1>Add New Video</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Votes:
          <input
            type="number"
            value={votes}
            onChange={(e) => setVotes(Number(e.target.value))}
            required
          />
        </label>
        <label>
          Length (seconds):
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            required
          />
        </label>
        <button type="submit">Add Video</button>
      </form>
    </div>
  )
}

export default AddVideoPage
