import requests from "../api/requsts";
import Banner from "../components/Banner";
import Row from "../components/Row";

export default function MainPage() {
  return (
    <div>
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
    </div>
  );
}
