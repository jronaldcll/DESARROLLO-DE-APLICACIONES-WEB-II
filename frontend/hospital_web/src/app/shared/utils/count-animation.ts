import { isPlatformBrowser } from '@angular/common';

/**
 * Reusable layout-independent count-up animation utility.
 * Animates a numeric value from 0 to the target while preserving prefixes, suffixes,
 * decimal points, and thousands-separator commas.
 * 
 * @param value The raw string/number to parse and animate (e.g. "$48,697", "91.4%", "1,135", "524")
 * @param duration The animation duration in milliseconds
 * @param platformId Platform token to check if running in browser (prevents SSR timer loops)
 * @param callback Callback triggered on each frame with the formatted intermediate value
 * @returns Cleanup function to clear the interval timer
 */
export function animateCount(
  value: string | number,
  duration: number,
  platformId: Object,
  callback: (v: string | number) => void
): () => void {
  if (!isPlatformBrowser(platformId)) {
    callback(value);
    return () => {};
  }

  const str = String(value).trim();
  if (!str) {
    callback(value);
    return () => {};
  }

  // Extract prefix (any non-numeric characters at the start, excluding minus sign)
  const prefixMatch = str.match(/^[^0-9\-]+/);
  const prefix = prefixMatch ? prefixMatch[0] : '';
  
  // Extract suffix (any non-numeric characters at the end)
  const suffixMatch = str.match(/[^0-9]+$/);
  const suffix = suffixMatch ? suffixMatch[0] : '';
  
  // Get the numeric part (remove prefix and suffix, and commas)
  let numStr = str;
  if (prefix) numStr = numStr.slice(prefix.length);
  if (suffix) numStr = numStr.slice(0, -suffix.length);
  
  const hasCommas = numStr.includes(',');
  numStr = numStr.replace(/,/g, '');
  
  const target = parseFloat(numStr);
  
  if (isNaN(target) || target <= 0) {
    // If not a parseable positive number, fallback to raw value without animation
    callback(value);
    return () => {};
  }
  
  // Determine number of decimal places
  const decimalIndex = numStr.indexOf('.');
  const decimals = decimalIndex >= 0 ? (numStr.length - decimalIndex - 1) : 0;
  
  const frameRate = 60;
  const totalFrames = Math.round((duration / 1000) * frameRate);
  let frame = 0;
  
  // Start the display value at 0 (properly formatted)
  callback(formatValue(0, prefix, suffix, decimals, hasCommas));
  
  const timerId = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    // easeOutQuad transition: smooth deceleration at the end
    const easeProgress = progress * (2 - progress);
    const currentVal = target * easeProgress;
    
    if (frame >= totalFrames) {
      callback(value); // Set exact target formatting at final frame
      clearInterval(timerId);
    } else {
      callback(formatValue(currentVal, prefix, suffix, decimals, hasCommas));
    }
  }, 1000 / frameRate);
  
  return () => {
    clearInterval(timerId);
  };
}

/**
 * Formats a raw number back to its visual string representation with prefix, suffix, decimals, and commas.
 */
function formatValue(current: number, prefix: string, suffix: string, decimals: number, useCommas: boolean): string {
  let numStr = current.toFixed(decimals);
  if (useCommas) {
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    numStr = parts.join('.');
  }
  return prefix + numStr + suffix;
}
