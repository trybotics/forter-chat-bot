import { Client } from "@elastic/elasticsearch";

const client = new Client({
  cloud: { id: process.env.ELASTICCLOUDID },
  auth: {
    username: process.env.ELASTICUSERNAME,
    password: process.env.ELASTICPASSWORD,
  },
});

export const phraseSearch = async (_index, phrase) => {
  const hits = [];

  // only string values are searchable
  const searchResult = await client
    .search({
      index: _index,
      body: {
        query: {
          multi_match: {
            fields: ["userName", "text"],
            query: phrase,
            type: "phrase_prefix",
            //lenient: true
          },
        },
        highlight: {
          fields: {
            userName: {},
            text: {},
          },
        },
      },
    })
    .catch((e) => console.log("error", e));
  if (
    searchResult &&
    searchResult.hits &&
    searchResult.hits.hits &&
    searchResult.hits.hits.length > 0
  ) {
    hits.push(...searchResult.hits.hits);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

export const getAll = async (index) => {
  const hits = [];
  const searchResult = await client
    .search({
      index: index,
      body: {
        size: 100,
        query: {
          match_all: {},
        },
      },
    })
    .catch((e) => console.log("error", e));
  if (
    searchResult &&
    searchResult.hits &&
    searchResult.hits.hits &&
    searchResult.hits.hits.length > 0
  ) {
    hits.push(...searchResult.hits.hits);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

export const getById = async (index, id) => {
  try {
    return await client.get({
      index: index,
      id: id,
    });
  } catch (error) {
    return "Not Found!";
  }
};

export const update = async (index, body, id) => {
  return await client.update({
    index: index,
    id: id,
    body: {
      doc: body,
    },
  });
};

export const storeAnswers = async (index, body, id) => {
  return await client.update({
    index: index,
    id: id,
    body: {
      script: {
        source: "ctx._source.answers.add(params.answer)",
        lang: "painless",
        params: {
          answer: body,
        },
      },
    },
  });
};

export const create = async (index, body) => {
  return await client.create({
    index: index,
    id: String(Math.random()).split(".")[1],
    body: body,
  });
};

export const deleteQuestion = async (index, id) => {
  return await client.delete({
    index: index,
    id: id,
  });
};
