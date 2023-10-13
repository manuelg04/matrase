/* eslint-disable n/handle-callback-err */
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const sendEmailSendgrid = async (
  email: string,
  templateId: string,
  dynamicTemplateData: string
) => {
  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL as string,
      name: process.env.SENDGRID_FROM_NAME as string
    },
    dynamicTemplateData,
    templateId
  };

  // Create a method to send the email
  const sendEmail = sendgrid.send(msg);

  // Send email to the user with new password
  sendEmail.then().catch((error) => {
    throw new Error('Error sending email.');
  });
};

module.exports = { sendEmailSendgrid };
