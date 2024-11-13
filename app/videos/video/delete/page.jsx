import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

const DeleteVideoPage = async ({ params }) => {
  const { id } = params

  const video = await prisma.video.findUnique({
    where: { id: Number(id) },
  })

  if (!video) {
    redirect('/videos')
  }

  await prisma.video.delete({
    where: { id: video.id },
  })

  redirect('/videos')
}

export default DeleteVideoPage
