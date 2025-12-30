const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// The image is 1020x773 with 6 columns and 4 rows
const COLS = 6;
const ROWS = 4;
const OUTPUT_SIZE = 128; // Final output size

// Icon names mapping
const iconNames = [
  // Row 0
  ['nextjs', 'react', 'remix', 'typescript', 'tailwind', 'gsap'],
  // Row 1
  ['threejs', 'nodejs', 'nodejs-alt', 'nestjs', 'postgresql', 'mongodb'],
  // Row 2
  ['aws', 'docker', 'n8n', 'vercel', 'deno', 'redis'],
  // Row 3
  ['graphql', 'discord', 'grammarly', 'vercel-alt', 'solidity', 'algolia'],
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
  const imgWidth = metadata.width;
  const imgHeight = metadata.height;

  console.log(`Image dimensions: ${imgWidth}x${imgHeight}`);

  // Calculate cell dimensions
  const cellWidth = imgWidth / COLS;
  const cellHeight = imgHeight / ROWS;

  console.log(`Cell size: ${cellWidth.toFixed(1)}x${cellHeight.toFixed(1)}`);
  console.log(`Output size: ${OUTPUT_SIZE}x${OUTPUT_SIZE}px\n`);

  // Extract each icon
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const name = iconNames[row][col];

      // Calculate cell bounds
      const cellLeft = Math.round(col * cellWidth);
      const cellTop = Math.round(row * cellHeight);
      const cellRight = Math.round((col + 1) * cellWidth);
      const cellBottom = Math.round((row + 1) * cellHeight);

      // Extract the full cell
      const extractWidth = cellRight - cellLeft;
      const extractHeight = cellBottom - cellTop;

      const outputPath = path.join(outputDir, `${name}.png`);

      try {
        await sharp(inputPath)
          .extract({
            left: cellLeft,
            top: cellTop,
            width: extractWidth,
            height: extractHeight,
          })
          // Trim transparent/white edges to get just the icon
          .trim({
            background: '#FFFFFF',
            threshold: 50,
          })
          // Resize to uniform output size with padding if needed
          .resize(OUTPUT_SIZE, OUTPUT_SIZE, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png()
          .toFile(outputPath);

        console.log(`✓ Extracted: ${name}.png (cell: ${cellLeft},${cellTop} ${extractWidth}x${extractHeight})`);
      } catch (err) {
        console.error(`✗ Failed: ${name}.png - ${err.message}`);
      }
    }
  }

  console.log('\nAll icons extracted successfully!');
  console.log(`Output directory: ${outputDir}`);
}

splitIcons().catch(console.error);
