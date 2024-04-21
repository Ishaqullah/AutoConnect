import { Link } from 'react-router-dom';
import Box from '@mui/material/Box'
import { styled ,Typography} from '@mui/material';
const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'flex',
  textDecoration: "none"
  
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
  <Box sx={{display:"flex",justifyConetent:"space-between",mt:5}} >
       <img
          src={"/logo/logo.png"}
          width={25}
          height={25}
          alt="Steering Wheel"
        />
        <Typography variant="h3" sx={{ color: "common.black" }}>
          <b>Auto</b>
        </Typography>
        <Typography variant="h3" sx={{ color: "primary.main" }}>
          <b>Connect</b>
        </Typography>
        </Box>
    </LinkStyled>
  )
};

export default Logo;
