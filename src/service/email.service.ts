"use server";

import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
} from "@aws-sdk/client-ses";

const client = new SESClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_EMAIL_ACCESS_ID ?? "",
    secretAccessKey: process.env.AWS_EMAIL_SECRET_KEY ?? "",
  },
});

export async function sendEmail(
  toAddresses: string[],
  subject: string,
  body: string
) {
  try {
    const params: SendEmailCommandInput = {
      Source: "your email",
      Destination: {
        ToAddresses: toAddresses,
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: body,
            Charset: "UTF-8",
          },
        },
      },
    };
    const command = new SendEmailCommand(params);
    const response = await client.send(command);
    console.log("Email sent:", response);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
