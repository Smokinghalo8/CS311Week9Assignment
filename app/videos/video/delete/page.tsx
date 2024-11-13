// app/videos/video/delete/[id]/page.tsx

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

// The DeleteVideoPage will be an async function that handles the ID passed in the params.
interface DeleteVideoPageProps {
  params: {
    id: string
  }
}

// This will handle deletion of the video based on the provided `id`.
const DeleteVideoPage = async ({ params }: DeleteVideoPageProps) => {
  const { id } = params
  // Delete the video by its ID
  await prisma.video.delete({
    where: { id: Number(id) },
  })

  // After deletion, redirect to the videos list page
  redirect('/videos')
}

export default DeleteVideoPage
