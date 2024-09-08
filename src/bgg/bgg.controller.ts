import { Controller, Get, Res, Param, Query } from '@nestjs/common';
// import translatte = require('translatte');
import { BGG_RES } from '@/bgg/types/Bgg';
import { AxiosResponse } from 'axios';

import { BggService } from './bgg.service';

@Controller('bgg')
export class BggController {
  constructor(private readonly bggService: BggService) {}

  @Get('search')
  async search(@Query() params: { query: string }): Promise<BGG_RES> {
    return this.bggService.searchGame(params.query);
  }

  @Get('getByRank')
  async getByRank(@Query() params: { id: string }): Promise<any> {
    return this.bggService.getByRank(params.id);
  }

  @Get('getAll')
  async getAll(): Promise<any> {
    return this.bggService.getAll();
  }

  @Get('getById')
  async getById(@Query() params: { id: number }): Promise<any> {
    // const a = await axios.get('https://api.geekdo.com/xmlapi/boardgame/170216');

    // const removeJsonTextAttribute = function (value, parentElement) {
    //   try {
    //     const parentOfParent = parentElement._parent;
    //     const pOpKeys = Object.keys(parentElement._parent);
    //     const keyNo = pOpKeys.length;
    //     const keyName = pOpKeys[keyNo - 1];
    //     const arrOfKey = parentElement._parent[keyName];
    //     const arrOfKeyLen = arrOfKey.length;
    //     if (arrOfKeyLen > 0) {
    //       const arr = arrOfKey;
    //       const arrIndex = arrOfKey.length - 1;
    //       arr[arrIndex] = value;
    //     } else {
    //       parentElement._parent[keyName] = value;
    //     }
    //   } catch (e) {}
    // };

    // var options = {
    //   compact: true,
    //   trim: true,
    //   ignoreDeclaration: true,
    //   ignoreInstruction: true,
    //   ignoreAttributes: false,
    //   ignoreComment: true,
    //   ignoreCdata: true,
    //   ignoreDoctype: true,
    //   textFn: removeJsonTextAttribute,
    // };

    // var result1: any = await xml2json(a.data, options);
    // const c = JSON.parse(result1);
    // console.log(c);
    // const b = c.boardgames.boardgame.description
    //   .replace(/<[^>]*>?/gm, '')
    //   .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '');

    // const description = await translatte(b, {
    //   from: 'en',
    //   to: 'ru',
    // });
    // return {
    //   id: c.boardgames.boardgame._attributes.objectid,
    //   yearpublished: c.boardgames.boardgame.yearpublished,
    //   title: c.boardgames.boardgame.name,
    //   description: description.text,
    // };
    return this.bggService.getById(params.id);
  }
}
