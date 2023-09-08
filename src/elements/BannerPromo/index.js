import { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "./styles.scss";
import bcg from "./banner-promo-bcg.jpg";

const BannerPromo = ({ isLoading }) => {
  const { id: currentSlug } = useParams();
  const [title, setTitle] = useState("Catalog");

  const categoriesList = useSelector(
    (state) =>
      state?.categories?.queries['getCategories("*")']?.data?.categoriesList
  );

  const getTitle = () => {
    if (!categoriesList) return;

    const findTitle = categoriesList.find(
      (item) => currentSlug === item.attributes.slug
    )?.attributes?.Title;

    return findTitle;
  };

  useEffect(() => {
    currentSlug ? setTitle(getTitle()) : setTitle("Catalog");
  }, [currentSlug, categoriesList]);

  if (!categoriesList) {
    return <Skeleton classNameName="banner-promo" />;
  }

  return (
    <div className="banner-promo gap-lg gap-btm-md-from-lg">
      <div className="banner-promo__center center">
        <div className="banner-promo__paper">
          <div className="banner-promo__paper-inner">
            <h3 className="banner-promo__title">Promotional Banner</h3>
            <p className="banner-promo__text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </div>
        </div>
        <figure className="banner-promo__img-box">
          <img
            className="banner-promo__img"
            src={bcg}
            alt="img-banner-index-2"
          ></img>
        </figure>
      </div>
    </div>
  );
};

export default BannerPromo;