import { Logger } from '@/global/logging/logger';
import { ContentService } from '../services/content.service';
import { catchAsync } from '@/global/utils/catchAsync.util';
import { TypedRequest } from '@/global/interfaces/request.interface';
import { CreateContentDTO, UpdateContentDTO } from '../schemas/content.schema';
import express from 'express';
import { UnauthorizedError } from '@/global/errors/custom.error';
import { StatusCodes } from 'http-status-codes';
import { excludeFields } from '@/global/utils/excludeFields.util';

export class ContentController {
  private readonly logger = Logger.getInstance().createChildLogger({ service: 'ContentController' });

  constructor(private readonly contentService: ContentService) {}

  public createContent = catchAsync(
    async (req: TypedRequest<CreateContentDTO>, res: express.Response, _next: express.NextFunction) => {
      if (!req.currentUser) {
        this.logger.warn({ url: req.originalUrl }, 'Unauthorized, Please log in');
        throw new UnauthorizedError('Unauthorized, Please log in', { url: req.originalUrl });
      }

      const content = await this.contentService.createContent(req.body, req.currentUser.id);
      this.logger.info({ id: req.currentUser.id }, 'Content created by user');

      res.status(StatusCodes.CREATED).json({
        success: true,
        data: excludeFields(content, ['__v']),
      });
    },
  );

  public findAllContents = catchAsync(
    async (req: TypedRequest<unknown>, res: express.Response, _next: express.NextFunction) => {
      const filter = req.query.status ? { status: req.query.status } : {};
      const contents = await this.contentService.findAllContents(filter);

      res.status(StatusCodes.OK).json({
        success: true,
        data: contents.map((c) => excludeFields(c, ['__v'])),
      });
    },
  );

  public updateContentById = catchAsync(
    async (req: TypedRequest<UpdateContentDTO>, res: express.Response, _next: express.NextFunction) => {
      const updatedContent = await this.contentService.updateContentById(req.params.id, req.body);
      this.logger.info({ id: req.params.id, status: updatedContent.status }, 'Content status updated');

      res.status(StatusCodes.OK).json({
        success: true,
        data: excludeFields(updatedContent, ['__v']),
      });
    },
  );
}
