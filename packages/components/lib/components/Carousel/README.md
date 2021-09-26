# `Carousel`

An infinite carousel where a set number of slides are visible at a time. 

## Props

### `children`
> `React.ReactNode` (optional)

The content of the carousel. Each child is required to be a `Carousel.Slide`
component.

### `groups`
> `number`

The number of slides per group. The grouping is forced and will not be
responsive so it is the responsibility of the caller to define how many slides
should be visible for a given window size.

Additionally, the number of slides per group should, ideally, evenly divide the
total number of slides as the `Carousel` does not allow for partially filled
groups. Any remainder slides will be dropped from the carousel. As such, the
caller should aim to provide a [highly
composite](https://en.wikipedia.org/wiki/Highly_composite_number) number of
slides to maximize the chance of the slides being evenly distributed.
