import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { News } from './../../core/models/news.model';
import { NewsService } from './news.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  fetchNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Post()
  saveNews(@Body() news: News): Promise<News> {
    return this.newsService.createNews(news);
  }
}
