import PropTypes from 'prop-types';

// material-ui
import {useTheme} from '@mui/material/styles';
import {Button, Card, Grid, Typography} from '@mui/material';

// project imports
import {gridSpacing} from 'store/constant';
import {useNavigate} from "react-router-dom";

// assets

// ==============================|| USER DETAILS CARD ||============================== //

const LinksysAccountCardDetails = (user) => {
    const { firstName, lastName, status, preferences, username, alias } = user;
    const {locale, mobile} = preferences;
    const theme = useTheme();
    const navigate = useNavigate();

    // const [anchorEl, setAnchorEl] = useState(null);
    // const handleClick = (event) => {
    //     setAnchorEl(event?.currentTarget);
    // };
    //
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <Card
            sx={{
                p: 2,
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}`,
                '&:hover': {
                    borderColor: theme.palette.primary.main
                }
            }}
        >
            <Grid container spacing={gridSpacing}>
                {/*<Grid item xs={12}>*/}
                {/*    <Grid container spacing={gridSpacing}>*/}
                {/*        <Grid item>*/}
                {/*            <IconButton size="small" sx={{ mt: -0.75, mr: -0.75 }} onClick={handleClick} aria-label="more options">*/}
                {/*                <MoreHorizOutlinedIcon*/}
                {/*                    fontSize="small"*/}
                {/*                    color="inherit"*/}
                {/*                    aria-controls="menu-friend-card"*/}
                {/*                    aria-haspopup="true"*/}
                {/*                    sx={{ opacity: 0.6 }}*/}
                {/*                />*/}
                {/*            </IconButton>*/}
                {/*            {anchorEl && (*/}
                {/*                <Menu*/}
                {/*                    id="menu-user-details-card"*/}
                {/*                    anchorEl={anchorEl}*/}
                {/*                    keepMounted*/}
                {/*                    open={Boolean(anchorEl)}*/}
                {/*                    onClose={handleClose}*/}
                {/*                    variant="selectedMenu"*/}
                {/*                    anchorOrigin={{*/}
                {/*                        vertical: 'bottom',*/}
                {/*                        horizontal: 'right'*/}
                {/*                    }}*/}
                {/*                    transformOrigin={{*/}
                {/*                        vertical: 'top',*/}
                {/*                        horizontal: 'right'*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    <MenuItem onClick={handleClose}>Edit</MenuItem>*/}
                {/*                    <MenuItem onClick={handleClose}>Delete</MenuItem>*/}
                {/*                </Menu>*/}
                {/*            )}*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                <Grid item xs={12}>
                    <Typography variant="h3" component="div">
                        {firstName} {lastName}
                    </Typography>
                    <Typography variant="caption">{alias}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Status</Typography>
                    <Typography variant="h6">{status}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Email</Typography>
                    <Typography variant="h6">{username}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Phone</Typography>
                            <Typography variant="h6">{mobile?.countryCode} {mobile?.phoneNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Locale</Typography>
                            <Typography variant="h6">{locale?.language}/{locale?.country}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button variant="outlined" onClick={() => {
                                navigate('/amplify/accountInfo/edit', {replace: true});
                            }}>
                                Edit Profile
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

LinksysAccountCardDetails.propTypes = {
    about: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string
};

export default LinksysAccountCardDetails;
