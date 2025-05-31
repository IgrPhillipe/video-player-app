export const loadFeatures = async () => {
  const features = await import('@/lib/framer-motion');

  return features.default;
};
