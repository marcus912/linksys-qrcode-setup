import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useScriptRef from 'hooks/useScriptRef';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';

// assets

// ===============================|| JWT LOGIN ||=============================== //

const SetupInfo = ({ ...others }) => {
    const apiEndpoint = 'http://10.23.1.58:8180';
    const navigate = useNavigate();
    const { sn, id, model } = others;
    console.log('SetupInfo', sn, id, model);
    const theme = useTheme();

    const scriptedRef = useScriptRef();

    const [showPassword, setShowPassword] = React.useState(true);
    // const [showAdminPassword, setShowAdminPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // const handleClickShowAdminPassword = () => {
    //     setShowAdminPassword(!showAdminPassword);
    // };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const setup = async (data) => {
        const response = await axios.post(`${apiEndpoint}/v1/qrcode/setup`, data);
        const { result, message } = response.data;
        console.log(result, message);
        setTimeout(() => {
            navigate('/setup/success', { replace: true });
        }, 200);
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                serialNumber: sn,
                modelNo: model,
                phoneNumber: '',
                wifiSsid: 'Linksys-Guest',
                wifiSecurity: 'WPA2-Personal',
                wifiPassword: 'LinksysGuest131!',
                adminPassword: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({})}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await setup({
                        externalRouterId: id,
                        serialNumber: sn,
                        phoneNumber: values.phoneNumber,
                        wifiSsid: values.wifiSsid,
                        wifiSecurity: values.wifiSecurity,
                        wifiPassword: values.wifiPassword,
                        adminPassword: values.adminPassword
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
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-serialNumber">Serial Number</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-serialNumber"
                            type="text"
                            value={values.serialNumber}
                            name="serialNumber"
                            inputProps={{}}
                            readOnly={true}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-modelNo">Model Number</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-modelNo"
                            type="text"
                            value={values.modelNo}
                            name="modelNo"
                            inputProps={{}}
                            readOnly={true}
                        />
                    </FormControl>

                    {/*<FormControl*/}
                    {/*    fullWidth*/}
                    {/*    error={Boolean(touched.wifiSecurity && errors.wifiSecurity)}*/}
                    {/*    // sx={{ ...theme.typography.customInput }}*/}
                    {/*>*/}
                    {/*    <Select*/}
                    {/*        id="outlined-adornment-wifiSecurity"*/}
                    {/*        name={'wifiSecurity'}*/}
                    {/*        value={values.wifiSecurity}*/}
                    {/*        onBlur={handleBlur}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        inputProps={{}}*/}
                    {/*    >*/}
                    {/*        <MenuItem value={'WPA2-Personal'}>WPA2-Personal</MenuItem>*/}
                    {/*        <MenuItem value={'WPA3-Personal'}>WPA3-Personal</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*    {touched.wifiSecurity && errors.wifiSecurity && (*/}
                    {/*        <FormHelperText error id="standard-weight-helper-text-wifiSecurity">*/}
                    {/*            {errors.wifiSecurity}*/}
                    {/*        </FormHelperText>*/}
                    {/*    )}*/}
                    {/*</FormControl>*/}

                    <FormControl fullWidth error={Boolean(touched.wifiSsid && errors.wifiSsid)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-wifiSsid">WiFi SSID</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-wifiSsid"
                            type="text"
                            value={values.wifiSsid}
                            name="wifiSsid"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.wifiSsid && errors.wifiSsid && (
                            <FormHelperText error id="standard-weight-helper-text-wifiSsid">
                                {errors.wifiSsid}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        fullWidth
                        error={Boolean(touched.wifiPassword && errors.wifiPassword)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-wifiPassword">WiFi Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-wifiPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={values.wifiPassword}
                            name="wifiPassword"
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
                            label="wifiPassword"
                        />
                        {touched.wifiPassword && errors.wifiPassword && (
                            <FormHelperText error id="standard-weight-helper-text-adminPassword">
                                {errors.wifiPassword}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        fullWidth
                        error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                        sx={{ ...theme.typography.customInput }}
                    >
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

                    {/*<FormControl*/}
                    {/*    fullWidth*/}
                    {/*    error={Boolean(touched.adminPassword && errors.adminPassword)}*/}
                    {/*    sx={{...theme.typography.customInput}}*/}
                    {/*>*/}
                    {/*    <InputLabel htmlFor="outlined-adornment-adminPassword">Admin Password</InputLabel>*/}
                    {/*    <OutlinedInput*/}
                    {/*        id="outlined-adornment-adminPassword"*/}
                    {/*        type={showAdminPassword ? 'text' : 'password'}*/}
                    {/*        value={values.adminPassword}*/}
                    {/*        name="adminPassword"*/}
                    {/*        onBlur={handleBlur}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        endAdornment={*/}
                    {/*            <InputAdornment position="end">*/}
                    {/*                <IconButton*/}
                    {/*                    aria-label="toggle password visibility"*/}
                    {/*                    onClick={handleClickShowAdminPassword}*/}
                    {/*                    onMouseDown={handleMouseDownPassword}*/}
                    {/*                    edge="end"*/}
                    {/*                    size="large"*/}
                    {/*                >*/}
                    {/*                    {showAdminPassword ? <Visibility/> : <VisibilityOff/>}*/}
                    {/*                </IconButton>*/}
                    {/*            </InputAdornment>*/}
                    {/*        }*/}
                    {/*        inputProps={{}}*/}
                    {/*        label="adminPassword"*/}
                    {/*    />*/}
                    {/*    {touched.adminPassword && errors.adminPassword && (*/}
                    {/*        <FormHelperText error id="standard-weight-helper-text-adminPassword">*/}
                    {/*            {errors.adminPassword}*/}
                    {/*        </FormHelperText>*/}
                    {/*    )}*/}
                    {/*</FormControl>*/}

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
                    <Backdrop sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isSubmitting}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </form>
            )}
        </Formik>
    );
};

SetupInfo.propTypes = {
    loginProp: PropTypes.number
};

export default SetupInfo;
