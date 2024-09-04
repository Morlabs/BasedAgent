'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { findReferral } from '@/actions/findReferral';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, Typography, Container, Box } from '@mui/material';
import LoaderLocal from "@/components/common/loaderLocal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReferralSignUpPage() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const searchParams = useSearchParams();
    // const referralToken = searchParams.get('token');
    const referralDeveloperId = searchParams.get('referral');
    const router = useRouter();
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

    const fetchReferral = async () => {
        setLoading(true);
        try {
            const { developer } = await findReferral(referralDeveloperId);
            // if (referral) {
            //     setDeveloper(developer);
            //     setLoading(false);
            // } else {
            //     setLoading(false);
            //     setMessage('Referral not found');
            //     setSeverity('error');
            //     setShowSnackBar(true);
            // }

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
            router.push('/home')
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

    const handleReferralSignup = async () => {
        try {

            // const response = await signIn('email', { callbackUrl: '/user' });
            // pass referral developer id to the signIn function
            // const response = await signIn('email', { referral: referralDeveloperId, callbackUrl: '/user' });
            setReferralCookie(referralDeveloperId);
            // log cookies
            console.log(document.cookie);
            const response = await signIn('github', { callbackUrl: '/user' }, { referralDeveloperId: referralDeveloperId, prompt: 'login' });


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


            <Container
                maxWidth="sm" sx={{ mt: 4 }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <LoaderLocal />
                    </Box>
                ) : (
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
