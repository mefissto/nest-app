import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { News } from 'src/core/models/news.model';

@Injectable()
export class NewsService {
  constructor(@InjectModel('News') private readonly newsModel: Model<News>) {}

  public async createNews(createNewsDto: News): Promise<News> {
    const createdNews = new this.newsModel(createNewsDto);
    return await createdNews.save();
  }

  public async findAll(): Promise<News[]> {
    return await this.newsModel.find().exec();
  }
}
