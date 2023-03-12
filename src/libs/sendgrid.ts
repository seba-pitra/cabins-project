import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface Props {
  to: string;
  from: string;
  subject: string;
  html: string;
}

export async function sendEmail(mail: Props): Promise<any> {
  return await sgMail.send(mail);
}
