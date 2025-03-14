import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);

    report.user = user;

    return this.repo.save(report);
  }

  async changeApproval(id: string, approval: boolean) {
    const report = await this.repo.findOne({ where: { id: +id } });
    if (!report) throw new NotFoundException('report not found');

    report.approved = approval;
    return this.repo.save(report);
  }
}
