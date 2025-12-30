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
  options: ImageOptimizationOptions = {},
  retryCount = 0
): Promise<File> {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const maxRetries = 3

  return new Promise((resolve, reject) => {
    // If file is already small enough, just return it
    if (file.size < (opts.maxSizeKB || 500) * 1024) {
      console.log(`Image already small: ${(file.size / 1024).toFixed(2)}KB`)
      resolve(file)
      return
    }

    const reader = new FileReader()
    const timeoutId = setTimeout(() => {
      reader.abort()
      if (retryCount < maxRetries) {
        console.log(`Compression timeout, retrying... (${retryCount + 1}/${maxRetries})`)
        compressImage(file, options, retryCount + 1).then(resolve).catch(reject)
      } else {
        reject(new Error('Image compression timeout after retries'))
      }
    }, 10000) // 10 second timeout per attempt

    reader.onload = (event) => {
      clearTimeout(timeoutId)
      try {
        const img = new Image()

        img.onload = () => {
          try {
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
              throw new Error('Failed to get canvas context')
            }

            ctx.drawImage(img, 0, 0, width, height)

            // Use canvas.toBlob with proper error handling
            canvas.toBlob(
              (blob) => {
                try {
                  if (!blob) {
                    throw new Error('Canvas blob is null')
                  }

                  const compressedFile = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now()
                  })

                  const sizeInKB = compressedFile.size / 1024
                  console.log(`Image compressed: ${(file.size / 1024).toFixed(2)}KB → ${sizeInKB.toFixed(2)}KB`)
                  
                  // If still too large, try again with lower quality
                  if (opts.maxSizeKB && sizeInKB > opts.maxSizeKB && (opts.quality || 0.8) > 0.3) {
                    const lowerQuality = (opts.quality || 0.8) * 0.85
                    console.log(`Size ${sizeInKB.toFixed(0)}KB exceeds limit, retrying with quality: ${(lowerQuality * 100).toFixed(0)}%`)
                    compressImage(compressedFile, { ...opts, quality: lowerQuality }, retryCount)
                      .then(resolve)
                      .catch(reject)
                    return
                  }

                  resolve(compressedFile)
                } catch (err) {
                  console.error('Error in toBlob callback:', err)
                  reject(err)
                }
              },
              'image/jpeg',
              opts.quality || 0.8
            )
          } catch (err) {
            console.error('Error in image processing:', err)
            reject(err)
          }
        }

        img.onerror = () => {
          reject(new Error('Failed to load image'))
        }

        img.src = event.target?.result as string
      } catch (err) {
        console.error('Error loading image:', err)
        reject(err)
      }
    }

    reader.onerror = () => {
      clearTimeout(timeoutId)
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
