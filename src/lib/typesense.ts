import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY || "xyz",
    nodes: [
      {
        host: "typesense.tukanft.com",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title",
  },
  geoLocationField: "_geoloc",
});

export default typesenseInstantsearchAdapter;
