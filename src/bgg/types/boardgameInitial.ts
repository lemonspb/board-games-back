export type BoardgameInitialResponse = {
  _attributes: {
    termsofuse: string;
  };
  boardgamges: {
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
    };
  };
};
