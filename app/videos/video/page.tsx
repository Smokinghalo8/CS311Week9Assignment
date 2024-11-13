// app/videos/video/page.tsx

import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

interface VideoPageProps {
  params: {
    id: string
  }
}

const VideoPage = async ({ params }: VideoPageProps) => {
  const video = await prisma.video.findUnique({
    where: { id: Number(params.id) },
  })

  if (!video) {
    notFound() // Show a 404 page if the video doesn't exist
  }

  return (
    <div>
      <h1>{video.name}</h1>
      <p>Votes: {video.votes}</p>
      <p>Length: {video.length} seconds</p>
      <p>URL: {video.url}</p>

      {/* Link to edit */}
      <a href={`/videos/video/edit/${video.id}`}>Edit</a>

      {/* Delete form */}
      <form method="POST" action={`/videos/video/delete/${video.id}`}>
        <button type="submit">Delete Video</button>
      </form>
    </div>
  )
}

export default VideoPage
