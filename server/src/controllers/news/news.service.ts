import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { News } from 'src/core/models/news.model';
import { DBModelsEnum } from "@database/db-models.enum";

@Injectable()
export class NewsService {
  constructor(@Inject(DBModelsEnum.NEWS_MODEL) private readonly newsModel: Model<News>) {
  }

  public async createNews(createNewsDto: News): Promise<News> {
    const createdNews = new this.newsModel(createNewsDto);
    return await createdNews.save();
  }

  public async findAll(): Promise<News[]> {
    return await this.newsModel.find().exec();
  }
}
