import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

const EditVideoPage = async ({ params }) => {
  const { slug } = params
  const video = await prisma.video.findUnique({
    where: { id: Number(slug) },
  })

  if (!video) {
    redirect('/videos')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const url = formData.get('url')
    const votes = parseInt(formData.get('votes'), 10)
    const length = parseInt(formData.get('length'), 10)

    await prisma.video.update({
      where: { id: video.id },
      data: { name, url, votes, length },
    })

    redirect(`/videos/video/${video.id}`)
  }

  return (
    <div>
      <h1>Edit Video</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" defaultValue={video.name} required />
        <input name="url" defaultValue={video.url} required />
        <input name="votes" type="number" defaultValue={video.votes} required />
        <input name="length" type="number" defaultValue={video.length} required />
        <button type="submit">Update Video</button>
      </form>
    </div>
  )
}

export default EditVideoPage
