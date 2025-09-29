import React from 'react';
import { Layout } from '../components';
import { useQuery, gql } from "@apollo/client";
import TrackCard from "../containers/track-card";
import QueryResult from "../components/query-result";

// QUERY GRAPHQL: Define QUÉ datos pedir
const TRACKS = gql `
query GetTracks {
  tracksForHome {
    id
    title
    thumbnail
    length
    modulesCount
    author {
      id
      name
      photo
    }
  }
}
`
// IMPORTANTE:
// - Solo pedimos campos que REALMENTE necesitamos
// - No como REST que trae TODO el objeto


const Tracks = () => {
   // HOOK: Ejecuta la query y retorna 3 valores
    const { loading, error, data } = useQuery(TRACKS);

  return (
  <Layout grid>
    <QueryResult error={error} loading={loading} data={data}>
      {data?.tracksForHome?.map((track) => (
      <TrackCard 
        key={track.id} 
        track={track} 
      />
    ))}
    </QueryResult>
    </Layout>
  )
};

export default Tracks;
