import MainPage from '../main/main';

type MainPageProps = {
  placesCount: number,
}

function App({ placesCount }: MainPageProps): JSX.Element {
  return <MainPage placesCount={placesCount}></MainPage>;
}

export default App;
