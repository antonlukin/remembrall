const autolinker = require('autolinker');
const escape = require('escape-html');

module.exports = (ctx, next) => {
  let msg = ctx.message;

  if (ctx.update.edited_message) {
    msg = ctx.update.edited_message;
  }

  const wrapEntity = (content, entity) => {
    switch (entity.type) {
      case 'bold':
        return `<b>${content}</b>`
      case 'italic':
        return `<i>${content}</i>`
      case 'code':
        return `<code>${content}</code>`
      case 'pre':
        return `<pre>${content}</pre>`
      default:
        return content
    }
  }

  const applyEntity = (text, entity) => {
    const head = text.substring(0, entity.offset)
    const tail = text.substring(entity.offset + entity.length)
    const content = wrapEntity(text.substring(entity.offset, entity.offset + entity.length), entity)

    return `${head}${content}${tail}`
  }

  const replaceHashtag = (match) => {
    if (match.getType() !== 'hashtag') {
      return;
    }

    let hashtag = match.getHashtag();
    return `<button data-hashtag="${hashtag}">${hashtag}</button>`;
  }

  // Escape all tags first
  msg.text = escape(msg.text);

  const entities = msg.entities || [];

  // Process entities to HTML tags
  msg.text = entities.reduceRight(applyEntity, msg.text);

  // Make clickable urls and hashtags
  msg.text = autolinker.link(msg.text, {
    'stripPrefix': false,
    'hashtag': 'twitter',
    'replaceFn': replaceHashtag
  });

  return next();
};