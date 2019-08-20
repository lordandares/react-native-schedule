export type ColorRatingContainerProps = {
  ratingChanged(ratingValue: number): void,
};

export type ColorRatingComponentViewProps = {
  styles: any,
  ratingChanged(ratingValue: number): void,
  rating: number,
};
