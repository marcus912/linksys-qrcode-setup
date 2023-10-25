import {gridSpacing} from "../../../store/constant";
import {Grid} from "@mui/material";
import React from "react";
import LinksysAccountCardDetails from "./LinksysAccountCardDetails";

const LinksysAccountCard = () => {
    return (
        <Grid container direction="row" spacing={gridSpacing}>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
                <LinksysAccountCardDetails {...{ about: 'Use the neural RSS application, then you can program the bluetooth firewall! #DOO',
                    contact: '', email: '', location: '', name: '', role: '' }} />
            </Grid>
        </Grid>
    );
}

export default LinksysAccountCard;