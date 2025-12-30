const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Grid configuration based on the image analysis
const COLS = 6;
const ROWS = 4;

// Icon mapping - position to filename (row, col) starting from 0
// Based on the visual analysis of the image
const iconMapping = [
  // Row 0
  { row: 0, col: 0, name: 'nextjs' },
  { row: 0, col: 1, name: 'react' },
  { row: 0, col: 2, name: 'remix' },      // The cycle icon
  { row: 0, col: 3, name: 'typescript' },
  { row: 0, col: 4, name: 'tailwind' },
  { row: 0, col: 5, name: 'gsap' },
  // Row 1
  { row: 1, col: 0, name: 'threejs' },    // Network/3D looking icon
  { row: 1, col: 1, name: 'nodejs' },
  { row: 1, col: 2, name: 'nodejs-alt' }, // Node with leaf
  { row: 1, col: 3, name: 'nestjs' },
  { row: 1, col: 4, name: 'postgresql' },
  { row: 1, col: 5, name: 'mongodb' },
  // Row 2
  { row: 2, col: 0, name: 'aws' },
  { row: 2, col: 1, name: 'docker' },
  { row: 2, col: 2, name: 'n8n' },
  { row: 2, col: 3, name: 'vercel' },
  { row: 2, col: 4, name: 'deno' },       // Squirrel icon
  { row: 2, col: 5, name: 'redis' },
  // Row 3
  { row: 3, col: 0, name: 'graphql' },
  { row: 3, col: 1, name: 'discord' },    // Chat bubble
  { row: 3, col: 2, name: 'grammarly' },  // G icon
  { row: 3, col: 3, name: 'vercel-alt' }, // Triangle
  { row: 3, col: 4, name: 'solidity' },   // Triangle variant
  { row: 3, col: 5, name: 'algolia' },    // Search icon
];

async function splitIcons() {
  const inputPath = path.join(__dirname, '..', 'Tech Stack.png');
  const outputDir = path.join(__dirname, '..', 'public', 'icons', 'tech');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get image metadata
  const metadata = await sharp(inputPath).metadata();
  console.log(`Image dimensions: ${metadata.width}x${metadata.height}`);

  // Calculate icon size (assuming equal spacing)
  const iconWidth = Math.floor(metadata.width / COLS);
  const iconHeight = Math.floor(metadata.height / ROWS);
  console.log(`Icon size: ${iconWidth}x${iconHeight}`);

  // Extract each icon
  for (const icon of iconMapping) {
    const left = icon.col * iconWidth;
    const top = icon.row * iconHeight;

    const outputPath = path.join(outputDir, `${icon.name}.png`);

    await sharp(inputPath)
      .extract({
        left: left,
        top: top,
        width: iconWidth,
        height: iconHeight,
      })
      .png()
      .toFile(outputPath);

    console.log(`Extracted: ${icon.name}.png`);
  }

  console.log('\nAll icons extracted successfully!');
  console.log(`Output directory: ${outputDir}`);
}

splitIcons().catch(console.error);
