import { getSession } from 'next-auth/react';

// Mock database for demonstration
let referrals = [
  { id: 1, email: 'dev1@example.com', status: 'Pending', earnings: 0, inviteDate: '2024-08-15' },
  { id: 2, email: 'dev2@example.com', status: 'Active', earnings: 100, inviteDate: '2024-08-10' },
  { id: 3, email: 'dev3@example.com', status: 'Pending', earnings: 0, inviteDate: '2024-08-18' },
  { id: 4, email: 'dev4@example.com', status: 'Active', earnings: 75, inviteDate: '2024-08-05' }
];

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'POST') {
    // Handle creating a new referral invitation
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }
    // Simulate creating a referral
    const newReferral = {
      id: referrals.length + 1,
      email: email,
      status: 'Pending',
      earnings: 0,
      inviteDate: new Date().toISOString().slice(0, 10)
    };
    referrals.push(newReferral);
    res.status(201).json(newReferral);
  } else if (req.method === 'GET') {
    // Handle fetching all referrals
    res.status(200).json(referrals);
  } else if (req.method === 'PUT') {
    // Handle updating a referral
    const { id } = req.query;
    const { status } = req.body;
    const index = referrals.findIndex(ref => ref.id === Number(id));
    if (index === -1) {
      res.status(404).json({ message: 'Referral not found' });
      return;
    }
    referrals[index].status = status || referrals[index].status;
    res.status(200).json(referrals[index]);
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
