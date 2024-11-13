import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const VideoPage = async ({ params }) => {
  const { id } = params
  const video = await prisma.video.findUnique({
    where: { id: Number(id) },
  })

  if (!video) {
    return <div>Video not found</div>
  }

  return (
    <div>
      <h1>{video.name}</h1>
      <video src={video.url} controls />
      <p>Votes: {video.votes}</p>
      <p>Length: {video.length} seconds</p>
    </div>
  )
}

export default VideoPage
