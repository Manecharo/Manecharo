import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Check if Sanity is configured
const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
                           process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.length > 0;

// Only create client if Sanity is properly configured
export const client = isSanityConfigured
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: true, // Use CDN for public data
      perspective: 'published',
      // Token removed - will add back once you generate a new token for this specific project
    })
  : null;

// Helper function to get Sanity client safely
export function getSanityClient() {
  if (!client) {
    console.warn("Sanity not configured. Add NEXT_PUBLIC_SANITY_PROJECT_ID to your .env file");
    return null;
  }
  return client;
}

// Image URL builder with fallback
export function urlFor(source: any) {
  if (!isSanityConfigured || !client) {
    // Return a mock builder that returns placeholder URLs
    return {
      url: () => "/placeholder-image.jpg",
      width: (w: number) => ({
        url: () => "/placeholder-image.jpg",
        height: (h: number) => ({
          url: () => "/placeholder-image.jpg"
        })
      }),
      height: (h: number) => ({
        url: () => "/placeholder-image.jpg",
        width: (w: number) => ({
          url: () => "/placeholder-image.jpg"
        })
      })
    };
  }

  const builder = imageUrlBuilder(client);
  return builder.image(source);
}
