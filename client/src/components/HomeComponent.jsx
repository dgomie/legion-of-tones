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
