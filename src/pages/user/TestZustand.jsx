import { useEffect } from "react";
import { useCounterStore } from "./Store";

const logCount = () => {
  //   const count = useCounterStore.getState().count;
  //   console.log(count);
  useCounterStore.setState({ count: 1 });
};

export const TestZustand = () => {
  const count = useCounterStore((state) => state.count);
  useEffect(() => {
    logCount();
  }, []);
  return <OtherComponent count={count} />;
};

export const OtherComponent = ({ count }) => {
  const incrementAsync = useCounterStore((state) => state.incrementAsync);
  const decrement = useCounterStore((state) => state.decrement);
  return (
    <div>
      <button onClick={incrementAsync}>Increment</button>
      <button onClick={decrement}>Decrement</button>: {count}
    </div>
  );
};

// export default TestZustand;
