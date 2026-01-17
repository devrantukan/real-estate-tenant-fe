import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz", // Use the same you've defined in docker-compose
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || "localhost",
        port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT || "8108"),
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || "http",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title",
  },
  geoLocationField: "_geoloc",
});

export default typesenseInstantsearchAdapter;
