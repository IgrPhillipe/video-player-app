export const loadFeatures = async () => {
  const features = await import("@/lib/motion");

  return features.default;
};
