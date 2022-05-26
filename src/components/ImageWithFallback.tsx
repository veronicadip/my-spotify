import { FunctionComponent } from "react";

interface Props {
  src: string | undefined;
  fallback: string;
  alt: string;
  className: string;
  imagesArray: number | undefined;
}

const ImageWithFallback: FunctionComponent<Props> = function (props) {
  if (props.imagesArray) {
    return <img src={props.src} alt={props.alt} className={props.className} />;
  }
  return (
    <img src={props.fallback} alt={props.alt} className={props.className} />
  );
};

export default ImageWithFallback;
