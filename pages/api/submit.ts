// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

type Data = {
  data: any;
};

type SheetForm = {
  first_name?: string;
  last_name: string;
  dob?: string;
  email: string;
  phone_number?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // If not POST request, deny access
  if (req.method !== "POST") {
    return res.status(405).json({ data: "Only POST requests allowed." });
  }

  // Make the API call to Google Spreadsheets and fill the row with the data
  const body = req.body as SheetForm;

  try {
    // prepare auth for google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheet = google.sheets({ version: "v4", auth });

    const response = await sheet.spreadsheets.values.append({
      spreadsheetId: process.env.GOOLE_SHEET_ID,
      range: "A1:E1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.first_name,
            body.last_name,
            body.dob,
            body.email,
            body.phone_number,
          ],
        ],
      },
    });

    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ data: error });
  }
}
