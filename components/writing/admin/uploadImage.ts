import { browserClient } from '@/lib/supabase/browser'

const MAX_EDGE = 2000

/** Downscales to 2000px on the long edge, re-encodes as WebP and uploads to post-images/<postId>/. Returns the public URL. */
export async function uploadImage(file: File, postId: string): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Choose an image file.')
  let blob: Blob = file
  let ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  if (file.type !== 'image/gif') {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Could not process the image.'))), 'image/webp', 0.85),
    )
    ext = 'webp'
  }
  const base = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'image'
  const path = `${postId}/${Date.now()}-${base}.${ext}`
  const supabase = browserClient()
  const { error } = await supabase.storage.from('post-images').upload(path, blob, { contentType: blob.type || file.type })
  if (error) throw new Error(error.message)
  return supabase.storage.from('post-images').getPublicUrl(path).data.publicUrl
}
