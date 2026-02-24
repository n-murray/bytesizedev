export type App = {
  slug: string;
  title: string;
  releaseDate?: string;
  coverImage?: string;
  description?: string;
  platforms?: string[]; // e.g. ["web","ios","android"]
  privacyPolicyUrl?: string; // optional external URL if you prefer
  content: string; // main markdown content (without privacy section)
  privacyContent?: string; // extracted markdown for privacy policy
};
