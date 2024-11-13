import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const VideosListPage = async () => {
  const videos = await prisma.video.findMany()

  return (
    <div>
      <h1>Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <a href={`/videos/video/${video.id}`}>{video.name}</a>
            <form action={`/videos/video/delete/${video.id}`} method="POST">
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VideosListPage
