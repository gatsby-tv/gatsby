import { Story, Meta } from '@storybook/react/types-6-0';

import { Image } from '@lib/components/Image';
import { Carousel, CarouselProps } from '@lib/components/Carousel';

export default {
  title: 'Carousel',
  component: Carousel,
} as Meta;

export const Example: Story<CarouselProps> = () => (
  <Carousel groups={6}>
    {[...Array(24)].map((_, index) => (
      <Carousel.Slide key={index}>
        <Image src="" aspectRatio="1 / 2" />
      </Carousel.Slide>
    ))}
  </Carousel>
);
