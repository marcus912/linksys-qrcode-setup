// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://www.linksyssmartwifi.com/" target="_blank" underline="hover">
            linksyssmartwifi.com
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://www.linksys.com/" target="_blank" underline="hover">
            &copy; linksys.com
        </Typography>
    </Stack>
);

export default AuthFooter;
