import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { News } from '@models/news.model';
import { JwtAuthGuard } from '@controllers/auth/jwt-auth.guard';
import { NewsService } from './news.service';

@ApiTags('News')
@UseGuards(JwtAuthGuard)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all news list' })
  @ApiResponse({ status: HttpStatus.OK, type: [News] })
  fetchNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: HttpStatus.CREATED, type: News })
  saveNews(@Body() news: News): Promise<News> {
    return this.newsService.createNews(news);
  }
}
