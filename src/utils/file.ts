export const generateFileKey = (originalName: string): string => {
  const timestamp = Date.now();
  const sanitizedOriginalName = originalName.replace(/\s+/g, "_");
  return `uploads/profiles/${timestamp}_${sanitizedOriginalName}`;
};
