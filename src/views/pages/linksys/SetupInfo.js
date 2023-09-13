import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from '@mui/material';

// third party
import * as Yup from 'yup';
import {Formik} from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// assets

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ ...others }) => {
    const theme = useTheme();

    const { login } = useAuth();
    const scriptedRef = useScriptRef();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showAdminPassword, setShowAdminPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowAdminPassword = () => {
        setShowAdminPassword(!showAdminPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Formik
            initialValues={{
                email: 'info@codedthemes.com',
                password: '123456',
                phoneNumber: '',
                networkName: '',
                networkSecurity: 'WPA2',
                networkPassword: '',
                adminPassword: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await login(values.email, values.password);

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
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.phoneNumber && errors.phoneNumber)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-phoneNumber">Phone Number</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-phone-number"
                            type="text"
                            value={values.phoneNumber}
                            name="phoneNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                            <FormHelperText error id="standard-weight-helper-text-phoneNumber">
                                {errors.phoneNumber}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.networkName && errors.networkName)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-networkName">Network Name</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-networkName"
                            type="text"
                            value={values.networkName}
                            name="networkName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.networkName && errors.networkName && (
                            <FormHelperText error id="standard-weight-helper-text-networkName">
                                {errors.networkName}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.networkSecurity && errors.networkSecurity)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-networkSecurity">Network Security</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-networkSecurity"
                            type="text"
                            value={values.networkSecurity}
                            name="networkSecurity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.networkSecurity && errors.networkSecurity && (
                            <FormHelperText error id="standard-weight-helper-text-networkSecurity">
                                {errors.networkSecurity}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.networkPassword && errors.networkPassword)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-networkPassword">Network Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-networkPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={values.networkPassword}
                            name="networkPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                            label="networkPassword"
                        />
                        {touched.networkPassword && errors.networkPassword && (
                            <FormHelperText error id="standard-weight-helper-text-adminPassword">
                                {errors.networkPassword}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.adminPassword && errors.adminPassword)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-adminPassword">Admin Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-adminPassword"
                            type={showAdminPassword ? 'text' : 'password'}
                            value={values.adminPassword}
                            name="adminPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowAdminPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showAdminPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                            label="adminPassword"
                        />
                        {touched.adminPassword && errors.adminPassword && (
                            <FormHelperText error id="standard-weight-helper-text-adminPassword">
                                {errors.adminPassword}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                Setup
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

JWTLogin.propTypes = {
    loginProp: PropTypes.number
};

export default JWTLogin;
