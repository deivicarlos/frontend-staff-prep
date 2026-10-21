> This is my personal cheat sheet written in my own words

# REACT NOTES

## Important Hooks

### [useTransition](https://react.dev/reference/react/useTransition)

`const [isPending, startTransition] = useTransition()`

**isPending:** tells you if there is a pending transition.

**startTransition:** this function marks state updates inside it as a transition. This means that higher importance update can interrupt and restart its render. The function itself runs immediately.

> The function passed to `startTransition` is called an "Action". By convention, any callback called inside `startTransition` should be named `action` or include "Action" in the suffix

```
startTransition(async () => {
    await submitAction();
});
```

If several transitions are pending, React currently batches them together. A slow `transition` delays a fast one.

Any state update not marked as a transition interrupts a transition render, e.g. `setCount()` or `setQuery()` outside a `startTransition`. User interactions (typing, clicks, dragging) are just where those updates usually come from.

State updates after an `await` are **not** transitions. Wrap them in `startTransition` again:

```
startTransition(async () => {
  await submitAction();
  startTransition(() => {
    setValue(x);
  });
});
```

Transition updates can't control a text input.

### [useOptimistic](https://react.dev/reference/react/useOptimistic)

`const [optimisticState, setOptimistic] = useOptimistic(value, reducer?);`

**value:** the value returned when there are no pending actions

**reducer(currentState, action):** the optimistic function that specifies how the optimistic state gets updated. It must be pure.

This hook lets you update a local state variable optimistically. The `set` function has to be called inside an `Action` context, e.g. inside a `startTransition` or an Action prop (`<form action={fn}>`, `formAction`, or a prop named `*Action`). Not in `onSubmit`: that's a plain event handler, so React warns and the optimistic value only flashes.

```
const [value, setValue] = useState('a');
const [optimistic, setOptimistic] = useOptimistic(value);

startTransition(async () => {
  setOptimistic('b');
  const newValue = await saveChanges('b');
  setValue(newValue); // after an await, so not a transition: renders as urgent
});
```

### [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)

`useLayoutEffect(setup, dependencies?)`

`useLayoutEffect` is a version of `useEffect` that fires before the browser repaints the screen.

Call `useLayoutEffect` to make a measurement before the browser repaints the screen.

Cost: it blocks paint, and a `setState` inside it re-renders synchronously before the screen updates. Use it only when you must measure before paint.

```
function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
}
```

### [useDeferredValue](https://react.dev/reference/react/useDeferredValue)

`const deferredValue = useDeferredValue(value, initialValue?)`

`useDeferredValue` gives you a copy of `value` that lags. The urgent render uses the old value; React re-renders with the new value at low priority and restarts that render if `value` changes again, so intermediate values may never render.

- The slow child must be wrapped in `memo`, otherwise it re-renders in the urgent render anyway.
- Without `initialValue` it doesn't defer on the first render.
- If the update is already a transition, it returns the new value right away.
- Pass primitives or objects created outside render, or every render triggers a background re-render.

Call `useDeferredValue` at the top of your component to get a deferred version of that value

```
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

### [useState](https://react.dev/reference/react/useState)

`const [state, setState] = useState(initialState)`

**initialState:** the value the state starts with. Ignored after the first render. If you pass a function, React treats it as an initializer and calls it once: `useState(createTodos)`, not `useState(createTodos())`.

**setState(nextState):** takes a value or an updater function `prev => next`. Updaters are queued and applied in order on the next render.

State is a snapshot. `setState` only changes the value for the **next** render, so reading `state` right after it still gives the old value. React batches all updates from one event into one re-render. If the new value is the same (`Object.is`), React skips the re-render.

```
function handleClick() {
  setCount(count + 1); // 0 + 1
  setCount(count + 1); // still 0 + 1, count = 1
  setCount(c => c + 1); // queued updater: 1 + 1, count = 2
}
```

### [useReducer](https://react.dev/reference/react/useReducer)

`const [state, dispatch] = useReducer(reducer, initialArg, init?)`

**reducer(state, action):** a pure function that returns the next state. Never mutate `state`; return a new object.

**init:** optional initializer. The initial state becomes `init(initialArg)`.

Use it instead of `useState` when several values change together or the next state depends on what happened (the `action`). `dispatch` keeps the same identity between renders, so it's safe in dependency arrays. Same snapshot rule as `useState`.

```
function reducer(state, action) {
  switch (action.type) {
    case 'added':
      return { ...state, items: [...state.items, action.item] };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { items: [] });
dispatch({ type: 'added', item });
```

### [useRef](https://react.dev/reference/react/useRef)

`const ref = useRef(initialValue)`

**initialValue:** the starting value of `ref.current`. Ignored after the first render.

A ref is a box that survives re-renders. Changing `ref.current` does **not** re-render. Use it for DOM nodes, timer IDs, or any value the UI doesn't show. Don't read or write `ref.current` during render (except for lazy initialization). Do it in effects and event handlers.

```
function Input() {
  const inputRef = useRef(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}
```

### [useContext](https://react.dev/reference/react/useContext)

`const value = useContext(SomeContext)`

**SomeContext:** a context made with `createContext(defaultValue)`.

It returns the `value` of the closest provider **above** the component (a provider in the same component doesn't count), or `defaultValue` if there isn't one. In React 19 the provider is `<SomeContext value={...}>` (no `.Provider` needed).

When the provider's `value` changes (`Object.is`), every component that reads it re-renders, **even inside `memo`**. If the value is an object created in render, it's new every render: wrap it in `useMemo` (and its functions in `useCallback`).

```
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext value="dark">
      <Button />
    </ThemeContext>
  );
}

function Button() {
  const theme = useContext(ThemeContext); // 'dark'
}
```

### [useEffect](https://react.dev/reference/react/useEffect)

`useEffect(setup, dependencies?)`

**setup:** your effect logic. It can return a cleanup function.

**dependencies:** every reactive value used inside `setup` (props, state, anything declared in the component body), compared with `Object.is`.
- No array: runs after every commit.
- `[]`: runs after the first commit only.
- `[a, b]`: runs after the first commit and after any commit where `a` or `b` changed.

Use it to sync with an external system (subscriptions, sockets, non-React widgets), not to compute derived state. When deps change, the cleanup runs with the **old** values, then setup runs with the new ones. Cleanup also runs on unmount. In dev Strict Mode, React runs one extra setup + cleanup on mount to catch a missing cleanup.

When it runs: usually **after** paint. If an interaction (like a click) caused it, React may run it **before** paint.

```
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

### [useEffectEvent](https://react.dev/reference/react/useEffectEvent)

`const onEvent = useEffectEvent(callback)`

**callback:** the logic that should always see the latest props and state, without being a dependency.

Added in React 19.2. Use it to pull the "event" part out of an effect, so reading a value doesn't make the effect re-run. Only call it from inside effects. Don't pass it to other components or list it in deps. Don't use it just to silence the deps linter: that hides bugs. Needs `eslint-plugin-react-hooks@latest` so the linter doesn't ask for it as a dependency.

```
const onConnected = useEffectEvent(() => {
  if (!muted) showNotification('Connected!'); // latest muted, not a dep
});

useEffect(() => {
  const connection = createConnection(roomId);
  connection.on('connected', onConnected);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

### [useMemo](https://react.dev/reference/react/useMemo)

`const cachedValue = useMemo(calculateValue, dependencies)`

**calculateValue:** a pure function with no arguments. React calls it on the first render and again only when a dependency changes.

Caches a calculation between re-renders. Only worth it when:
1. the calculation is noticeably slow and its deps rarely change,
2. you pass the value to a component wrapped in `memo`, or
3. the value is a dependency of another hook.

It's only a performance optimization: if the code breaks without it, fix the real bug. React Compiler memoizes automatically, which removes most manual `useMemo`.

```
const visibleTodos = useMemo(
  () => filterTodos(todos, tab),
  [todos, tab]
);
```

### [useCallback](https://react.dev/reference/react/useCallback)

`const cachedFn = useCallback(fn, dependencies)`

Same as `useMemo(() => fn, dependencies)`: it caches the function itself, not its result. Only useful when the function goes to a `memo` child or into another hook's deps. Same React Compiler note as `useMemo`.

```
const handleSubmit = useCallback((orderDetails) => {
  post('/product/' + productId + '/buy', { orderDetails });
}, [productId]);
```

### [useActionState](https://react.dev/reference/react/useActionState)

`const [state, dispatchAction, isPending] = useActionState(reducerAction, initialState, permalink?)`

**reducerAction(previousState, actionPayload):** your Action. Whatever it returns becomes the next `state`. As a `<form action>`, the second argument is the `FormData`.

**initialState:** the state before the first dispatch.

**isPending:** true while any dispatched Action for this hook is running.

State that comes from the result of an Action. `dispatchAction` has to be called inside an Action context: `startTransition` or an Action prop (`<form action={dispatchAction}>`). Calls are queued and run **one after another**, each getting the previous result. If one throws, React cancels the queued ones and shows the nearest Error Boundary.

```
const [count, dispatchAction, isPending] = useActionState(
  async (prevCount) => await addToCart(prevCount),
  0
);

function handleClick() {
  startTransition(() => {
    dispatchAction();
  });
}
```

### [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)

`const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`

**subscribe(callback):** subscribes to the store, calls `callback` when it changes, returns an unsubscribe function.

**getSnapshot():** returns the store data. Must return the **same** value while the store hasn't changed (compared with `Object.is`), or React re-renders forever.

**getServerSnapshot():** the snapshot for server rendering and hydration. Without it, server rendering throws.

Subscribes to a store that lives outside React (browser APIs like `navigator.onLine`, a hand-written store). Declare `subscribe` outside the component, or React re-subscribes on every render. If the store changes during a transition, React redoes that update as blocking.

```
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function useOnlineStatus() {
  return useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
}
```

### [useId](https://react.dev/reference/react/useId)

`const id = useId()`

Generates a unique ID that is the same on the server and the client. Use it for accessibility attributes (`htmlFor`, `aria-describedby`). Not for list `key`s.

```
function PasswordField() {
  const hintId = useId();
  return (
    <>
      <input type="password" aria-describedby={hintId} />
      <p id={hintId}>At least 12 characters</p>
    </>
  );
}
```
