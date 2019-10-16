module.exports = (ctx, database) => {
  let msg = ctx.message;

  // Try to remove the message
  let removeMessage = () => {
    // Check if the message replied
    if (typeof msg.reply_to_message === 'undefined') {
      return ctx.reply("Reply to the desired message with this command to delete")
    }

    // Select user info by id
    let sql = `DELETE FROM messages WHERE id = ?`;

    database.run(sql, [msg.reply_to_message.message_id], (err, row) => {
      if (err) {
        return ctx.error(err, ctx);
      }

      return ctx.reply("Done. This message was removed from the database");
    });
  }

  return removeMessage();
}