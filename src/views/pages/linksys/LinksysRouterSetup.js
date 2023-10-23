import {Divider, Grid, Stack, Typography, useMediaQuery} from '@mui/material';
import AuthCardWrapper from '../authentication/AuthCardWrapper';
import {Link, useSearchParams} from 'react-router-dom';
import AuthFooter from '../../../ui-component/cards/AuthFooter';
import AuthWrapper1 from '../authentication/AuthWrapper1';
import {useTheme} from '@mui/material/styles';
import useAuth from '../../../hooks/useAuth';
import SetupInfo from './SetupInfo';
import {useEffect, useState} from 'react';

const LinksysRouterSetup = () => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [searchParams] = useSearchParams();
    const [sn, setSN] = useState('');
    const [routerId, setRouterId] = useState('');
    const [model, setModel] = useState('');

    useEffect(() => {
        if (searchParams !== null) {
            const sn = searchParams.get('sn');
            const routerId = searchParams.get('routerId');
            const model = searchParams.get('model');
            console.log(sn, routerId, model);
            setSN(sn);
            setRouterId(routerId);
            setModel(model);
            window.history.replaceState(null, '', '/setup');
        }
    }, [searchParams]);

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Linksys
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Set up your Linksys router
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SetupInfo sn={sn} id={routerId} model={model}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={Link}
                                                to={isLoggedIn ? '/pages/register/register3' : '/register'}
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                Don&apos;t have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default LinksysRouterSetup;
