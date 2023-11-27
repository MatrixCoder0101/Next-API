// Welcome API

import knights from 'knights-canvas';

export default async function handler(req, res) {
  try {
    const username = req.query.username || 'UNDEFINED';
    const guildName = req.query.guildName || 'WIBU NOLEP';
    const guildIcon = req.query.guildIcon || 'https://i.ibb.co/G5mJZxs/rin.jpg';
    const memberCount = req.query.memberCount || '120';
    const avatar = req.query.avatar || 'https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg';
    const background = req.query.background || 'https://i.ibb.co/4YBNyvP/images-76.jpg';

    // Generate welcome image
    const image = await new knights.Welcome()
      .setUsername(username)
      .setGuildName(guildName)
      .setGuildIcon(guildIcon)
      .setMemberCount(memberCount)
      .setAvatar(avatar)
      .setBackground(background)
      .toAttachment();

    const data = image.toBuffer();

    // Set content type and send the image
    res.setHeader('Content-Type', 'image/png');
    res.send(data, 'binary');
  } catch (error) {
    console.error('Error generating or serving welcome image:', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
}