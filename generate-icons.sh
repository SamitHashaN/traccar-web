#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is required. Please install it first."
    echo "On Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "On macOS: brew install imagemagick"
    exit 1
fi

# Create PNG versions of the logo in different sizes
echo "Generating icons..."

# Generate PWA icons
convert -background none -resize 64x64 public/city.jpg public/pwa-64x64.png
convert -background none -resize 192x192 public/city.jpg public/pwa-192x192.png
convert -background none -resize 512x512 public/city.jpg public/pwa-512x512.png

# Generate Apple touch icon
convert -background none -resize 180x180 public/city.jpg public/apple-touch-icon-180x180.png

# Generate maskable icon
convert -background none -resize 512x512 public/city.jpg public/maskable-icon-512x512.png

# Generate favicon
convert -background none -resize 32x32 public/city.jpg public/favicon.ico

echo "Icons generated successfully!" 