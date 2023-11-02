import AuthWrapper1 from '../authentication/AuthWrapper1';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import AuthCardWrapper from '../authentication/AuthCardWrapper';
import { Link } from 'react-router-dom';
import AuthFooter from '../../../ui-component/cards/AuthFooter';
import { useTheme } from '@mui/material/styles';
import useAuth from '../../../hooks/useAuth';
import PropTypes from 'prop-types';

const AmplifyPage = ({ children, type, title }) => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
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
                                                        {title ? title : 'Enter your credentials to continue'}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {children}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            {type === 'LOGIN' ? (
                                                <Typography
                                                    component={Link}
                                                    to={isLoggedIn ? '/amplify/register' : '/amplify/register'}
                                                    variant="subtitle1"
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    Don&apos;t have an account?
                                                </Typography>
                                            ) : type === 'REGISTER' ? (
                                                <Typography
                                                    component={Link}
                                                    to={isLoggedIn ? '/amplify/login' : '/amplify/login'}
                                                    variant="subtitle1"
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    Already have an account??
                                                </Typography>
                                            ) : null}
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

AmplifyPage.propTypes = {
    children: PropTypes.element,
    type: PropTypes.string,
    title: PropTypes.string
};

export default AmplifyPage;
