import observeAsyncAction from "./Observable/observeAsyncAction";
import useTrackObservable from "./Observable/useTrackObservable";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const action = observeAsyncAction(
  async () => {
    const time = Date.now();
    console.log("start", time);
    await sleep(3000);
    return time;
  },
  {
    mode: "JUST_LAST_CALL",
    keyFn: () => "key" + Date.now(),
  },
);

function App() {
  useTrackObservable(action, undefined, {
    name: "track",
    containerName: "App",
  });
  return (
    <div>
      <div>hello world</div>
      <button onClick={action.exec}>Action</button>
    </div>
  );
}

export default App;
