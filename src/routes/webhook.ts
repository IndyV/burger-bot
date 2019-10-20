import { Client, TextChannel } from 'discord.js';
import { IRouter } from 'express';
import { firestore } from 'firebase';

export function registerWebhook(router: IRouter<unknown>, client: Client) {
  router.get('/', async (req, res) => {
    res.send('It\'s burger time baby');
  });

  router.post('/', async (req, res) => {
    console.log(req.body);
    const { ref, commits, repository: { full_name: repo, default_branch } } = req.body;
    const split = ref.split('/');

    if (split[split.length - 1] !== default_branch) {
      return;
    }

    const collection = await firestore().collection('repos').where('repo', '==', repo).get();

    if (collection.empty) {
      return;
    }

    let promises: Promise<void>[] = [];
    const map = new Map<string, number>();

    collection.forEach((document) => {
      const data = document.data();
      const next = data.commits + commits.length;

      map.set(data.channel, next);
      promises = [
        ...promises,
        firestore().collection('repos').doc(document.id).update({
          commits: next
        })
      ];
    });

    await Promise.all(promises);

    for (const [key, value] of map) {
      if (value % 100 !== 0) {
        continue;
      }

      const channel = client.channels.get(key) as TextChannel | undefined;

      if (!channel) {
        continue;
      }

      await channel.send('@everyone It\'s burger time baby!');
    }

    res.sendStatus(204);
  });
}
