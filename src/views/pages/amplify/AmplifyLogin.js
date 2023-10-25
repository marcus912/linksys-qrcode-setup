import {useTheme} from '@mui/material/styles';
import {Auth} from 'aws-amplify';
import useScriptRef from '../../../hooks/useScriptRef';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import Backdrop from '@mui/material/Backdrop';
import {LOGIN} from "../../../store/actions";
import {dispatch} from "../../../store";
import {setSession} from "../../../contexts/JWTContext";
import {getLinksysAccount} from "../../../store/slices/user";
import {useNavigate} from "react-router-dom";

const AmplifyLogin = (others) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const scriptedRef = useScriptRef();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const setup = async ({email, password}) => {
        await Auth.signIn({username: email, password: password});
        const token = await getSessionCurrentToken();
        if (token != null) {
            setSession(token);
            const account = await dispatch(getLinksysAccount());
            console.log(account);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user: account
                }
            });
            navigate('/amplify/accountInfo', {replace: true});
        }
    };

    const getSessionCurrentToken = async () => {
        return (await Auth.currentSession()).getIdToken().getJwtToken();
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object().shape({})}
            onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                try {
                    await setup({
                        email: values.email,
                        password: values.password
                    });

                    if (scriptedRef.current) {
                        setStatus({success: true});
                        setSubmitting(false);
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
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)}
                                 sx={{...theme.typography.customInput}}>
                        <InputLabel htmlFor="outlined-adornment-email">E-MAIL</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            type="text"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.password && errors.password)}
                                 sx={{...theme.typography.customInput}}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
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
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                            label="password"
                        />
                        {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password">
                                {errors.password}
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
                                Log in
                            </Button>
                        </AnimateButton>
                    </Box>
                    <Backdrop sx={{color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1}} open={isSubmitting}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                </form>
            )}
        </Formik>
    );
};

export default AmplifyLogin;
