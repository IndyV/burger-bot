import { firestore } from 'firebase';

import { integer } from '../arguments/integer';
import { text } from '../arguments/text';
import { createCommand } from '../utils/createCommand';

export const register = createCommand('register', {
  author: [text, true],
  repo: [text, true],
  commits: [integer, false]
}, async ({ author, repo, commits }, message) => {
  await firestore().collection('repos').add({
    repo: `${author}/${repo}`,
    commits: commits || 0,
    channel: message.channel.id
  });

  await message.channel.send('Successfully registered repo!');
});
