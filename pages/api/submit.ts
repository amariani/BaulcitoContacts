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
  console.log("TODOBIEN body", body);
  console.log(
    "From SERVER --> process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL",
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL
  );
  console.log(
    "From SERVER --> process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY",
    process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  );
  console.log(
    "From SERVER --> process.env.NEXT_PUBLIC_GOOLE_SHEET_ID",
    process.env.NEXT_PUBLIC_GOOLE_SHEET_ID
  );

  try {
    // prepare auth for google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        // client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        client_email: "contactstrunk@baulcitocontacts.iam.gserviceaccount.com",
        // private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNVtF6BRDkBlO9\nssMYP6SbOcM6sk4kaD1BQjf+H2eWkywF3mZCr/u13ujNaLREm88CCADtRhvxVUUx\nd54LdhajqKhI2lWfjsnVnoCgIg2TwaQB5nsAqGxu0ESDtrZUkrnclal8fkzCiNG4\nK4O72io/0Geort/eH01t80pqdP3MGBjkezBMalTTAJ/Ejljr4RFFHBZjmwrdhWk9\nXzXr8ZQnxqpAyLMLKPFiryp3DfzNWCIefyF6BtUE3H408MS+UAX3dOuZNLJJDiyA\n2GP8yk+JedqlHCy0bRNDAUgoWONnGTn/c+JFae7GU9a5+L3vydU9Er3uFxhOU0lj\n8MCWraK5AgMBAAECggEAIRmE2F6/L4aekpZhkQPXUKdRw2ExK/i6oQ2f0YC19cWB\nA+wq/0Z3dIR7cfsWDfYwuxLXtWfHAtK8PeJakV3mfdim0eGSCk+d1OfBM67xkdcV\nzTGeM8eyfPVpCfNWtlDVkYt1f+orDPO5nK61BD/Bbjp1rzELSLayiE3+uaTksXSJ\nzQEVeJd3WkooIN31E6afRrUa8zy8MUrivXboaaPplW6QdQ+PBTHFLueX9dX/bE3K\nUz+4DAlrut1BBYYS7EsT0EsEKboX1k1PuV6JgRYowwmsBT8UdU2rxAea/MXBvzmU\nxOpVM+7Yc8NFZ20YdoK72oGKTVf5OoVzcLaoHidXpQKBgQD4bPJlfNCoVCkShKYK\nzZ/I8v4o+9R25///C/yZ27KHBEvWt1xz++STv21JUYXUtP20i6WjE6tmECCvj44A\nL4H7AeSrzY3TMwJZwBuFfA4es0ELJWin4MnbBbQQM2jFrOM/aPfoHtK+PRcDMlKf\nYV2HrEaC+rjC+t9BqWGqkdPrVQKBgQDTmZDcwEAa6uUvQzzDcCNxFZGB4HATOOqX\na7c4kapE9+fmdy5qKdZSdlROPmntF+fjoNGTGbdPqin9aIqTyvTWM6hi0WUUA0fK\n3FtPvTjStM6Bp0I2y1WynA3z5W9sB5cGWMkSDk7rHnT8zjI/WkmqadDn4LiIF/Od\nuyZ4urGB1QKBgCaYlphZ6fkdCjyMS1fGVprb1cz8QyguJ0Gy1Q36aiQ78KRtXHnQ\nmtSxmwMXHVnMvNX+FD/f4HM88jcUcJVqzCD5TFO83doARM84342/lloCs4pNx5K9\ng975Zd5WfmKn166UWl+/2jIgP6EJgnisoeFgTJww49+3JlSHQltDyM75AoGBAKk0\n+QF9/wVHZ0QXGWUTrFPGspfQGO9WKUoyyc5DtYv3TgserRAaKpfApgP3pw8Aed+t\n/0kJXGwpH/DTg1VSC92qa3GyDoklYmiXM7GdF+5uxWAqlyloCjyMzB+IDkSuARgD\nMa7toDAmJ9jtLoM4uQW8HmD+c7HorVgpi0cpy76NAoGAUEjqRdK3IQXqGKfjJZV5\n5GQpey+S9+u7dZn15HVOThAQWfS/rxBmpVUXoGvuqlpTs/DT3vObnJQV4c9UfWip\n8SvZNUNDzImHJAHE1RaYUOdsy8d9N0lB4jkKZddQxmHTD7Qm+c+J4gN9O0q8di9w\nrI30dPdpMqJH+8RWwRR34N8=\n-----END PRIVATE KEY-----\n"?.replace(
            /\\n/g,
            "\n"
          ),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheet = google.sheets({ version: "v4", auth });

    const response = await sheet.spreadsheets.values.append({
      // spreadsheetId: process.env.NEXT_PUBLIC_GOOLE_SHEET_ID,
      spreadsheetId: "1nFCzeYYK9K0i-XsqqlarfGGELkTHvlp_IRCy6iKhVBg",
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
