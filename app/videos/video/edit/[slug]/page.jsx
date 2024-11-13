import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

interface EditVideoPageProps {
  params: {
    slug: string
  }
}

const EditVideoPage = async ({ params }: EditVideoPageProps) => {
  const video = await prisma.video.findUnique({
    where: { id: Number(params.slug) },
  })


  //finangle with more later
  if (!video) {
    redirect('/videos')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const name = formData.get('name') as string
    const url = formData.get('url') as string
    const votes = parseInt(formData.get('votes') as string, 10)
    const length = parseInt(formData.get('length') as string, 10)

    //update the video in the database
    await prisma.video.update({
      where: { id: video.id },
      data: { name, url, votes, length },
    })

    //redirect to the video page after update
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
