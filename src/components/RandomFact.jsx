import { useDispatch, useSelector } from "react-redux";
import { STATUS, actions } from "../features/randomFact";

const RandomFact = () => {
  
  const factObject = useSelector(state => state.randomFact)

  const dispatch = useDispatch();

  let content = null;
  if(factObject.status == STATUS.NORMAL) {
    content = "Redo att hämta fakta?";
  } else if ( factObject.status == STATUS.FETCHING){
    content = "Väntar på fakta...";
  } else if ( factObject.status == STATUS.SUCCESS) {
    content = factObject.fact
  } else if ( factObject.status == STATUS.FAILURE) {
    content = "kunde inte hämta fakta!";
  }

  return (
    <div>
      <button onClick={() => fetchFact(dispatch)}>Get Fact!</button>
      <p>{content}</p>
    </div>
  );
};

async function fetchFact(dispatch) {
  dispatch(actions.isFetching());

  const URL = "https://uselessfacts.jsph.pl/random.json?language=en";

  try {
    let response = await fetch(URL);
    let json = await response.json();
    let fact = json.text;
    // simulera att det tar tid att hämta från API
    setTimeout(() => {
        dispatch(actions.success(fact));
    }, 2000);
    dispatch(actions.success(fact));
  } catch {
    dispatch(actions.failure());
  }
  
}

export default RandomFact;
