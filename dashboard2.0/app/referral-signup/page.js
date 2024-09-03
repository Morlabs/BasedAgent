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
    const referralToken = searchParams.get('token');
    const router = useRouter();
    const [developer, setDeveloper] = useState(null);
    const [showSnackBar, setShowSnackBar] = useState(false);

    const fetchReferral = async () => {
        setLoading(true);
        try {
            const { referral, developer } = await findReferral(referralToken);
            if (referral) {
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
        if (referralToken) {
            fetchReferral();
        }
    }, [referralToken]);

    const handleReferralSignup = async () => {
        try {
            const response = await signIn('email', { callbackUrl: '/user' });
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
