import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

const AddVideoPage = async () => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const url = formData.get('url')
    const votes = parseInt(formData.get('votes'), 10)
    const length = parseInt(formData.get('length'), 10)

    await prisma.video.create({
      data: { name, url, votes, length },
    })

    redirect('/videos')
  }

  return (
    <div>
      <h1>Add New Video</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" required />
        <input name="url" required />
        <input name="votes" type="number" required />
        <input name="length" type="number" required />
        <button type="submit">Add Video</button>
      </form>
    </div>
  )
}

export default AddVideoPage
