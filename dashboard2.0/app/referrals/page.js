// app/referrals/page.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Twitter, Facebook, Linkedin, Copy, RefreshCw, Info } from 'lucide-react';

export default function ReferralsPage() {
    const [email, setEmail] = useState('');
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReferrals();
    }, []);

    const fetchReferrals = () => {
        setLoading(true);
        axios.get('/api/referrals')
            .then(response => {
                setReferrals(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching referrals:', error);
                setError('Failed to fetch referrals. Please try again later.');
                setLoading(false);
            });
    };

    const handleSendInvite = () => {
        setLoading(true);
        axios.post('/api/referrals/invite', { email })
            .then(response => {
                setReferrals(prevReferrals => [...prevReferrals, response.data]);
                setEmail('');
                setLoading(false);
            })
            .catch(error => {
                console.error('Error sending invite:', error);
                setError('Failed to send invite. Please try again.');
                setLoading(false);
            });
    };

    const handleResendInvite = (id) => {
        setLoading(true);
        axios.put(`/api/referrals/${id}`, { status: 'Pending' })
            .then(response => {
                const updatedReferrals = referrals.map(referral => 
                    referral.id === response.data.id ? response.data : referral
                );
                setReferrals(updatedReferrals);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error resending invite:', error);
                setError('Failed to resend invite. Please try again.');
                setLoading(false);
            });
    };

    const handleTwitterShare = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            "I'm now on #BasedAgent - come join me and help build the world's most based AI coding Agent - https://profile.basedagent.co/register?utm_source=invitation&utm_medium=twitter&utm_campaign=referral-id-123"
        )}`;
        window.open(url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    };

    const handleCopyLink = () => {
        const link = "https://profile.basedagent.co/register?utm_source=invitation&utm_medium=link&utm_campaign=referral-id-123";
        navigator.clipboard.writeText(link).then(() => {
            alert("Referral link copied to clipboard!");
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="bg-gray-900 text-white p-6 font-sans">
            <h1 className="text-3xl font-bold mb-6">DEVELOPER REFERRAL PROGRAM</h1>
            
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-2xl mb-4">Grow the BasedAgent community and earn rewards:</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    <input
                        type="email"
                        placeholder="Enter developer's email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow bg-gray-700 text-white rounded px-4 py-2"
                    />
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                        onClick={handleSendInvite}
                        disabled={loading}
                    >
                        <Mail className="mr-2" size={18} />
                        Invite
                    </button>
                    <button 
                        className="bg-transparent border border-blue-400 hover:bg-blue-400 hover:bg-opacity-20 text-blue-400 p-2 rounded"
                        onClick={handleTwitterShare}
                    >
                        <Twitter size={18} />
                    </button>
                    <button className="bg-transparent border border-blue-600 hover:bg-blue-600 hover:bg-opacity-20 text-blue-600 p-2 rounded">
                        <Facebook size={18} />
                    </button>
                    <button className="bg-transparent border border-blue-500 hover:bg-blue-500 hover:bg-opacity-20 text-blue-500 p-2 rounded">
                        <Linkedin size={18} />
                    </button>
                    <button 
                        className="bg-transparent border border-gray-400 hover:bg-gray-400 hover:bg-opacity-20 text-gray-400 px-4 py-2 rounded flex items-center"
                        onClick={handleCopyLink}
                    >
                        <Copy className="mr-2" size={18} />
                        Copy referral link
                    </button>
                </div>
                <p className="text-sm text-gray-400">Earn a 10% recurring commission in BAAG for each developer you successfully refer (terms and conditions apply).</p>
            </div>
            
            {/* Add referrals table here */}
            
        </div>
    );
}