import { Redis } from "@upstash/redis"

// Initialize Redis client with Upstash credentials
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Image storage configuration
const IMAGE_EXPIRY_SECONDS = 60 * 60 * 24 * 365 // 1 year
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export interface ImageUploadResult {
  success: boolean
  imageId?: string
  imageUrl?: string
  error?: string
}

/**
 * Validates image file before upload
 */
export function validateImage(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "No file provided" }
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
    }
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`,
    }
  }

  return { valid: true }
}

/**
 * Converts File to base64 string for storage in Redis
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Stores image in Redis with metadata
 * Returns image ID for retrieval
 */
export async function storeImageInRedis(
  file: File,
  metadata: {
    reportType: "water_leak" | "food_wastage"
    reportId?: string
    uploaderId?: string
  },
): Promise<ImageUploadResult> {
  try {
    // Validate image
    const validation = validateImage(file)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    // Convert to base64
    const base64Data = await fileToBase64(file)

    // Generate unique image ID
    const imageId = `img:${Date.now()}:${Math.random().toString(36).substring(7)}`

    // Store image data with metadata
    const imageData = {
      data: base64Data,
      filename: file.name,
      contentType: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      metadata,
    }

    await redis.set(imageId, JSON.stringify(imageData), {
      ex: IMAGE_EXPIRY_SECONDS,
    })

    // Create a URL for the image (points to our API endpoint)
    const imageUrl = `/api/images/${imageId}`

    return {
      success: true,
      imageId,
      imageUrl,
    }
  } catch (error) {
    console.error("[Redis Storage] Error storing image:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to store image",
    }
  }
}

/**
 * Retrieves image from Redis by ID
 */
export async function getImageFromRedis(imageId: string): Promise<{
  success: boolean
  data?: string
  contentType?: string
  filename?: string
  error?: string
}> {
  try {
    const imageDataStr = await redis.get<string>(imageId)

    if (!imageDataStr) {
      return { success: false, error: "Image not found" }
    }

    const imageData = JSON.parse(imageDataStr)

    return {
      success: true,
      data: imageData.data,
      contentType: imageData.contentType,
      filename: imageData.filename,
    }
  } catch (error) {
    console.error("[Redis Storage] Error retrieving image:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to retrieve image",
    }
  }
}

/**
 * Deletes image from Redis
 */
export async function deleteImageFromRedis(imageId: string): Promise<boolean> {
  try {
    await redis.del(imageId)
    return true
  } catch (error) {
    console.error("[Redis Storage] Error deleting image:", error)
    return false
  }
}

/**
 * Lists all image IDs for a specific report
 */
export async function listReportImages(reportId: string): Promise<string[]> {
  try {
    // Scan for keys matching the report
    const keys = await redis.keys(`img:*`)
    const reportImages: string[] = []

    for (const key of keys) {
      const imageDataStr = await redis.get<string>(key)
      if (imageDataStr) {
        const imageData = JSON.parse(imageDataStr)
        if (imageData.metadata?.reportId === reportId) {
          reportImages.push(key)
        }
      }
    }

    return reportImages
  } catch (error) {
    console.error("[Redis Storage] Error listing report images:", error)
    return []
  }
}
