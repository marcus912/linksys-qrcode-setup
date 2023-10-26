// material-ui
import {Button, Grid, Snackbar, Stack, TextField} from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';

// assets
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "../../../utils/axios";

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const AccountProfile = (account) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = async () => {
        const response =
            await axios.put(`${process.env.REACT_APP_LINKSYS_API_URL}/user-service/rest/accounts/self`,
                {account: account});
        if (response.status === 200) {
            setOpen(true);
            setTimeout(() => {
                navigate('/amplify/accountInfo', {replace: true});
            }, 1000)
        }

    }
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item>
                <SubCard title="Edit Account Details">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic6" fullWidth label="Email address"
                                       defaultValue={account?.username}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic1" fullWidth label="First Name"
                                       defaultValue={account?.firstName} helperText="Helper text"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic1" fullWidth label="Last Name" defaultValue={account?.lastName}
                                       helperText="Helper text"/>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic5" fullWidth label="Language"
                                       defaultValue={account?.preferences?.locale?.language}/>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic5" fullWidth label="Country"
                                       defaultValue={account?.preferences?.locale?.country}/>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic7" fullWidth label="Mobile Coutnry Code"
                                       defaultValue={account?.preferences?.mobile?.countryCode}/>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic7" fullWidth label="Mobile Phone number"
                                       defaultValue={account?.preferences?.mobile?.phoneNumber}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row">
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleSubmit}>Change Details</Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={open}
                onClose={handleClose}
                message="Successfully Updated"
                key={'bottom' + 'center'}
            />
        </Grid>
    );
};

export default AccountProfile;
