import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import Auth from '../utils/auth';
import DescriptionComponent from './DescriptionComponent';
import hero from '../images/lot-hero.png';

const HomeComponent = () => {


  return (
    <div style={{ paddingBottom: '50px' }}>
      <img src={hero} width="100%" alt="" />
 

     <DescriptionComponent />
    </div>
  );
};
export default HomeComponent;
