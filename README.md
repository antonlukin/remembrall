# Remembrall

> [!CAUTION]
> **The project is closed.** Remembrall is no longer running: the bot, the website and all user pages have been shut down and deleted, and the data has been removed. This repository is kept as an archive of the source code only.

Remembrall was a Telegram bot for saving and sharing useful links. It let you keep a list of links tied to your Telegram account: you sent the bot a message with a link, optionally with a description and hashtags, and it built an easy-to-navigate page out of them.

By default the links were visible only to their owner, but a Remembrall page could be made public for everyone or shared with people who had a unique secret key.

![demo](https://user-images.githubusercontent.com/454185/67796573-dc615600-fab2-11e9-9ddb-5c6b40ef73f3.png)


## How it worked

You sent messages to the bot in Telegram: pasted links, added descriptions and #tags. Editing a message in Telegram updated it on the page.

### Commands

```
/getlink — get a link to your Remembrall page; only you can see it.
/makepublic — make Remembrall page visible for everyone on the internet.
/makeprivate — make Remembrall page available only with the secret key.
/resetkey — reset Remembrall link secret token.
/fixname — update the page URL after changing your Telegram username.
/forget — delete message from database.
```

### Limits

- Every user could store up to 250 messages. Once over the limit, existing content stayed readable, but new links could not be added until some were deleted.
- Only text and links were supported.
- The bot worked only with regular users, not in groups or channels.

### Deleting messages

To remove a message from the page, you replied to it in the chat with the bot using the `/forget` command. If the message had already been deleted from the conversation, you could copy its link from the Remembrall page (the # icon) and send it to the bot with `/forget`.
