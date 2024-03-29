import { useRef } from "react";
import { useDispatch } from "react-redux";
import { resetSearch } from "../../store/reducers/searchSlice";
import SvgIcon from "../../elements/SvgIcon";
import RangeSlider from "react-range-slider-input";
import { CSSTransition } from "react-transition-group";
import Skeleton from "react-loading-skeleton";
import "./styles.scss";

const CatalogSettings = ({
  pagination,
  selectValue,
  onSelect,
  isShowPriceRange,
  onShowPriceRange,
  setRangeValue,
  rangeValue,
  searchValue,
  isLoad,
}) => {
  const nodeRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <div className="catalog-settings hide-to-lg">
      <div className="catalog-settings__label">
        {pagination ? (
          <span className="catalog-settings__label-info">
            {`Showing  ${
              isLoad
                ? `${pagination?.start + 1} - ${pagination?.limit}  of`
                : ""
            } ${pagination?.total} results`}
          </span>
        ) : (
          <Skeleton width={180} height={28} />
        )}
        {searchValue && (
          <span className="catalog-settings__label-info">{` for "${searchValue}"`}</span>
        )}
      </div>
      <ul className="catalog-settings__sorting">
        {searchValue && (
          <li className="catalog-settings__sorting-item">
            <button
              className="catalog-settings__btn-search"
              aria-hidden="true"
              onClick={() => {
                dispatch(resetSearch());
              }}
            >
              <span>Clear search value</span>
            </button>
          </li>
        )}
        <li className="catalog-settings__sorting-item catalog-settings__sorting-item--filter">
          {pagination ? (
            <>
              <button
                className="catalog-settings__btn-filter"
                aria-hidden="true"
                onClick={onShowPriceRange}
              >
                <span>Price range</span>
                <SvgIcon
                  addСlass="catalog-settings__icon-filter"
                  icon="filter"
                />
              </button>
              <CSSTransition
                nodeRef={nodeRef}
                in={isShowPriceRange}
                classNames={{
                  enter: "catalog-settings__price-range--enter",
                  enterActive: "catalog-settings__price-range--active-enter",
                  enterDone: "catalog-settings__price-range--done-enter",
                  exit: "catalog-settings__price-range--exit",
                  exitActive: "catalog-settings__price-range--active-exit",
                }}
                timeout={200}
                unmountOnExit
              >
                <div
                  ref={nodeRef}
                  className="catalog-settings__price-range"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <span className="catalog-settings__price-range__value">
                    {rangeValue[0]}
                  </span>
                  <RangeSlider
                    className="catalog-settings__price-range__inner"
                    min={0}
                    max={500}
                    step={10}
                    value={rangeValue}
                    onInput={setRangeValue}
                  />
                  <span className="catalog-settings__price-range__value">
                    {rangeValue[1]}
                  </span>
                </div>
              </CSSTransition>
            </>
          ) : (
            <Skeleton width={105} height={28} />
          )}
        </li>
        <li className="catalog-settings__sorting-item catalog-settings__sorting-item--select">
          {pagination ? (
            <select
              className="catalog-settings__select select"
              value={selectValue}
              onChange={(e) => onSelect(e)}
            >
              <option value="price" className="select__option">
                Sort by price
              </option>
              <option value="title" className="select__option">
                Sort by name
              </option>
              <option value="updatedAt" className="select__option">
                Novelty
              </option>
            </select>
          ) : (
            <Skeleton width={118} height={28} />
          )}
        </li>
      </ul>
    </div>
  );
};

export default CatalogSettings;
