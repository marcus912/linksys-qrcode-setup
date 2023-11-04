// material-ui
import {Button, FormControl, FormHelperText, Grid, Stack, TextField} from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';

// assets
import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from '../../../utils/axios';
import {openSnackbar} from '../../../store/slices/snackbar';
import {useDispatch} from 'store';
import * as Yup from 'yup';
import {Formik} from 'formik';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const AccountProfile = (account) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const doUpdate = async (acc) => {
        const response = await axios.put(`${process.env.REACT_APP_LINKSYS_API_URL}/user-service/rest/accounts/self`,
            { account: acc });
        if (response.status === 200) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Successfully updated.',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
            setTimeout(() => {
                navigate('/amplify/accountInfo', { replace: true });
            }, 1500);
        }
    };
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                username: account?.username,
                firstName: account?.firstName,
                lastName: account?.lastName,
                language: account?.preferences?.locale?.language,
                country: account?.preferences?.locale?.country,
                countryCode: account?.preferences?.mobile?.countryCode,
                phoneNumber: account?.preferences?.mobile?.phoneNumber
            }}
            validationSchema={Yup.object().shape({})}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await doUpdate({...account,
                        // username: values.username,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        preferences: {
                            locale: {
                                language: values.language,
                                country: values.country
                            },
                            mobile: {
                                countryCode: values.countryCode,
                                phoneNumber: values.phoneNumber
                            }
                        }
                    });

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item>
                            <SubCard title="Edit Account Details">
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-basic6"
                                            fullWidth
                                            label="Email address"
                                            defaultValue={account?.username}
                                            inputProps={
                                                { readOnly: true, }
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)}>
                                            <TextField
                                                id="outlined-basic1-firstName"
                                                fullWidth
                                                label="First Name"
                                                name="firstName"
                                                value={values.firstName}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="standard-weight-helper-text-firstName">
                                                    {errors.firstName}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)}>
                                            <TextField
                                                id="outlined-basic1-lastName"
                                                fullWidth
                                                label="Last Name"
                                                name="lastName"
                                                value={values.lastName}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.lastName && errors.lastName && (
                                                <FormHelperText error id="standard-weight-helper-text-lastName">
                                                    {errors.lastName}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.language && errors.language)}>
                                            <TextField
                                                id="outlined-basic1-language"
                                                fullWidth
                                                label="Language"
                                                name="language"
                                                value={values.language}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.language && errors.language && (
                                                <FormHelperText error id="standard-weight-helper-text-language">
                                                    {errors.language}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.country && errors.country)}>
                                            <TextField
                                                id="outlined-basic1-country"
                                                fullWidth
                                                label="Country"
                                                name="country"
                                                value={values.country}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.country && errors.country && (
                                                <FormHelperText error id="standard-weight-helper-text-country">
                                                    {errors.country}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.countryCode && errors.countryCode)}>
                                            <TextField
                                                id="outlined-basic1-countryCode"
                                                fullWidth
                                                label="Country Code"
                                                name="countryCode"
                                                value={values.countryCode}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.countryCode && errors.countryCode && (
                                                <FormHelperText error id="standard-weight-helper-text-countryCode">
                                                    {errors.countryCode}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.phoneNumber && errors.phoneNumber)}>
                                            <TextField
                                                id="outlined-basic1-phoneNumber"
                                                fullWidth
                                                label="PhoneNumber"
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.phoneNumber && errors.phoneNumber && (
                                                <FormHelperText error id="standard-weight-helper-text-phoneNumber">
                                                    {errors.phoneNumber}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Stack direction="row">
                                            <AnimateButton>
                                                <Button variant="contained" disabled={isSubmitting} fullWidth size="large" type="submit">
                                                    Change Details
                                                </Button>
                                            </AnimateButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default AccountProfile;
