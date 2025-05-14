import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } }).onUploadComplete(async ({ file }) => {
    console.log('✅ File uploaded:', file.url)
    return { uploadedUrl: file.url } // ✅ Return a JSON object!
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
