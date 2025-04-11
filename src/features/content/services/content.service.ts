import { Logger } from '@/global/logging/logger';
import { ContentRepository } from '../repositories/content.repository';
import { CreateContentDTO, UpdateContentDTO } from '../schemas/content.schema';
import { ContentFilter, ContentStatus } from '../interfaces/content.interface';
import { BadRequestError, InternalServerError, NotFoundError } from '@/global/errors/custom.error';

export class ContentService {
  private readonly logger = Logger.getInstance().createChildLogger({
    service: 'ContentService',
  });

  constructor(private readonly contentRepository: ContentRepository) {}

  public async createContent(requestBody: CreateContentDTO, userId: string) {
    return this.contentRepository.createContent({ ...requestBody, submittedBy: userId });
  }

  public async findAllContents(filter: ContentFilter) {
    return this.contentRepository.findAllContents(filter);
  }

  public async updateContentById(id: string, contentData: UpdateContentDTO) {
    const content = await this.contentRepository.findContentById(id);
    if (!content) {
      this.logger.warn({ id }, 'Content not found');
      throw new NotFoundError('Content not found', { id });
    }

    if (contentData.status === ContentStatus.REJECTED && !contentData.rejectionReason) {
      this.logger.warn({ id }, 'Rejection reason is required when rejecting content');
      throw new BadRequestError('Rejection reason is required when rejecting content', { id });
    }

    const updateData = {
      status: contentData.status,
      rejectionReason: contentData.status === ContentStatus.REJECTED ? contentData.rejectionReason : undefined,
    };

    const updatedContent = await this.contentRepository.updateContentById(id, updateData);
    if (!updatedContent) {
      this.logger.error('Content update failed');
      throw new InternalServerError('Content update failed');
    }
    return updatedContent;
  }
}
