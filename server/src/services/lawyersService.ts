import type { FilterQuery } from 'mongoose';
import type { LawyerDocument } from '../models/Lawyer';
import { LawyerModel } from '../models/Lawyer';

export interface LawyerSearchParams {
  q?: string;
  region?: string;
  specialization?: string;
  minRating?: number;
}

export const listLawyers = async (): Promise<LawyerDocument[]> => {
  return LawyerModel.find().exec();
};

export const searchLawyers = async (
  params: LawyerSearchParams,
): Promise<LawyerDocument[]> => {
  const filter: FilterQuery<LawyerDocument> = {};

  if (params.region) {
    filter.region = params.region;
  }

  if (params.specialization) {
    filter.specialization = { $in: [params.specialization] };
  }

  if (params.minRating !== undefined) {
    filter.rating = { $gte: params.minRating };
  }

  if (params.q) {
    filter.$or = [
      { name: new RegExp(params.q, 'i') },
      { bio: new RegExp(params.q, 'i') },
      { specialization: { $elemMatch: { $regex: params.q, $options: 'i' } } },
    ];
  }

  return LawyerModel.find(filter).exec();
};


