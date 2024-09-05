'use client';

import { signIn } from 'next-auth/react';
import { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { findReferral } from '@/actions/findReferral';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, Typography, Container, Box } from '@mui/material';
import LoaderLocal from "@/components/common/loaderLocal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Extracted component for handling referral logic with useSearchParams
function ReferralSearchParams({ setDeveloper, setLoading, setMessage, setSeverity, setShowSnackBar }) {
    const searchParams = useSearchParams();
    const referralDeveloperId = searchParams.get('referral');
    const router = useRouter();

    const fetchReferral = async () => {
        setLoading(true);
        try {
            const { developer } = await findReferral(referralDeveloperId);
            if (developer) {
                setDeveloper(developer);
                setLoading(false);
            } else {
                setLoading(false);
                setMessage('Referral not found');
                setSeverity('error');
                setShowSnackBar(true);
            }
        } catch (error) {
            setLoading(false);
            router.push('/');
            setMessage('Error fetching referral');
            setSeverity('error');
            setShowSnackBar(true);
        }
    };

    useEffect(() => {
        if (referralDeveloperId) {
            fetchReferral();
        }
    }, [referralDeveloperId]);

    return null; // This component only handles logic, no UI
}

export default function ReferralSignUpPage() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [developer, setDeveloper] = useState(null);
    const [showSnackBar, setShowSnackBar] = useState(false);

    function setReferralCookie(referralId) {
        const cookieName = 'referralDeveloperId';
        const cookieValue = referralId;
        const daysToExpire = 1;

        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();

        document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/ ;`;
    }

    const handleReferralSignup = async () => {
        try {
            setReferralCookie(developer?.id);
            const response = await signIn('github', { callbackUrl: '/user' }, { referralDeveloperId: developer?.referralDeveloperId, prompt: 'login' });
        } catch (error) {
            console.error('Error in handleReferralSignup:', error.message);
            setMessage('Error signing in');
            setSeverity('error');
            setShowSnackBar(true);
        }
    };

    return (
        <div>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4, minHeight: '50vh' }}>
                <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center"><LoaderLocal /></Box>}>
                    {/* Pass necessary state setters to ReferralSearchParams */}
                    <ReferralSearchParams
                        setDeveloper={setDeveloper}
                        setLoading={setLoading}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setShowSnackBar={setShowSnackBar}
                    />
                </Suspense>

                {!loading && (
                    <Box textAlign="center">
                        <Typography variant="h4" gutterBottom>
                            Referral Signup
                        </Typography>

                        {developer && (
                            <Typography variant="body1" gutterBottom>
                                Sign up using the referral link from <strong>{developer.name}</strong> ({developer.email})
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleReferralSignup}
                            sx={{ mt: 2 }}
                        >
                            Sign Up with Referral
                        </Button>

                        <Snackbar
                            open={showSnackBar}
                            autoHideDuration={6000}
                            onClose={() => setShowSnackBar(false)}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <Alert severity={severity} onClose={() => setShowSnackBar(false)}>
                                {message}
                            </Alert>
                        </Snackbar>
                    </Box>
                )}
            </Container>
            <Footer />
        </div>
    );
}
