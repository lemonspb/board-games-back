type GameAttribute = {
  _attributes: {
    name: string;
    value: string;
  };
};

type Rank = {
  _attributes: {
    type: string;
    id: string;
    name: string;
    friendlyname: string;
    value: string;
    bayesaverage: string;
  };
};

type Ratings = {
  usersrated: { _text: string };
  average: { _text: string };
  bayesaverage: { _text: string };
  ranks: { rank: Rank[] };
  stddev: { _text: string };
  median: { _text: string };
  owned: { _text: string };
  trading: { _text: string };
  wanting: { _text: string };
  wishing: { _text: string };
  numcomments: { _text: string };
  numweights: { _text: string };
  averageweight: { _text: string };
};

export type BoardgameInitialResponse = {
  _attributes: {
    termsofuse: string;
  };
  boardgames: {
    boardgame: {
      _attributes: {
        objectid: string;
      };
      yearpublished: {
        _text: string;
      };
      minplayers: {
        _text: string;
      };
      maxplayers: {
        _text: string;
      };
      playingtime: {
        _text: string;
      };
      minplaytime: {
        _text: string;
      };
      maxplaytime: {
        _text: string;
      };
      age: {
        _text: string;
      };
      name: Array<{
        _attributes: {
          primary?: string;
          sortindex: string;
        };
        _text: string;
      }>;
      description: {
        _text: string;
      };
      thumbnail: {
        _text: string;
      };
      image: {
        _text: string;
      };
      boardgamepublisher: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgamepodcastepisode: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgamehonor: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgamecategory: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgamefamily: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgameversion: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgameimplementation: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgamemechanic: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgamedesigner: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgameartist: {
        _attributes: {
          objectid: string;
        };
        _text: string;
      };
      cardset: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      videogamebg: {
        _attributes: {
          objectid: string;
        };
        _text: string;
      };
      boardgamecompilation: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgameexpansion: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgameaccessory: Array<{
        _attributes: {
          objectid: string;
        };
        _text: string;
      }>;
      boardgameintegration: Array<{
        _attributes: {
          objectid: string;
          inbound?: string;
        };
        _text: string;
      }>;
      boardgamesubdomain: {
        _attributes: {
          objectid: string;
        };
        _text: string;
      };
      poll: Array<{
        _attributes: {
          name: string;
          title: string;
          totalvotes: string;
        };
        results: any;
      }>;
      result: GameAttribute[];
      statistics: {
        ratings: Ratings;
      };
    };
  };
};
