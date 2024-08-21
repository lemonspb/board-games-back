import { Injectable } from '@nestjs/common';
import { axiosBgg } from '@/bgg/helpers/axios';

@Injectable()
export class BggService {
  async searchGame(gameName: string): Promise<any> {
    const res = await axiosBgg.get(`/search?query=${gameName}`);
    const json = JSON.parse(res.data);
    console.log(res.data);
    return {
      name: json.items.item.map(({ name }) => name._attributes.value),
    };
  }
}
