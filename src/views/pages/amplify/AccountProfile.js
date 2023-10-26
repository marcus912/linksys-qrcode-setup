// material-ui
// project imports

// assets
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLinksysAccount} from '../../../store/slices/user';
import AccountProfileEdit from "./AccountProfileEdit";

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const AccountProfile = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.linksysAccount);
    useEffect(() => {
        if (dispatch && account == null) {
            dispatch(getLinksysAccount());
        }
    }, [dispatch, account]);
    return (
        <>
            {account && <AccountProfileEdit {...account}/>}
        </>
    );
};

export default AccountProfile;
