import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

const VideosPage = async () => {
  //Fetch all videos
  const videos = await prisma.video.findMany()

  return (
    <div>
      <h1>Video List</h1>
      <Link href="/videos/video/add">
        <button>Add New Video</button>
      </Link>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h2>{video.name}</h2>
            <p>{video.length} seconds</p>
            <Link href={`/videos/video/${video.id}`}>View Video</Link>
            <Link href={`/videos/video/edit/${video.id}`}>Edit</Link>

            
            
          </li>
        ))}
      </ul>
    </div>
  )
}

/*
old delete form method
<form method="POST" action={`/videos/video/delete/${video.id}`}>
<button type="submit">Delete</button>
</form>
*/
export default VideosPage
