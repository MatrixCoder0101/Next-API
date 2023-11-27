// Welcome API

import knights from 'knights-canvas';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const downloadImage = async (url, filename) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  await fs.writeFile(filename, Buffer.from(response.data, 'binary'));
};

export default async function handler(req, res) {
  const username = req.query.username || 'MatrixCoder';
  const guildName = req.query.guildName || 'Programmers';
  const guildIcon = req.query.guildIcon || 'https://i.ibb.co/G5mJZxs/rin.jpg';
  const memberCount = req.query.memberCount || '101';
  const avatar = req.query.avatar || 'https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg';
  const background = req.query.background || 'https://i.ibb.co/4YBNyvP/images-76.jpg';

  try {
    // Download images
    await downloadImage(guildIcon, 'public/guildIcon.jpg');
    await downloadImage(avatar, 'public/avatar.jpg');
    await downloadImage(background, 'public/background.jpg');

    // Generate welcome image
    const image = await new knights.Welcome()
      .setUsername(username)
      .setGuildName(guildName)
      .setGuildIcon('/guildIcon.jpg') // Adjust the path based on your folder structure
      .setMemberCount(memberCount)
      .setAvatar('/avatar.jpg') // Adjust the path based on your folder structure
      .setBackground('/background.jpg') // Adjust the path based on your folder structure
      .toAttachment();

    const data = image.toBuffer();
    const filename = `welcome-${username}.png`;
    const filePath = path.join(process.cwd(), 'public', filename);

    await fs.writeFile(filePath, data);

    res.status(200).sendFile(filePath);
  } catch (error) {
    console.error('Error generating welcome image:', error);
    res.status(500).send(`Internal Server Error: ${error.message}`);

  } finally {
    // Delete downloaded images
    await fs.unlink(path.join(process.cwd(), 'public', 'guildIcon.jpg'));
    await fs.unlink(path.join(process.cwd(), 'public', 'avatar.jpg'));
    await fs.unlink(path.join(process.cwd(), 'public', 'background.jpg'));
  }
}
