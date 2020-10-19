import React from 'react'
import { Carousel } from 'antd'

function ImgSlider({ images }) {
    return (
        <Carousel autoplay>
            {images &&
                images.map((img, idx) => (
                    <div key={idx}>
                        <img
                            src={img.src}
                            style={{
                                width: 100 + '%',
                            }}
                        />
                    </div>
                ))}
        </Carousel>
    )
}

export default ImgSlider
