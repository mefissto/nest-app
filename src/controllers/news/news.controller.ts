import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { News } from '@models/news.model';
import { NewsService } from './news.service';

@ApiTags('News')
@UseGuards(AuthGuard('jwt'))
@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {
  }

  @ApiOperation({ summary: 'Get all news list' })
  @ApiResponse({ status: HttpStatus.OK, type: [News] })
  @Get()
  fetchNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: HttpStatus.CREATED, type: News })
  @Post()
  saveNews(@Body() news: News): Promise<News> {
    return this.newsService.createNews(news);
  }
}
