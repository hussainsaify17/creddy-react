import Home from "./Home";
export default function HomeIndex ({cards}) {
  if(cards && cards.length)    
    return <Home cards={cards}/>;
    
  return null;
}

export async function getStaticProps() {
  const res = await fetch("http://3.143.254.33:1337/api/credit-cards?populate=*");
  const cards = await res.json();
  const allCards = cards.data.map(data => data.attributes);
  return {
    props: { cards: allCards},
  };
}