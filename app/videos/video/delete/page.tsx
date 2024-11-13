// app/videos/video/delete/[id]/page.tsx

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

// Define the DeleteVideoPageProps interface, where params is just { id: string }.
interface DeleteVideoPageProps {
  params: {
    id: string;
  }
}

// Use async function to handle video deletion
const DeleteVideoPage = async ({ params }: DeleteVideoPageProps) => {
  const { id } = params; // Get the id from params
  // Delete the video by its ID
  await prisma.video.delete({
    where: { id: Number(id) }, // Convert the id to a number for the database
  });

  // Redirect to the videos list after deletion
  redirect('/videos');
}

export default DeleteVideoPage;
