import { gridSpacing } from '../../../store/constant';
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import LinksysAccountCardDetails from './LinksysAccountCardDetails';
import { useSelector } from 'react-redux';
import { getLinksysAccount } from '../../../store/slices/user';
import { dispatch } from '../../../store';

const LinksysAccountCard = () => {
    const account = useSelector((state) => state.user.linksysAccount);
    useEffect(() => {
        if (dispatch && account == null) {
            dispatch(getLinksysAccount());
        }
    }, [dispatch]);
    return (
        <Grid container direction="row" spacing={gridSpacing}>
            <Grid item>
                {account && <LinksysAccountCardDetails {...account} />}
            </Grid>
        </Grid>
    );
};

export default LinksysAccountCard;
