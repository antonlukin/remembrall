# With Remembrall, all your links in one place

[Remembrall](https://remembrall.app) is a Telegram bot for saving and sharing useful links. It lets you create a list of links related to your Telegram account. Just send a message with a link to [@remembrall_robot](https://t.me/remembrall_robot), optionally add description and hashtags for creating easy-to-find navigation.

By default your links are only visible to you, but you can make Remembrall page public for everyone or for the people with access to the unique key.

Remembrall is an awesome tool for those who love notes, organization and clear design.

[Take a look at the demo →](https://remembrall.app/lukin)

![demo](https://user-images.githubusercontent.com/454185/67796573-dc615600-fab2-11e9-9ddb-5c6b40ef73f3.png)


## How it works

Send messages to [@remembrall_robot](https://t.me/remembrall_robot) in Telegram: paste your links, add descriptions and #tags.

### Where can I find a list of all commands?

```
/getlink — get a link to your Remembrall page; only you can see it.
/makepublic — make Remembrall page visible for everyone on the internet.
/makeprivate — make Remembrall page available only with the secret key.
/resetkey — reset Remembrall link secret token.
/forget — delete message from database.
```

### How many links I can store up with Remembrall?

Remembrall has a storage limit: every user can store up 250 messages. When you go over the storage limit, you can still read existing content, but you won't be able to add new links. However, you can delete existing messages to free up your storage.

### How I can delete my message?

If you want to remove information from your Remembrall page, open chat with Remembrall bot, find the message and reply on it with `/forget` command. In situation when message has already been deleted from conversation, you can get link on it. Copy link on Remembrall page by tapping # icon and send it to [@remembrall_robot](https://t.me/remembrall_robot) with `/forget` command.

### How do I edit message?

Just edit it in Telegram conversation.

### What happens if I change my username on Telegram?

If you want update your url on Remembrall page, you should enter /fixname command.

### Which content I can save with Remembrall?

Now you can store up only text and links. If you need more, message me.

### Can I use Remembrall in groups and channels?

No. Bot stores up messages only by regular users.

### I still have questions. Who can I ask them?
If you have any further questions, comments and suggestion, message me: [open ticket](https://github.com/antonlukin/remembrall/issues/new) on Github or write me to [Telegram](https://t.me/lukin)
