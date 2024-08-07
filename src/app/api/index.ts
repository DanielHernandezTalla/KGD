import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const route = req.headers.route;
  const params = req.headers.params;

  const dataRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}?${params}`);
  const data = await dataRes.json();
  res.status(200).json(data);
}
