import { BggRanks } from '@/bgg/entity/rank.entity';
import { BggGetByIdResponse } from './GetById';

interface BggGetByIdResponseOmitId extends Omit<BggGetByIdResponse, 'id'> {}

export interface BggGetAllResponse extends BggGetByIdResponseOmitId, BggRanks {}
