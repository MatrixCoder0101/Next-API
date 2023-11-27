// Random Anime

import fs from 'fs';
import path from 'path';

const rootDirectory = process.cwd();
const folders = ['Anime', 'Anime2'];

async function getRandomImage(directory, directoryName) {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });

    const imageFiles = files
      .filter(file => file.isFile() && /\.(jpg|jpeg|png|gif)$/i.test(file.name))
      .map(file => file.name);

    if (imageFiles.length === 0) {
      throw new Error(`No images found in ${directoryName}`);
    }

    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const randomImage = imageFiles[randomIndex];
    const imagePath = path.join(directory, randomImage);

    return imagePath;
  } catch (error) {
    throw error;
  }
}

export default function handler(req, res) {
  try {
    const randomFolder = Math.random() < 0.5 ? 'Anime' : 'Anime';
    const randomDirectory = path.join(rootDirectory, 'public', randomFolder);

    getRandomImage(randomDirectory, randomFolder, (err, imagePath) => {
      if (err) {
        console.error('Error serving random image:', err);
        res.status(500).json({ error: `Internal Server Error: ${err}` });
      } else {
        res.sendFile(imagePath);
      }
    });
  } catch (error) {
    console.error('Error serving random image:', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
}