// app/videos/video/delete/[id]/page.tsx

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

interface DeleteVideoProps {
  params: {
    id: string
  }
}

const DeleteVideoPage = async ({ params }: DeleteVideoProps) => {
  // Delete the video by its ID
  await prisma.video.delete({
    where: { id: Number(params.id) },
  })

  // Redirect back to the video list after deletion
  redirect('/videos')
}

export default DeleteVideoPage
