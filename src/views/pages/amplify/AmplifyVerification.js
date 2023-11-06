import {useTheme} from '@mui/material/styles';
import {Auth} from 'aws-amplify';
import useScriptRef from '../../../hooks/useScriptRef';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, OutlinedInput} from '@mui/material';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import Backdrop from '@mui/material/Backdrop';
import {useNavigate, useParams} from 'react-router-dom';
import AmplifyPage from './AmplifyPage';
import {openSnackbar} from '../../../store/slices/snackbar';
import {useDispatch} from 'store';

const AmplifyVerification = (others) => {
    const theme = useTheme();
    // const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const {username} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const verify = async ({username, code}) => {
        const resp = await Auth.confirmSignUp(username, code);
        console.log('Verify result:', resp);
    };

    return (
        <AmplifyPage title={'Enter your Verification Code'}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    email: username,
                    code: ''
                }}
                validationSchema={Yup.object().shape({})}
                onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                    try {
                        await verify({
                            username: username,
                            code: values.code
                        });

                        if (scriptedRef.current) {
                            setStatus({success: true});
                            setSubmitting(false);
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Your code has been successfully verified.',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    },
                                    close: false
                                })
                            );
                            setTimeout(() => {
                                navigate(`/amplify/login`, {replace: true});
                            }, 1500);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({success: false});
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        {/*<FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>*/}
                        {/*    <InputLabel htmlFor="outlined-adornment-email">Email Address / Username</InputLabel>*/}
                        {/*    <OutlinedInput*/}
                        {/*        id="outlined-adornment-email"*/}
                        {/*        type="text"*/}
                        {/*        value={values.email}*/}
                        {/*        name="email"*/}
                        {/*        onBlur={handleBlur}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        inputProps={{}}*/}
                        {/*        readOnly={true}*/}
                        {/*    />*/}
                        {/*    {touched.email && errors.email && (*/}
                        {/*        <FormHelperText error id="standard-weight-helper-text-email">*/}
                        {/*            {errors.email}*/}
                        {/*        </FormHelperText>*/}
                        {/*    )}*/}
                        {/*</FormControl>*/}
                        <Box sx={{m: 1}}>
                            <p>
                                <strong>
                                    {values.email}
                                </strong>
                            </p>
                        </Box>

                        <FormControl fullWidth error={Boolean(touched.code && errors.code)}
                                     sx={{...theme.typography.customInput}}>
                            <InputLabel htmlFor="outlined-adornment-code">Code</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-code"
                                type="text"
                                value={values.code}
                                name="code"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.code && errors.code && (
                                <FormHelperText error id="standard-weight-helper-text-code">
                                    {errors.code}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{mt: 3}}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{mt: 2}}>
                            <AnimateButton>
                                <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit"
                                        variant="contained">
                                    Verify
                                </Button>
                            </AnimateButton>
                        </Box>
                        <Backdrop sx={{color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1}}
                                  open={isSubmitting}>
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                    </form>
                )}
            </Formik>
        </AmplifyPage>
    );
};

export default AmplifyVerification;
