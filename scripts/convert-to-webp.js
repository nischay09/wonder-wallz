const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const folders = [
  "public/Wonder",
  "public/Religion",
  "public/art",
  "public/KIDS Collection",
  "public/Wall mural",
  "public/3D wall mural",
];

async function convertFolder(folder) {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const inputPath = path.join(folder, file);
    const outputPath = path.join(
      folder,
      path.basename(file, ext) + ".webp"
    );

    try {
      await sharp(inputPath)
        .webp({
          quality: 82,
          effort: 6,
        })
        .toFile(outputPath);

      console.log(`✓ ${outputPath}`);
    } catch (err) {
      console.error(`✗ ${inputPath}`, err);
    }
  }
}

(async () => {
  for (const folder of folders) {
    if (fs.existsSync(folder)) {
      await convertFolder(folder);
    }
  }

  console.log("Done!");
})();