import classes from './carousel.module.css'
import {Carousel} from 'react-responsive-carousel'
import {img} from './img/data'
import "react-responsive-carousel/lib/styles/carousel.min.css";



function CarouselEffect() {
  return (
    <div className={classes.hero__img}>
      <Carousel autoPlay={true}
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={false} 
      showStatus={false}
      emulateTouch={false} 
      swipeable={false}
      interval={3000}
      
      >
        {
          img.map ((imageItemLink)=>{
            return <img key={imageItemLink}src={imageItemLink}/>
          })}
      </Carousel>
      <div className={classes.hero__img}></div>  
    </div>
  );
}

export default CarouselEffect
