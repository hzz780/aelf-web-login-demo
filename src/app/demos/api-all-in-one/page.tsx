'use client';
// useQuery use client only
// Todo: server side integration.
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export default function APIAllInOne() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <p>api all in one.</p>
        {/*<Todos />*/}
        <Example />
      </QueryClientProvider>
    </>
  );
}

function Example() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.github.com/repos/TanStack/query',
      );
      return await response.json();
    },
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  );
}

//
// function Todos() {
//   // Access the client
//   const queryClient = useQueryClient()
//
//   // Queries
//   const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
//
//   // Mutations
//   const mutation = useMutation({
//     mutationFn: postTodo,
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ['todos'] })
//     },
//   })
//
//   return (
//     <div>
//       <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
//
//       <button
//         onClick={() => {
//           mutation.mutate({
//             id: Date.now(),
//             title: 'Do Laundry',
//           })
//         }}
//       >
//         Add Todo
//       </button>
//     </div>
//   )
// }
