# Review of PR #517

## Three-question pass (one block per effect / handler)

/_
useEffect(() => {
let ignore = false;
searchTickets("").then((found) => {
if (!ignore) setResults(found);
});
return () => {
ignore = true;
};
}, []);
_/

This is confusing and un-necessary. No need to have a flag to prevent this from running more than once. This will only run once when the component is mounted (componentDidMount). Because the dependency array is empty, no re-render is going to
make this run. Only because of strict mode.

// Search on the server as the agent types
/_ async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
const q = e.target.value;
setQuery(q);
const found = await searchTickets(q);
setResults(found);
}
_/

this is making a search on every key down, it doesnt have an abort signal so it is not cancelling an ongoing api call. You can do an inline function in the component to set the query, then have a useEffect with query as dependency where you make this calls and have an abort signal to cancel subsequent calls. Also debounce the

/\*

useEffect(() => {
let ignore = false;
setTicket(null);
setFailed(false);
setSent(false);
fetchTicket(ticketId).then(
(t) => {
if (ignore) return;
setTicket(t);
setDraft(t.draft);
},
() => {
if (!ignore) setFailed(true);
},
);
return () => {
ignore = true;
};
}, [ticketId]);

\*/

Same here no need to flag with ignore. On the return function you clean the ticket, failed and send. Also this needs a abort signal to cancel the fetching of the ticket. If the user clicks different tickets this multiple call are going out and the slowest one
will be the last renders. It can cause and older ticket selected to be the one showing.

<!-- name: closes over… / twice or overlapping… / if it fails… -->

## Comments (ranked)

<!-- line — it breaks when… — fix — (log/screen when run) -->

## Verdict

Rejected
