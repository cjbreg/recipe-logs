// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetch } from "undici";
import createMetascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperTitle from "metascraper-title";
import metascraperAuthor from "metascraper-author";
import metascraperLogo from "metascraper-logo";
import metascraperPublisher from "metascraper-publisher";
import { resolve } from "path";
import { resolveSoa } from "dns";

const metascraper = createMetascraper([
  metascraperDescription(),
  metascraperImage(),
  metascraperTitle(),
  metascraperAuthor(),
  metascraperLogo(),
  metascraperPublisher(),
]);

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { targetUrl } = req.query ?? "";
    const query = targetUrl?.toString() ?? "";
    const { html, url } = await fetch(query).then(async (res) => ({
      url: res.url,
      html: await res.text(),
    }));
    const metadata = await metascraper({ html, url });

    res.status(200).send({ data: metadata });
    res.end();
  } catch (error) {
    throw error;
  }
}
