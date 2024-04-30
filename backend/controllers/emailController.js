import Email  from "../models/Email.js";

export const createEmail = async (req, res) => {
  const { recipients, subject, body } = req.body;
  const sender = req.user._id;

  const recipientsArray = recipients.split(",");
  let date = new Date();
  let formattedDate = formatDate(date);

  const recipientIds = await User.find({ email: recipientsArray }, "_id");

  if (recipientIds.length !== 0) {
    const newEmail = await Email.create({
      sender,
      recipients: recipientIds,
      subject,
      body,
      sentAt: formattedDate,
      archived: false,
    });
    const recipientsToString = newEmail.recipients.join(",");
    return res.json({
      email: {
        _id: newEmail._id,
        sender: newEmail.sender,
        recipients: recipientsToString,
        subject: newEmail.subject,
        body: newEmail.body,
        sentAt: newEmail.sentAt,
        archived: newEmail.archived,
      },
    });
  }

  res.json({ message: "Invalid email" });
};
