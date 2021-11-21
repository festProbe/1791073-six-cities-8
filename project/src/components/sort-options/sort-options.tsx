import { MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { getOffersBySortType } from '../../store/action';


function SortOptions(): JSX.Element {
  const dispatch = useDispatch();

  const handleSortTypeClick: MouseEventHandler = (evt) => {
    const placesOptions = document.querySelector('.places__options');
    const sortingType = document.querySelector('.places__sorting-type');

    document.querySelectorAll('.places__option').forEach((option) => option.classList.remove('places__option--active'));

    evt.currentTarget.classList.add('places__option--active');
    if (sortingType !== null) {
      sortingType.textContent = evt.currentTarget.textContent;
    }
    placesOptions?.classList.remove('places__options--opened');
    if (evt.currentTarget.textContent !== null) {
      dispatch(getOffersBySortType(evt.currentTarget.textContent));
    }
  };

  const handleSortByButtonClick: MouseEventHandler = (evt): void => {
    evt.preventDefault();
    const placesOptions = document.querySelector('.places__options');
    if (placesOptions?.classList.contains('places__options--opened')) {
      placesOptions?.classList.remove('places__options--opened');
    } else {
      placesOptions?.classList.add('places__options--opened');
    }
  };

  return (
    <form className="places__sorting" action="/" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortByButtonClick}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="/icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom">
        <li className="places__option places__option--active" onClick={handleSortTypeClick} tabIndex={0}>Popular</li>
        <li className="places__option" onClick={handleSortTypeClick} tabIndex={0}>Price: low to high</li>
        <li className="places__option" onClick={handleSortTypeClick} tabIndex={0}>Price: high to low</li>
        <li className="places__option" onClick={handleSortTypeClick} tabIndex={0}>Top rated first</li>
      </ul>
    </form>
  );
}

export default SortOptions;
