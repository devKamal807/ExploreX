import { PixelRatio } from 'react-native';

const fontSize = (size, options = {}) => {
  const { minSize = size * 0.85, maxSize = size * 1.25 } = options;
  const scale = PixelRatio.getFontScale();
  const scaledSize = size * scale;
  
  // Clamp the font size between minSize and maxSize
  if (scaledSize < minSize) return minSize;
  if (scaledSize > maxSize) return maxSize;
  
  return scaledSize;
};

export default fontSize;
