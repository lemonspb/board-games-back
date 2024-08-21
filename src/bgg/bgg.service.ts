import { Injectable } from '@nestjs/common';
import { xml2json } from 'xml-js';
import translatte = require('translatte');

import axios from 'axios';
import { Request } from 'express';
@Injectable()
export class BggService {
  async searchGame(gameName: string): Promise<any> {
    const a = await axios.get(
      `https://api.geekdo.com/xmlapi2/search?query=${gameName}`,
    );
    function nativeType(value) {
      var nValue = Number(value);
      if (!isNaN(nValue)) {
        return nValue;
      }
      var bValue = value.toLowerCase();
      if (bValue === 'true') {
        return true;
      } else if (bValue === 'false') {
        return false;
      }
      return value;
    }

    var removeJsonTextAttribute = function (value, parentElement) {
      try {
        var keyNo = Object.keys(parentElement._parent).length;
        var keyName = Object.keys(parentElement._parent)[keyNo - 1];
        parentElement._parent[keyName] = nativeType(value);
      } catch (e) {}
    };
    var options = {
      compact: true,
      trim: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreAttributes: false,
      ignoreComment: true,
      ignoreCdata: true,
      ignoreDoctype: true,
      textFn: removeJsonTextAttribute,
    };

    // const b = c.boardgames.boardgame.description
    //   .replace(/<[^>]*>?/gm, '')
    //   .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '');
    var result1 = xml2json(a.data, options);
    const c = JSON.parse(result1);
    console.log(c.items, '');
    return {
      name: 'пук',
    };
  }
}
