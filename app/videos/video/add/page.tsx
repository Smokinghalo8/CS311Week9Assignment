// app/videos/video/add/page.tsx

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

const AddVideoPage = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const name = formData.get('name') as string
    const url = formData.get('url') as string
    const votes = parseInt(formData.get('votes') as string, 10)
    const length = parseInt(formData.get('length') as string, 10)

    // Add the video to the database
    await prisma.video.create({
      data: { name, url, votes, length },
    })

    // Redirect to videos list
    redirect('/videos')
  }

  return (
    <div>
      <h1>Add New Video</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Video Name" required />
        <input name="url" placeholder="Video URL" required />
        <input name="votes" type="number" placeholder="Votes" required />
        <input name="length" type="number" placeholder="Length in seconds" required />
        <button type="submit">Add Video</button>
      </form>
    </div>
  )
}

export default AddVideoPage
