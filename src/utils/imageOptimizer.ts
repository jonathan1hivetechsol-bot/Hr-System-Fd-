/**
 * Image optimization utilities for Firebase uploads
 * Compresses images to reduce upload time and bandwidth
 */

export interface ImageOptimizationOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  maxSizeKB?: number
}

const DEFAULT_OPTIONS: ImageOptimizationOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.8,
  maxSizeKB: 500
}

/**
 * Compresses an image file
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Promise<File> - Compressed image file
 */
export async function compressImage(
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<File> {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Resize if necessary
        if (opts.maxWidth && width > opts.maxWidth) {
          height = (height * opts.maxWidth) / width
          width = opts.maxWidth
        }

        if (opts.maxHeight && height > opts.maxHeight) {
          width = (width * opts.maxHeight) / height
          height = opts.maxHeight
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'))
              return
            }

            // Check if compressed size is within limits
            const sizeInKB = blob.size / 1024
            if (opts.maxSizeKB && sizeInKB > opts.maxSizeKB) {
              // Recursively compress with lower quality
              const lowerQuality = (opts.quality || 0.8) * 0.9
              compressImage(file, { ...opts, quality: lowerQuality })
                .then(resolve)
                .catch(reject)
              return
            }

            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            })

            console.log(`Image compressed: ${(file.size / 1024).toFixed(2)}KB → ${(compressedFile.size / 1024).toFixed(2)}KB`)
            resolve(compressedFile)
          },
          'image/jpeg',
          opts.quality
        )
      }

      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }

      img.src = event.target?.result as string
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsDataURL(file)
  })
}

/**
 * Compresses multiple image files
 * @param files - Array of image files to compress
 * @param options - Compression options
 * @returns Promise<File[]> - Array of compressed image files
 */
export async function compressImages(
  files: File[],
  options: ImageOptimizationOptions = {}
): Promise<File[]> {
  try {
    const compressed = await Promise.all(
      files.map(file => compressImage(file, options))
    )
    return compressed
  } catch (error) {
    console.error('Error compressing images:', error)
    throw error
  }
}

/**
 * Validates image file
 * @param file - Image file to validate
 * @returns Object with validation result and error message if any
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please use JPG, PNG, or WebP.'
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${maxSize / (1024 * 1024)}MB`
    }
  }

  return { valid: true }
}
